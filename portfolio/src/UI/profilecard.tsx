"use client";
import React, { useState, useRef } from "react";
import Image from "../assets/mee.jpg";
import { ArrowBigLeft, X } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  AnimatePresence,
  useMotionTemplate,
} from "framer-motion";

interface Skill {
  name: string;
  icon:
    | string
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | React.ReactElement;
}

interface SocialLink {
  name: string;
  url: string;
  icon:
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | string
    | React.ReactElement;
}

interface ProfileCardProps {
  img: string;
  name: string;
  bio: string;
  skills: Skill[];
  socialLinks?: SocialLink[];
  position: string;
  spotlight?: boolean;
  spotlightColor?: string;
}

export default function ProfileCard({
 
  name,
  bio,
  skills,
  socialLinks = [],
  position,
  spotlight = false,
  spotlightColor = "99,102,241",
}: ProfileCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isImageShrunken, setIsImageShrunken] = useState(false);
  const arrowControls = useAnimation();
  const dragX = useMotionValue(0);
  const dragThreshold = 50;
  const isAnimating = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const backgroundImage = useMotionTemplate`radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(${spotlightColor}, 0.15), transparent)`;

  const arrowRotation = useTransform(dragX, [0, dragThreshold], [-180, 145]);

  const handleDragEnd = () => {
    if (dragX.get() > dragThreshold && !isRevealed && !isAnimating.current) {
      isAnimating.current = true;
      arrowControls.start({ x: dragThreshold, transition: { duration: 0.2 } });
      setIsImageShrunken(true);
      setTimeout(() => {
        setIsRevealed(true);
        isAnimating.current = false;
      }, 400);
    } else if (dragX.get() <= dragThreshold && !isRevealed) {
      arrowControls.start({
        x: 0,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      });
    } else if (isRevealed) {
      arrowControls.start({
        x: dragThreshold,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      });
    }
  };

  const resetCard = () => {
    if (isRevealed && !isAnimating.current) {
      isAnimating.current = true;
      x.set(0);
      y.set(0);
      arrowControls.start({ x: 0, transition: { duration: 0.3 } });
      setIsRevealed(false);
      setTimeout(() => {
        setIsImageShrunken(false);
        isAnimating.current = false;
      }, 300);
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateDepth = 12;
  const translateDepth = 15;

  const rotateX = useTransform(
    y,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );
  const rotateY = useTransform(
    x,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );
  const translateX = useTransform(
    x,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );
  const translateY = useTransform(
    y,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`]
  );

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isRevealed || isAnimating.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const buffer = 10;
    if (
      mouseXPos < -buffer ||
      mouseXPos > rect.width + buffer ||
      mouseYPos < -buffer ||
      mouseYPos > rect.height + buffer
    )
      return;

    x.set(mouseXPos / rect.width - 0.5);
    y.set(mouseYPos / rect.height - 0.5);

    if (spotlight) {
      mouseX.set(mouseXPos);
      mouseY.set(mouseYPos);
      spotlightX.set(mouseXPos);
      spotlightY.set(mouseYPos);
    }
  };

  const handleMouseLeave = () => {
    if (isRevealed && !isAnimating.current) {
      setTimeout(() => {
        if (isRevealed && !isAnimating.current) {
          x.set(0);
          y.set(0);
        }
      }, 50);
    }
  };

  const renderSkillIcon = (skill: Skill) => {
    if (typeof skill.icon === "string") {
      if (skill.icon.startsWith("<svg")) {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: skill.icon }}
            className="w-5 h-5 flex items-center justify-center"
          />
        );
      } else {
        return (
          <img src={skill.icon} alt={skill.name} width={20} height={20} />
        );
      }
    }

    if (React.isValidElement(skill.icon)) {
      return React.cloneElement(
        skill.icon as React.ReactElement<{ className?: string }>,
        { className: "w-5 h-5" }
      );
    }

    if (typeof skill.icon === "function") {
      const IconComponent = skill.icon;
      return <IconComponent className="w-5 h-5" />;
    }

    return null;
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        ref={cardRef}
        className={`relative w-full max-w-[18rem] h-[24rem] rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
          spotlight && isRevealed ? "group" : ""
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          isRevealed
            ? {
                rotateX,
                rotateY,
                translateX,
                translateY,
                transformStyle: "preserve-3d",
                transition: "transform 0.1s ease-out",
              }
            : {}
        }
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 z-0"></div>
        
        {spotlight && isRevealed && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{ backgroundImage }}
          />
        )}
        
        <motion.div
          initial={{ width: "100%", height: "100%" }}
          animate={{
            width: isImageShrunken ? "5rem" : "100%",
            height: isImageShrunken ? "7rem" : "100%",
            top: isImageShrunken ? "5rem" : 0,
            left: isImageShrunken ? "1.5rem" : 0,
            borderRadius: isImageShrunken ? "0.75rem" : "0px",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute overflow-hidden"
        >
          <img
            src={Image}
            alt={name}
            className="w-full h-full object-cover"
          />

          <motion.div
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg shadow-lg cursor-grab active:cursor-grabbing z-10 border border-gray-200"
            drag={!isRevealed ? "x" : false}
            dragConstraints={{ left: 0, right: dragThreshold }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ x: dragX }}
            animate={arrowControls}
            whileTap={!isRevealed ? { scale: 1.1 } : {}}
          >
            <motion.div style={{ rotate: arrowRotation }}>
              <ArrowBigLeft className="w-4 h-4 text-gray-700 pointer-events-none" />
            </motion.div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              key="content"
              className="absolute inset-0 p-6 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-gray-700 dark:bg-white rounded-full cursor-pointer z-20 shadow-lg"
                onClick={resetCard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X
                  className="w-4 h-4 text-white dark:text-gray-800"
                  strokeWidth={2.5}
                />
              </motion.div>

              {/* Header Section */}
              <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{name}</h1>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{position}</p>
              </div>

              {/* Skills Section - Fixed xpositioning */}
              <div className="mb-4 mt-12 ml-[100px]">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-center justify-center w-9 h-9 ${
                        spotlight ? "group relative overflow-hidden" : ""
                      }`}
                      title={skill.name}
                      onMouseMove={
                        spotlight
                          ? (e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const y = e.clientY - rect.top;
                              e.currentTarget.style.setProperty("--spotlight-x", `${x}px`);
                              e.currentTarget.style.setProperty("--spotlight-y", `${y}px`);
                            }
                          : undefined
                      }
                    >
                      {spotlight && (
                        <div
                          className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(80px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(${spotlightColor}, 0.15), transparent)`,
                          }}
                        />
                      )}
                      <div className="relative z-10">
                        {renderSkillIcon(skill)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio Section - Fixed positioning with scroll if needed */}
              <div className="mb-4 flex-1 min-h-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
                  {bio}
                </p>
              </div>

              {/* Social Links - Fixed at bottom */}
              <div className="flex gap-4 pt-2">
                {socialLinks.map((social, index) => {
                  const renderIcon = () => {
                    if (typeof social.icon === "string") {
                      return (
                        <img 
                          src={social.icon} 
                          alt={social.name} 
                          className="object-contain w-full h-full" 
                        />
                      );
                    } else if (React.isValidElement(social.icon)) {
                      return React.cloneElement(
                        social.icon as React.ReactElement<{ className?: string; width?: number; height?: number }>,
                        { 
                          className: "w-4 h-4", 
                          width: 16, 
                          height: 16 
                        }
                      );
                    } else if (typeof social.icon === "function") {
                      const IconComponent = social.icon;
                      return <IconComponent className="w-4 h-4" />;
                    }
                    return null;
                  };

                  return (
                    <a 
                      key={index} 
                      href={social.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="transition-transform hover:scale-110"
                    >
                      <div
                        className={`w-8 h-8 relative flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 ${
                          spotlight ? "group overflow-hidden" : ""
                        }`}
                        title={social.name}
                        onMouseMove={
                          spotlight
                            ? (e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                e.currentTarget.style.setProperty("--spotlight-x", `${x}px`);
                                e.currentTarget.style.setProperty("--spotlight-y", `${y}px`);
                              }
                            : undefined
                        }
                      >
                        {spotlight && (
                          <div
                            className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
                            style={{
                              background: `radial-gradient(60px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(${spotlightColor}, 0.15), transparent)`,
                            }}
                          />
                        )}
                        <div className="relative z-10 text-gray-600 dark:text-gray-400">
                          {renderIcon()}
                        </div>
                      </div>
                      <span className="sr-only">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isRevealed && !isImageShrunken && (
          <motion.div
            className="absolute top-4 right-16 text-white text-xs opacity-80 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              transition: { repeat: Infinity, duration: 2, repeatDelay: 1 },
            }}
          >
            Drag to reveal →
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}