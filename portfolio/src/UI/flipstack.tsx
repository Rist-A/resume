"use client";
import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {Variants} from "framer-motion"
import { Card, CardContent } from "../UI/card.tsx";
import { cn } from "../lib/utils.ts";
import GlassButton from "../UI/GlassButton.tsx"


interface FlipStackCard {
  id: number;
  content?: React.ReactNode;
  title?: string;
  description?: string;
  fullContent?: React.ReactNode;
  imageUrl?: string;
}

interface FlipStackProps {
  cards?: FlipStackCard[];
  onSeeMore?: () => void; // This prop will handle the "Explore More" click
}

interface ExpandableDockProps {
  headerContent: ReactNode;
  children: ReactNode;
  className?: string;
  isExpanded: boolean;
  onClose: () => void;
}

const ExpandableDock = ({
  headerContent,
  children,
  className,
  isExpanded,
  onClose,
}: ExpandableDockProps) => {
  const [animationStage, setAnimationStage] = useState<
    | "collapsed"
    | "widthExpanding"
    | "heightExpanding"
    | "fullyExpanded"
    | "contentFadingOut"
    | "heightCollapsing"
    | "widthCollapsing"
  >("collapsed");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded) {
      setAnimationStage("widthExpanding");
      setTimeout(() => setAnimationStage("heightExpanding"), 400);
      setTimeout(() => setAnimationStage("fullyExpanded"), 850);
    } else {
      setAnimationStage("contentFadingOut");
      setTimeout(() => setAnimationStage("heightCollapsing"), 250);
      setTimeout(() => setAnimationStage("widthCollapsing"), 650);
      setTimeout(() => setAnimationStage("collapsed"), 1050);
    }
  }, [isExpanded]);

  const isCollapsed = animationStage === "collapsed";
  const isFullyExpanded = animationStage === "fullyExpanded";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        isFullyExpanded
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFullyExpanded, onClose]);

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-3 sm:px-4">
      <motion.div
        ref={containerRef}
        initial={{
          width: "min(95vw, 320px)",
          height: 70,
          borderRadius: 999,
        }}
        animate={{
          width:
            animationStage === "collapsed" ||
            animationStage === "widthCollapsing"
              ? "min(95vw, 320px)"
              : "min(95vw, 90vw)",
          height:
            animationStage === "collapsed" ||
            animationStage === "widthExpanding" ||
            animationStage === "widthCollapsing"
              ? 70
              : "min(85vh, 600px)",
          borderRadius: isCollapsed ? 999 : 20,
        }}
        transition={{
          width: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
          borderRadius: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        }}
        className={cn(
          "bg-white dark:bg-black backdrop-blur-md shadow-2xl overflow-hidden flex flex-col-reverse mx-auto",
          className
        )}
      >
        <div
          onClick={isCollapsed ? undefined : onClose}
          className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 text-black dark:text-white w-full h-[70px] whitespace-nowrap cursor-pointer border-t border-gray-300 dark:border-gray-700 flex-shrink-0"
        >
          {headerContent}
        </div>
        <motion.div
          animate={{
            opacity: isFullyExpanded ? 1 : 0,
            height: isFullyExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col overflow-hidden"
        >
          <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function FlipStack({
  cards = [
    { 
      id: 1, 
      title: "Project One",
      description: "Short description for project one",
      imageUrl: "/api/placeholder/400/300",
      fullContent: <div className="p-4 sm:p-6"><h3 className="text-xl sm:text-2xl font-bold mb-4">Project One Details</h3><p>Full details about project one...</p></div>
    },
    { 
      id: 2, 
      title: "Project Two",
      description: "Short description for project two", 
      imageUrl: "/api/placeholder/400/300",
      fullContent: <div className="p-4 sm:p-6"><h3 className="text-xl sm:text-2xl font-bold mb-4">Project Two Details</h3><p>Full details about project two...</p></div>
    },
    { 
      id: 3, 
      title: "Project Three",
      description: "Short description for project three",
      imageUrl: "/api/placeholder/400/300",
      fullContent: <div className="p-4 sm:p-6"><h3 className="text-xl sm:text-2xl font-bold mb-4">Project Three Details</h3><p>Full details about project three...</p></div>
    },
  ],
  onSeeMore, // This prop will be passed from parent component
}: FlipStackProps) {
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<FlipStackCard | null>(null);
  const [isDockExpanded, setIsDockExpanded] = useState(false);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);
  const [isAnimatingToCenter, setIsAnimatingToCenter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.3 }
    );
    
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev: number) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, isInView, cards.length]);

  // Get responsive card dimensions
  const getCardDimensions = () => {
    if (isMobile) return { width: "w-14", height: "h-10" };
    if (isTablet) return { width: "w-62", height: "h-86" };
    return { width: "w-80", height: "h-[420px]" };
  };

  const getRotation = (index: number) => {
    const rotations = [-8, 5, -3, 7, -5, 4, -6, 8, -2, 3];
    return rotations[index % rotations.length];
  };

  const isActive = (index: number) => index === activeIndex;

  const getCardVariants = (index: number): Variants => {
    const totalCards = cards.length;
    const centerIndex = Math.floor(totalCards / 2);
    const positionFromCenter = index - centerIndex;
    
    if (isMobile) {
      // Exact mobile animation from your example
      return {
        initial: {
          opacity: 0,
          scale: 0.9,
          z: -100,
          rotate: getRotation(index),
          y: 100,
        },
        animate: {
          opacity: isActive(index) ? 1 : 0.7,
          scale: isActive(index) ? 1 : 0.95,
          z: isActive(index) ? 0 : -100,
          rotate: isActive(index) ? 0 : getRotation(index),
          zIndex: isActive(index) ? 40 : totalCards + 2 - index,
          y: isActive(index) ? [0, -80, 0] : 0,
        },
      };
    }

    // Desktop/Tablet variants
    if (clickedCardIndex === index && isAnimatingToCenter) {
      return {
        initial: {
          x: positionFromCenter * (isTablet ? 120 : 140),
          y: Math.abs(positionFromCenter) * (isTablet ? 25 : 30),
          rotate: positionFromCenter * (isTablet ? 10 : 12),
          scale: 1,
          zIndex: 50,
        },
        animate: {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1.05,
          zIndex: 100,
        }
      };
    }

    return {
      initial: {
        x: 0,
        y: index * 8 + 100,
        rotate: getRotation(index),
        scale: 1,
        zIndex: totalCards - index,
      },
      animate: {
        x: positionFromCenter * (isTablet ? 120 : 140),
        y: Math.abs(positionFromCenter) * (isTablet ? 25 : 30),
        rotate: positionFromCenter * (isTablet ? 10 : 12),
        scale: 1,
        zIndex: totalCards - Math.abs(positionFromCenter),
      },
    };
  };

  const handleCardClick = async (card: FlipStackCard, index: number) => {
    if (isMobile) {
      setActiveIndex(index);
      setSelectedCard(card);
      setIsDockExpanded(true);
    } else {
      setClickedCardIndex(index);
      setIsAnimatingToCenter(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSelectedCard(card);
      setIsDockExpanded(true);
    }
  };

  const handleCloseDock = async () => {
    setIsDockExpanded(false);
    await new Promise(resolve => setTimeout(resolve, 1050));
    setSelectedCard(null);
    setClickedCardIndex(null);
    setIsAnimatingToCenter(false);
  };

  const { width: cardWidth, height: cardHeight } = getCardDimensions();

  return (
    <>
      <div className="h-full w-full py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div
              ref={containerRef}
              className={`relative ${
                isMobile ? "h-96" : isTablet ? "h-96" : "h-[450px]"
              } w-full ${
                isMobile ? "max-w-md" : isTablet ? "max-w-lg" : "max-w-2xl"
              } mx-auto`}
            >
              {isMobile ? (
                <div className="relative h-full w-full">
                  <AnimatePresence>
                    {cards.map((card, index: number) => {
                      const variants = getCardVariants(index);
                      return (
                        <motion.div
                          key={card.id}
                          className="absolute inset-0 origin-bottom cursor-pointer"
                          initial="initial"
                          animate={isInView ? "animate" : "initial"}
                          exit={{
                            opacity: 0,
                            scale: 0.9,
                            z: 100,
                            rotate: getRotation(index),
                          }}
                          variants={variants}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          onClick={() => handleCardClick(card, index)}
                        >
                          <Card className="w-full h-full shadow-2xl border-0 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <CardContent className="p-4 h-full flex flex-col">
                              {/* Image Placeholder */}
                              {card.imageUrl ? (
                                <div className="w-full h-40 rounded-lg mb-2 overflow-hidden">
                                  <img 
                                    src={card.imageUrl} 
                                    alt={card.title || `Project ${card.id}`}
                                    className="w-full h-full object-cover"
                                       />
                                   </div>
                                    ) : (
                                <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-2 flex items-center justify-center">
                                 <span className="text-white font-medium text-sm">
                                         Project Image
                                 </span>
                                 </div>
                                       )}
                              
                              <div className="flex-1 flex flex-col justify-center text-center p-3">
                                <h3 className="text-sm font-bold mb-1 text-gray-800 dark:text-white">
                                  {card.title || `Project ${card.id}`}
                                </h3>
                                 {card.description && (
                                   <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                                        {card.description.split(' ').slice(0, 6).join(' ')}
                                        {card.description.split(' ').length > 6 && (
                                        <span className="text-blue-500">...</span>
                                   )}
                                   </p>
                                      )}
                                <div className="text-xs text-blue-600 dark:text-blue-400">
                                  Click for details →
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <div
                  className="relative h-full w-full flex items-center justify-center"
                  style={{ perspective: "1000px" }}
                >
                  <AnimatePresence>
                    {cards.map((card, index: number) => {
                      const variants = getCardVariants(index);
                      return (
                        <motion.div
                          key={card.id}
                          className="absolute origin-bottom cursor-pointer"
                          initial="initial"
                          animate={isInView ? "animate" : "initial"}
                          variants={variants}
                          transition={{
                            duration: clickedCardIndex === index ? 0.5 : 0.7,
                            delay: clickedCardIndex === index ? 0 : index * 0.1,
                            ease: "easeOut",
                          }}
                          onClick={() => handleCardClick(card, index)}
                        >
                          <Card className={`${cardWidth} ${cardHeight} shadow-2xl border-0 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-300`}>
                            <CardContent className="p-0 sm:p-6 h-full flex flex-col">
                              {/* Image Placeholder */}
                              {card.imageUrl ? (
                                <div className={`w-full ${
                                 isTablet ? "h-40" : "h-48"
                                 } rounded-lg mb-4 overflow-hidden`}>
                                   <img 
                                     src={card.imageUrl} 
                                     alt={card.title || `Project ${card.id}`}
                                     className="w-full h-full object-cover"
                                      />
                                  </div>
                                    ) : (
                                  <div className={`w-full ${
                                    isTablet ? "h-40" : "h-48"
                                     } bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center`}>
                                      <span className="text-white font-medium">
                                       Project Image
                                      </span>
                                       </div>
                                           )}
                              
                              <div className="flex-1 flex flex-col justify-center text-center p-4 sm:p-6">
                                <h3 className={`${
                                  isTablet ? "text-lg" : "text-xl"
                                } font-bold mb-2 text-gray-800 dark:text-white`}>
                                  {card.title || `Project ${card.id}`}
                                </h3>
                                 {card.description && (
                                   <p className={`${
                                     isTablet ? "text-xs" : "text-sm"
                                       } text-gray-600 dark:text-gray-300 mb-3`}>
                                          {card.description.split(' ').slice(0, 6).join(' ')}
                                           {card.description.split(' ').length > 6 && (
                                           <span className="text-blue-500">...</span>
                                              )}
                                    </p>
                                    )}
                                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                  Click for details →
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* See More Projects Link */}
          {onSeeMore && (
            <div className="text-center mt-3 sm:mt-12">
              <GlassButton 
                onClick={onSeeMore}
                text="Explore More"
                className="mt-2"
              />
            </div>
          )}
        </div>
      </div>

      {/* Expanded Dock */}
      <AnimatePresence>
        {selectedCard && (
          <ExpandableDock
            headerContent={
              <div className="flex items-center gap-2 text-black dark:text-white">
                <span className="text-lg sm:text-xl font-bold">
                  {selectedCard.title || `Project ${selectedCard.id}`}
                </span>
              </div>
            }
            className="max-w-4xl"
            isExpanded={isDockExpanded}
            onClose={handleCloseDock}
          >
            <div className="text-black dark:text-white">
              {selectedCard.fullContent || (
                <div className="p-4 sm:p-6 md:p-8">
                  {selectedCard?.imageUrl ? (
                   <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl mb-6 overflow-hidden">
                     <img 
                        src={selectedCard.imageUrl} 
                        alt={selectedCard.title || `Project ${selectedCard.id}`}
                        className="w-full h-full object-cover"
                     />
                  </div>
               ) : (
                  <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-6 flex items-center justify-center">
                  <span className="text-white text-lg sm:text-xl font-semibold">
                      Project Preview
                  </span>
                  </div>
                  )}
                  
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                    {selectedCard.title || `Project ${selectedCard.id}`} Details
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
                    {selectedCard.description || `Detailed information about project ${selectedCard.id} will appear here.`}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Technologies</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                        <li>React.js</li>
                        <li>Node.js</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Features</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                        <li>Responsive Design</li>
                        <li>Modern UI/UX</li>
                        <li>Fast Performance</li>
                        <li>Cross-platform</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ExpandableDock>
        )}
      </AnimatePresence>
    </>
  );
}