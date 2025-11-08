"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

interface AchievementItem {
  id?: number;
  title: string;
  year?: string;
  description: string;
  hasCertificate?: boolean;
  certificateUrl?: string;
  // New counter fields
  counterValue?: number;
  counterSuffix?: string;
  counterLabel?: string;
}

function StatsCarousel({
  value,
  suffix,
  trigger,
  onDone,
}: {
  value: number;
  suffix?: string;
  trigger: number;
  onDone?: () => void;
}) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 50,
    mass: 1,
  });

  const rounded = useTransform(springValue, (latest) =>
    Number(latest.toFixed(value % 1 === 0 ? 0 : 1))
  );

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(0);
    let animationComplete = false;

    const unsub = rounded.on("change", (v) => {
      setDisplayValue(v);
      if (v >= value && !animationComplete) {
        animationComplete = true;
        onDone?.();
      }
    });

    const timeout = setTimeout(() => {
      motionValue.set(value);
    }, 100);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, [trigger, value, motionValue, rounded, onDone]);

  return (
    <div className="text-5xl font-extrabold text-black dark:text-white">
      {displayValue}
      {suffix}
    </div>
  );
}

const handleDownloadCertificate = (certificateUrl?: string) => {
  if (certificateUrl) {
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = certificateUrl.split('/').pop() || 'certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default function StatsCarouselCount({
  stats,
  title,
  className = "",
  cardClassName = "",
  animation,
}: {
  stats?: AchievementItem[];
  title?: string;
  className?: string;
  cardClassName?: string;
  animation?: "drag";
}) {
  const defaultAchievements: AchievementItem[] = [
    { 
      id: 1,
      title: "3rd Place – She Codes Hackathon",
      year: "2024",
      description: "Achieved 3rd Place in the She Codes Hackathon, a competitive women's tech event held across 14 universities with 47 participating teams, for developing an innovative project in a collaborative, high-pressure environment.",
      hasCertificate: true,
      certificateUrl: "/certificates/she-codes-hackathon.pdf",
      counterValue: 3,
      counterSuffix: "rd Place",
      counterLabel: "Among 47 Teams"
    },
    { 
      id: 2,
      title: "Completed Internship",
      year: "2024",
      description: "Completed a practical internship at Nael Production, where I contributed to tech-related tasks, collaborated with the team, and received a recognition certificate for strong performance.",
      hasCertificate: true,
      certificateUrl: "/certificates/nael-production-internship.pdf",
      counterValue: 2,
      counterSuffix: "+",
      counterLabel: "Major Projects"
    },
    { 
      id: 3,
      title: "Completed Internship",
      year: "2024",
      description: "Completed a practical internship at Arada Subcity, where I contributed to automate different automation systems.",
      hasCertificate: false,
      counterValue: 5,
      counterSuffix: "+",
      counterLabel: "Systems Automated"
    },
  ];

  const initialStats = (stats ?? defaultAchievements).map((s, i) => ({
    ...s,
    id: i + 1,
  }));

  const [items, setItems] = useState(initialStats);
  const [triggerCounter, setTriggerCounter] = useState(0);

  const [phase, setPhase] = useState<"idle" | "down" | "stackUp" | "upReenter">(
    "idle"
  );
  const [activeTopId, setActiveTopId] = useState(initialStats[0].id!);
  const [animatedIds, setAnimatedIds] = useState<Set<number>>(new Set());
  const [resetQueue, setResetQueue] = useState<Set<number>>(new Set());

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDragMode = animation === "drag";

  useEffect(() => {
    if (isDragMode) return;

    const startAutoPlay = () => {
      autoPlayTimeoutRef.current = setTimeout(() => {
        if (phase === "idle") {
          setPhase("down");
        }
      }, 3000);
    };

    if (phase === "idle") {
      startAutoPlay();
    }

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isDragMode, phase]);

  useEffect(() => {
    if (isDragMode) return;

    if (phase === "down") {
      timeoutRef.current = setTimeout(() => setPhase("stackUp"), 600);
    } else if (phase === "stackUp") {
      timeoutRef.current = setTimeout(() => setPhase("upReenter"), 600);
    } else if (phase === "upReenter") {
      timeoutRef.current = setTimeout(() => {
        setItems((prev) => {
          const [first, ...rest] = prev;
          const newTopId = rest[0].id!;

          setResetQueue((r) => {
            const newSet = new Set(r);
            newSet.add(first.id!);
            return newSet;
          });

          setAnimatedIds((prev) => {
            const copy = new Set(prev);
            copy.delete(first.id!);
            return copy;
          });

          setActiveTopId(newTopId);
          setTriggerCounter((t) => t + 1);

          return [...rest, first];
        });

        setPhase("idle");
      }, 600);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDragMode, phase]);

  const handleDragEnd = (_: any, info: { offset: { y: number } }) => {
    if (!isDragMode) return;

    const dragDistance = info.offset.y;

    if (dragDistance > 100) {
      setItems((prev) => {
        const [first, ...rest] = prev;
        setTriggerCounter((t) => t + 1);
        return [...rest, first];
      });
    }
  };

  useEffect(() => {
    setTriggerCounter((t) => t + 1);
  }, []);

  return (
    <section
      className={`py-20 px-4 w-full max-w-md mx-auto text-center relative h-[500px] z-[40] ${className}`}
    >
      <h2 className="text-lg font-bold text-black dark:text-white mb-12">
        {title ?? ""}
      </h2>

      <div className="relative h-[400px]">
        <AnimatePresence>
          {items.map((achievement, index) => {
            const baseY = index * 20;
            const scale = 1 - index * 0.05;
            const isTopCard = index === 0;
            const bottomIndex = items.length - 1;
            const bottomScale = 1 - bottomIndex * 0.05;

            let animate = { x: 0, y: baseY, scale };

            if (!isDragMode) {
              if (isTopCard && phase === "down") {
                animate = { x: 0, y: baseY + 150, scale: 0.8 };
              }
              if (!isTopCard && phase === "stackUp") {
                animate = { x: 0, y: baseY - 20, scale };
              }
              if (isTopCard && phase === "stackUp") {
                animate = { x: 0, y: baseY + 150, scale: 0.8 };
              }
              if (isTopCard && phase === "upReenter") {
                animate = { x: 0, y: bottomIndex * 20, scale: bottomScale };
              }
            }

            const zIndex =
              !isDragMode && phase === "upReenter" && isTopCard
                ? 0
                : Math.max(0, Math.min(40, 40 - index));

            const shouldAutoAnimate =
              !isDragMode &&
              achievement.id === activeTopId &&
              phase === "idle" &&
              !animatedIds.has(achievement.id!);

            const shouldDragAnimate = isDragMode && isTopCard;

            const shouldShowZero =
              !isDragMode &&
              resetQueue.has(achievement.id!) &&
              achievement.id !== activeTopId;

            return (
              <motion.div
                key={achievement.id}
                className="absolute left-0 right-0 mx-auto w-full touch-none"
                style={{ zIndex }}
                animate={animate}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                drag={isDragMode && isTopCard ? "y" : false}
                dragConstraints={{ top: 0, bottom: 150 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                dragTransition={{ 
                  bounceStiffness: 300, 
                  bounceDamping: 30,
                  power: 0,
                  timeConstant: 200,
                  restDelta: 0.001
                }}
                whileHover={
                  isDragMode && isTopCard ? { scale: 1.02, cursor: "grab" } : {}
                }
                whileDrag={
                  isDragMode && isTopCard ? { scale: 0.95, cursor: "grabbing" } : {}
                }
              >
                <div
                  className={`flex flex-col items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-950 shadow-lg min-h-[320px] ${
                    isDragMode && isTopCard
                      ? "hover:shadow-xl transition-shadow duration-200"
                      : ""
                  } ${cardClassName}`}
                >
                  {/* Counter Section */}
                  {achievement.counterValue && (
                    <div className="text-center mb-4">
                      {shouldAutoAnimate ? (
                        <StatsCarousel
                          value={achievement.counterValue}
                          suffix={achievement.counterSuffix}
                          trigger={triggerCounter}
                          onDone={() =>
                            setAnimatedIds((prev) => new Set(prev).add(achievement.id!))
                          }
                        />
                      ) : shouldDragAnimate ? (
                        <StatsCarousel
                          value={achievement.counterValue}
                          suffix={achievement.counterSuffix}
                          trigger={triggerCounter}
                        />
                      ) : shouldShowZero ? (
                        <div className="text-5xl font-extrabold text-black dark:text-white">
                          0{achievement.counterSuffix}
                        </div>
                      ) : (
                        <div className="text-5xl font-extrabold text-black dark:text-white">
                          {achievement.counterValue}
                          {achievement.counterSuffix}
                        </div>
                      )}
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 text-center uppercase tracking-wide">
                        {achievement.counterLabel}
                      </p>
                    </div>
                  )}

                  {/* Achievement Details */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-black dark:text-white mb-1">
                      {achievement.title}
                    </h3>
                    {achievement.year && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                        ({achievement.year})
                      </p>
                    )}
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                  
                  {achievement.hasCertificate && (
                    <button
                      onClick={() => handleDownloadCertificate(achievement.certificateUrl)}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      See Certificate
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}