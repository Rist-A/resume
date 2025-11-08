import { cn } from "../lib/utils";
import { useState } from "react";

interface Logo {
  name: string;
  image: string;
  category: string;
}

interface FlowingLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const FlowingLogo = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: FlowingLogoProps) => (
  <div
    {...props}
    className={cn(
      "group relative flex h-full w-full overflow-hidden p-1 [--duration:10s] [--gap:12px] md:[--gap:20px] [gap:var(--gap)]",
      vertical ? "flex-col" : "flex-row",
      className
    )}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn("flex shrink-0 [gap:var(--gap)]", {
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "[animation-direction:reverse]": reverse,
          "animate-canopy-horizontal flex-row": !vertical,
          "animate-canopy-vertical flex-col": vertical,
        })}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full",
          vertical
            ? "bg-gradient-to-b from-transparent via-transparent to-transparent"
            : "bg-gradient-to-r from-transparent via-transparent to-transparent"
        )}
      />
    )}
  </div>
);

const LogoCard = ({ logo, className }: { logo: Logo; className?: string }) => (
  <div className="flex flex-col items-center gap-2 md:gap-3 group/card">
    <div
      className={cn(
        "flex h-16 w-16 md:h-24 md:w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl md:rounded-2xl border border-gray-300/30 bg-transparent transition-all duration-300 hover:scale-110 hover:border-blue-400/80 hover:shadow-[0_0_25px_rgba(96,165,250,0.4)] dark:border-gray-500/30",
        "transform-gpu will-change-transform",
        className
      )}
    >
      <img
        src={logo.image}
        alt={logo.name}
        className="h-full w-full object-contain p-2 md:p-3 rounded-xl md:rounded-2xl filter brightness-110 contrast-110"
      />
    </div>
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors text-center">
        {logo.name}
      </span>
    </div>
  </div>
);

interface FlowingLogosProps {
  data: Logo[];
  className?: string;
  cardClassName?: string;
  activeCategory: string;
}

export const FlowingLogos = ({
  data,
  className,
  cardClassName,
  activeCategory,
}: FlowingLogosProps) => {
  const filteredData = activeCategory === 'All' 
    ? data 
    : data.filter(logo => logo.category === activeCategory);

  return (
    <div className={cn("w-full h-48 md:h-64 px-2 sm:px-4 md:px-8 lg:px-[180px]", className)}>
      {/* Two rows of flowing logos */}
      {[false, true].map((reverse, index) => (
        <FlowingLogo
          key={`row-${index}`}
          reverse={reverse}
          className="[--duration:30s] h-1/2"
          pauseOnHover
          applyMask={false}
          repeat={Math.max(2, Math.ceil(6 / filteredData.length))}
        >
          {filteredData.map((logo) => (
            <LogoCard
              key={`${logo.name}-${index}`}
              logo={logo}
              className={cardClassName}
            />
          ))}
        </FlowingLogo>
      ))}
    </div>
  );
};