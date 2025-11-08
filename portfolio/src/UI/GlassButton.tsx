import React from "react";
import LustreText from "../UI/lustretext";

interface GlassButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  onClick,
  text = "See More Projects",
  className = "",
}) => {
  return (
    <div className="text-center mt-6 sm:mt-8">
      <button
        onClick={onClick}
        className={`
          inline-flex items-center gap-2 px-5 py-2.5
          backdrop-blur-md border border-white/20 
          bg-white/10 dark:bg-black/10
          hover:bg-white/20 dark:hover:bg-black/20
          transition-all duration-300 
          rounded-2xl
          shadow-lg hover:shadow-xl 
          transform hover:-translate-y-0.5
          group
          ${className}
        `}
      >
        <LustreText 
          text={text}
          speed={4}
          className="text-sm font-semibold"
        />
        <svg 
          className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      </button>
    </div>
  );
};

export default GlassButton;