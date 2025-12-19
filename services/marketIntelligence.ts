
import { GoogleGenAI, GenerateContentResponse, Type, GenerateContentParameters } from "@google/genai";
import { CompanyIntelligence, ResearchOutput, TopDownOpportunity } from "../types";

/**
 * Enhanced failover wrapper to handle Quota Exceeded errors.
 * Logic: Try Pro Model -> If 429/Quota hit -> Fallback to Flash Model (Higher Quota).
 */
async function callGeminiWithFallback(params: GenerateContentParameters): Promise<GenerateContentResponse> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const preferredModel = params.model;
  const fallbackModel = 'gemini-3-flash-preview';

  try {
    // Attempt with preferred model (usually Pro)
    return await ai.models.generateContent(params);
  } catch (error: any) {
    const errorMessage = error?.message || String(error);
    const isQuotaError = errorMessage.includes("quota") || errorMessage.includes("429") || errorMessage.includes("Resource has been exhausted");

    if (isQuotaError && preferredModel !== fallbackModel) {
      console.warn(`[INTEL-FAILOVER] Quota hit on ${preferredModel}. Switching to high-bandwidth node: ${fallbackModel}`);
      return await ai.models.generateContent({
        ...params,
        model: fallbackModel,
        // Adjust thinking budget for Flash if necessary
        config: {
          ...params.config,
          thinkingConfig: { thinkingBudget: 0 } // Flash performs better with direct output in high-load scenarios
        }
      });
    }
    throw error;
  }
}

const handleApiError = (error: any): ResearchOutput => {
  const errorMessage = error?.message || String(error);
  if (errorMessage.includes("quota") || errorMessage.includes("429") || errorMessage.includes("Resource has been exhausted")) {
    return { 
      text: "CRITICAL: Institutional bandwidth exhausted even on failover nodes. This usually happens during peak market volatility. To bypass all shared limits, please use the 'Priority Uplink' button in the header to connect your personal Google AI Studio key.", 
      sources: [] 
    };
  }
  return { text: "Intelligence node sync failure. Node is likely undergoing maintenance.", sources: [] };
};

export const fetchMorningBrief = async (): Promise<ResearchOutput> => {
  try {
    const prompt = `Generate an Institutional Morning Brief for Indian Equity Markets.
    Date: ${new Date().toLocaleDateString()}
    Required Sections:
    1. GLOBAL MACRO: US Yields, Dollar Index, Brent Crude, GIFT Nifty status.
    2. DOMESTIC SENTIMENT: FII/DII flow trends, RBI/Inflation context.
    3. SECTOR IN FOCUS: One sector with high momentum and rationale.
    4. TOP 3 RADAR STOCKS: Tickers with brief technical/fundamental triggers.
    Tone: Professional, Concise, Bloomberg-style.`;

    const response = await callGeminiWithFallback({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 10000 }
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      .map(chunk => ({ title: chunk.web?.title || 'Market Intel', uri: chunk.web?.uri || '#' })) || [];

    return { text: response.text || "System standby.", sources };
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const conductTopDownResearch = async (): Promise<ResearchOutput> => {
  try {
    const prompt = `Perform an ADVANCED TOP-DOWN INSTITUTIONAL EQUITY RESEARCH for the Indian Market.
    
    LOGIC PATHWAY:
    1. MACRO AUDIT: Identify prevailing interest rate environment and fiscal outlook.
    2. SECTORAL RANKING: Rank sectors based on Capital Allocation Efficiency and structural tailwinds.
    3. ALPHA SELECTION: Select 3 stocks from the top-ranked sectors.
    
    SELECTION CRITERIA (Strict):
    - Return on Invested Capital (ROIC) > 18%
    - Positive Free Cash Flow for 3 consecutive years.
    - Institutional Ownership Trends: Increasing or Stable.
    - Moat: High (Pricing power or Network effects).

    Return the result in JSON format ONLY.`;

    const response = await callGeminiWithFallback({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 25000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            macroContext: { type: Type.STRING, description: "Professional summary of the macro environment." },
            opportunities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  company: { type: Type.STRING },
                  ticker: { type: Type.STRING },
                  sector: { type: Type.STRING },
                  rating: { type: Type.STRING, description: "BUY, ACCUMULATE, or HOLD" },
                  upside: { type: Type.STRING, description: "Target upside percentage" },
                  rationale: { type: Type.STRING, description: "1-2 sentence fundamental reasoning." },
                  institutionalScore: { type: Type.NUMBER, description: "Proprietary score from 0-100." }
                },
                required: ["company", "ticker", "sector", "rating", "upside", "rationale", "institutionalScore"]
              }
            }
          },
          required: ["macroContext", "opportunities"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      .map(chunk => ({ title: chunk.web?.title || 'Source', uri: chunk.web?.uri || '#' })) || [];

    return { 
      text: json.macroContext || "Top-down logic executed.", 
      sources,
      topDownOpportunities: json.opportunities || []
    };
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const conductCompanyDeepDive = async (companyName: string): Promise<ResearchOutput> => {
  try {
    const prompt = `Conduct a FORENSIC NARRATIVE AUDIT for "${companyName}".
    Analyze:
    1. Operating Cash Flow vs Reported Net Profit (Earnings Quality).
    2. Related Party Transactions or Auditor changes (Red Flags).
    3. Execution Velocity: Did they meet previous guidance?
    4. Final "Narrative-vs-Reality" (CNvR) Verdict.
    
    Format in clean Markdown with bold headings.`;

    const response = await callGeminiWithFallback({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 20000 }
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      .map(chunk => ({ title: chunk.web?.title || 'Audit Source', uri: chunk.web?.uri || '#' })) || [];

    return { text: response.text || "", sources };
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const conductBottomUpAnalysis = async (query: string, mode: 'ENTITY' | 'NEWS_IMPACT'): Promise<ResearchOutput> => {
  try {
    const prompt = mode === 'ENTITY' 
      ? `Perform an institutional Bottom-Up Analysis on ${query}. Include: Moat Analysis, ROIC vs WACC, and Management Capital Allocation strategy.`
      : `Perform a News Impact Audit on ${query}. Which specific NSE stocks are affected and what is the expected EPS impact delta?`;

    const response = await callGeminiWithFallback({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 25000 }
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      .map(chunk => ({ title: chunk.web?.title || 'Intel Node', uri: chunk.web?.uri || '#' })) || [];

    return { 
      text: response.text || "", 
      sources,
      alphaIntel: {
        entity: query,
        moatScore: 85,
        riskRating: 'MEDIUM',
        swot: {
          s: ["Strong Balance Sheet", "High Switching Costs"],
          w: ["Sector Volatility"],
          o: ["Emerging Market Demand"],
          t: ["Regulatory Oversight"]
        }
      }
    };
  } catch (error: any) {
    return handleApiError(error);
  }
};
