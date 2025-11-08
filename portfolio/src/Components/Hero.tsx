import React from "react";
import { AnimatedButton } from "../UI/animated-button";
import { Download, ChevronDown } from "lucide-react";

interface HeroProps {
  onViewWorkClick?: () => void;
  onDownloadCV?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewWorkClick, onDownloadCV }) => {
  const handleDownloadCV = () => {
  if (onDownloadCV) {
    onDownloadCV();
  } else {
    const link = document.createElement("a");
    link.href = "/cv/CV Resume-wubrist.pdf"; // Updated path
    link.download = "Wubrist_Alemu_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
  const handleScrollToWork = () => {
    // Use the prop if provided, otherwise use fallback
    if (onViewWorkClick) {
      onViewWorkClick();
    } else {
      // Fallback scroll function
      const element = document.getElementById("projects"); // Use the projects section ID
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-t from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-3xl lg:text-5xl font-sans pb-1 md:pb-2 pt-1 md:pt-4 relative z-20 font-bold tracking-tight leading-tight">
        Hi, I'm Wubrist Alemu — I <br />
        design and code modern, intelligent web <br />
        experiences.
      </h2>

      <p className="max-w-xl mx-auto text-base md:text-lg text-neutral-700 dark:text-neutral-400 text-center mt-1">
        Full Stack Developer creating efficient automated systems and engaging e-commerce experiences.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 pt-4">
        {/* Download CV Button */}
        <AnimatedButton
          className="flex items-center justify-center gap-2 bg-green-500 text-white w-full sm:w-44 md:w-52 lg:w-56"
          variant="default"
          size="default"
          glow={true}
          textEffect="normal"
          uppercase={true}
          rounded="custom"
          onClick={handleDownloadCV}
          shimmerColor="#E6E6FA"
          shimmerSize="0.15em"
          shimmerDuration="3s"
          borderRadius="100px"
          background="rgba(0,0,0,1)"
        >
          <Download size={16} />
          Download CV
        </AnimatedButton>

        {/* View Work Button */}
        <AnimatedButton
          className="flex items-center justify-center gap-2 bg-blue-500 text-white w-full sm:w-44 md:w-52 lg:w-56"
          variant="default"
          size="default"
          glow={true}
          textEffect="normal"
          uppercase={true}
          rounded="custom"
          onClick={handleScrollToWork}
          shimmerColor="#E6E6FA"
          shimmerSize="0.15em"
          shimmerDuration="3s"
          borderRadius="100px"
          background="rgba(0,0,0,1)"
        >
          View Work
          <ChevronDown size={16} />
        </AnimatedButton>
      </div>
    </>
  );
};

export default Hero;