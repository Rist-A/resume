"use client";
import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Card, CardContent } from "../UI/card";
import { cn } from "../lib/utils";
import GlassButton from "../UI/GlassButton";

interface FlipStackCard {
  id: number;
  content?: React.ReactNode;
  title?: string;
  description?: string;
  fullContent?: React.ReactNode;
  imageUrl?: string;
  technologies?: string[];
  features?: string[];
  category?: string;
  githubUrl?: string;
}

interface FlipStackProps {
  cards?: FlipStackCard[];
  onSeeMore?: () => void;
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
          "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden flex flex-col-reverse mx-auto",
          className
        )}
      >
        <div
          onClick={isCollapsed ? undefined : onClose}
          className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 text-black dark:text-white w-full h-[70px] whitespace-nowrap cursor-pointer border-t border-gray-200/50 dark:border-gray-700/50 flex-shrink-0"
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
      title: "E-Commerce Platform",
      description: "Modern online shopping experience with real-time inventory management and secure payment processing.",
      imageUrl: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
      features: ["Real-time inventory tracking", "Secure payment processing", "User account management", "Order tracking system"],
      category: "Web Application"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management platform with team features and real-time updates.",
      imageUrl: "/api/placeholder/400/250",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS", "PWA", "WebSockets"],
      features: ["Real-time collaboration", "File sharing system", "Team communication channels", "Progress tracking"],
      category: "Productivity"
    },
    {
      id: 3,
      title: "Fitness Tracker",
      description: "AI-powered workout and nutrition planning platform with social features and progress analytics.",
      imageUrl: "/api/placeholder/400/250",
      technologies: ["React Native", "Python", "TensorFlow", "GraphQL", "PostgreSQL"],
      features: ["AI workout recommendations", "Progress analytics dashboard", "Social fitness challenges", "Meal planning"],
      category: "Health & Fitness"
    },
    {
      id: 4,
      title: "Travel Planner",
      description: "Intelligent itinerary builder with local experiences and real-time travel information.",
      imageUrl: "/api/placeholder/400/250",
      technologies: ["Next.js", "TypeScript", "Mapbox", "Prisma", "OpenAI API"],
      features: ["AI itinerary generation", "Local guide integration", "Budget tracking", "Real-time weather integration"],
      category: "Travel"
    },
    {
      id: 5,
      title: "Learning Platform",
      description: "Interactive online courses with progress tracking, certificates, and community features.",
      imageUrl: "/api/placeholder/400/250",
      technologies: ["Angular", "NestJS", "PostgreSQL", "AWS", "Docker"],
      features: ["Video streaming platform", "Interactive quizzes & assessments", "Certificate generation", "Discussion forums"],
      category: "Education"
    },
    {
      id: 6,
      title: "Social Media Dashboard",
      description: "Comprehensive analytics and management platform for social media networks and content strategy.",
      imageUrl: "/api/placeholder/400/250",
      technologies: ["React", "D3.js", "Express", "Redis", "MongoDB"],
      features: ["Real-time analytics", "Content scheduling", "Audience insights", "Performance metrics"],
      category: "Analytics"
    },
  ],
  onSeeMore,
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

  const getCardDimensions = () => {
    if (isMobile) return { width: "w-64", height: "h-80" };
    if (isTablet) return { width: "w-72", height: "h-96" };
    return { width: "w-80", height: "h-[420px]" };
  };

  const getRotation = (index: number) => {
    const rotations = [-8, -4, -2, 2, 4, 8]; // Symmetrical rotations for 6 cards
    return rotations[index];
  };

  const isActive = (index: number) => index === activeIndex;

  const getCardVariants = (index: number): Variants => {
    const totalCards = 6;
    
    // For even number of cards, we need to adjust the center positioning
    // Cards will be at positions: -2.5, -1.5, -0.5, 0.5, 1.5, 2.5
    const adjustedPositionFromCenter = index - (totalCards - 1) / 2;
    
    if (isMobile) {
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

    if (clickedCardIndex === index && isAnimatingToCenter) {
      return {
        initial: {
          x: adjustedPositionFromCenter * (isTablet ? 120 : 140),
          y: Math.abs(adjustedPositionFromCenter) * (isTablet ? 25 : 30),
          rotate: adjustedPositionFromCenter * (isTablet ? 10 : 12),
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
        x: adjustedPositionFromCenter * (isTablet ? 120 : 140),
        y: Math.abs(adjustedPositionFromCenter) * (isTablet ? 25 : 30),
        rotate: adjustedPositionFromCenter * (isTablet ? 10 : 12),
        scale: 1,
        zIndex: totalCards - Math.abs(adjustedPositionFromCenter),
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
                    {cards.slice(0, 6).map((card, index: number) => {
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
                          <Card className="w-full h-full shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-0 h-full flex flex-col">
                              {/* Image Section */}
                              {card.imageUrl ? (
                                <div className="w-full h-40 relative overflow-hidden">
                                  <img 
                                    src={card.imageUrl} 
                                    alt={card.title || `Project ${card.id}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                                      {card.category || "Project"}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden flex items-center justify-center">
                                  <span className="text-white font-medium text-xs">
                                    Project Image
                                  </span>
                                  <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                                      {card.category || "Project"}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Add this after the Image Section in Mobile Cards */}
{card.githubUrl && (
  <div className="px-4 pb-2">
    <a 
      href={card.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 text-xs"
      onClick={(e) => e.stopPropagation()}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      GitHub
    </a>
  </div>
)}
                              
                              {/* Content Section */}
                              <div className="flex-1 flex flex-col justify-center p-4">
                                <h3 className="text-sm font-bold mb-1 text-gray-800 dark:text-white line-clamp-1">
                                  {card.title || `Project ${card.id}`}
                                </h3>
                                {card.description && (
                                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                                    {card.description}
                                  </p>
                                )}
                                
                                {/* Technologies Preview */}
                                {card.technologies && (
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {card.technologies.slice(0, 3).map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] rounded-full"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                    {card.technologies.length > 3 && (
                                      <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded-full">
                                        +{card.technologies.length - 3}
                                      </span>
                                    )}
                                  </div>
                                )}
                                
                                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center justify-between">
                                  <span>View Details</span>
                                  <span>→</span>
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
                    {cards.slice(0, 6).map((card, index: number) => {
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
                          <Card className={`${cardWidth} ${cardHeight} shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-300 group`}>
                            <CardContent className="p-0 h-full flex flex-col">
                              {/* Image Section */}
                              {card.imageUrl ? (
                                <div className="w-full h-48 relative overflow-hidden">
                                  <img 
                                    src={card.imageUrl} 
                                    alt={card.title || `Project ${card.id}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute top-4 left-4">
                                    <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
                                      {card.category || "Project"}
                                    </span>
                                  </div>
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>
                              ) : (
                                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                  <span className="text-white font-medium text-sm">
                                    Project Image
                                  </span>
                                  <div className="absolute top-4 left-4">
                                    <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
                                      {card.category || "Project"}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Add this after the Image Section in Desktop/Tablet Cards */}
{card.githubUrl && (
  <div className="px-4 pb-3">
    <a 
      href={card.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 text-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      GitHub
    </a>
  </div>
)}
                              
                              {/* Content Section */}
                              <div className="flex-1 flex flex-col justify-center p-4">
                                <h3 className={`${
                                  isTablet ? "text-base" : "text-lg"
                                } font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`}>
                                  {card.title || `Project ${card.id}`}
                                </h3>
                                {card.description && (
                                  <p className={`${
                                    isTablet ? "text-xs" : "text-sm"
                                  } text-gray-600 dark:text-gray-300 mb-3 line-clamp-2`}>
                                    {card.description}
                                  </p>
                                )}
                                
                                {/* Technologies Preview */}
                                {card.technologies && (
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {card.technologies.slice(0, 4).map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                    {card.technologies.length > 4 && (
                                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                                        +{card.technologies.length - 4}
                                      </span>
                                    )}
                                  </div>
                                )}
                                
                                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center justify-between group-hover:translate-x-1 transition-transform duration-300">
                                  <span>Explore Project</span>
                                  <span>→</span>
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

        </div>
      </div>

      {/* Expanded Dock */}
      <AnimatePresence>
        {selectedCard && (
          <ExpandableDock
            headerContent={
              <div className="flex items-center gap-3 text-black dark:text-white">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-base sm:text-lg font-bold">
                  {selectedCard.title || `Project ${selectedCard.id}`}
                </span>
                {selectedCard.category && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                    {selectedCard.category}
                  </span>
                )}
              </div>
            }
            className="max-w-4xl"
            isExpanded={isDockExpanded}
            onClose={handleCloseDock}
          >
            <div className="text-black dark:text-white">
              <div className="p-4 sm:p-6 md:p-8">
                {/* Project Image */}
                {selectedCard.imageUrl ? (
                  <div className="w-full h-56 sm:h-72 rounded-xl mb-4 sm:mb-6 overflow-hidden">
                    <img 
                      src={selectedCard.imageUrl} 
                      alt={selectedCard.title || `Project ${selectedCard.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-56 sm:h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 sm:mb-6 flex items-center justify-center">
                    <span className="text-white text-lg sm:text-xl font-semibold">
                      {selectedCard.title || `Project ${selectedCard.id}`}
                    </span>
                  </div>
                )}

                {/* Add this after the Project Image in Expanded Dock */}
{selectedCard.githubUrl && (
  <div className="flex justify-center mb-4">
    <a 
      href={selectedCard.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View Source Code
    </a>
  </div>
)}
                
                {/* Project Description */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                    {selectedCard.title || `Project ${selectedCard.id}`}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedCard.description || `This project showcases modern development practices and user-centered design principles.`}
                  </p>
                </div>
                
                {/* Technologies & Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  {/* Technologies Section */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6">
                    <h4 className="font-bold mb-3 text-lg sm:text-xl flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCard.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-blue-500 text-white text-xs sm:text-sm rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      )) || (
                        <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs sm:text-sm rounded-full">
                          No technologies specified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Features Section */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6">
                    <h4 className="font-bold mb-3 text-lg sm:text-xl flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Key Features
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {selectedCard.features?.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {feature}
                        </li>
                      )) || (
                        <li className="flex items-center gap-2 text-sm sm:text-base text-gray-500">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          No features specified
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {/* Additional Project Details */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 sm:p-6">
                  <h4 className="font-bold mb-3 text-lg sm:text-xl">Project Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="text-center p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">95%</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">User Satisfaction</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mb-1">40%</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Performance Boost</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">100%</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Mobile Responsive</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ExpandableDock>
        )}
      </AnimatePresence>
    </>
  );
}