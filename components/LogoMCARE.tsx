
import React from 'react';

const LogoMCARE: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center group`}>
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
      
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
        {/* Hexagonal Core */}
        <path d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z" fill="#0F172A" stroke="url(#paint0_linear)" strokeWidth="2" />
        
        {/* The Futuristic 'M' */}
        <path d="M25 65V35L50 55L75 35V65" stroke="url(#paint1_linear)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Circuit Dots */}
        <circle cx="25" cy="35" r="3" fill="#60A5FA" className="animate-pulse" />
        <circle cx="75" cy="35" r="3" fill="#60A5FA" className="animate-pulse" />
        <circle cx="50" cy="55" r="3" fill="#818CF8" />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="paint0_linear" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="25" y1="35" x2="75" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#A5B4FC" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LogoMCARE;
