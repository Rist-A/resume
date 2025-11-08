"use client";
import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../UI/button";
import { Card, CardContent } from "../UI/card";
import { Label } from "../UI/label";
import { motion } from "framer-motion";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white ring-offset-background placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white ring-offset-background placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export function ContactForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className={cn("flex flex-col gap-6", className)}
  id={props.id}
  style={props.style}
>
          <Card className="overflow-hidden p-0 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-transparent shadow-xl">
            <CardContent className="grid p-0 md:grid-cols-2 bg-transparent">
              <div className="p-6 md:p-8 relative">
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 bg-clip-text text-transparent whitespace-nowrap">
                      Contact Me
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-balance mt-1">
                      Let's discuss your next project
                    </p>
                  </div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100/80 dark:bg-green-900/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-sm text-gray-900 dark:text-white font-medium"
                          >
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Wubrist"
                            required
                            className="h-12 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-sm text-gray-900 dark:text-white font-medium"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Alemu"
                            required
                            className="h-12 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm text-gray-900 dark:text-white font-medium"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="wubrist@example.com"
                          required
                          className="h-12 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-sm text-gray-900 dark:text-white font-medium"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="Project Inquiry"
                          required
                          className="h-12 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-sm text-gray-900 dark:text-white font-medium"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell me about your project..."
                          required
                          className="min-h-[120px] focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300/50 dark:border-gray-600/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-transparent text-gray-500 dark:text-gray-400 px-3 font-medium">
                        Connect with me
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      type="button"
                      className="h-12 border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-md backdrop-blur-sm"
                      onClick={() => window.open('https://www.linkedin.com/in/wubrist-alemu-45a375385/', '_blank')}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="h-12 border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-md backdrop-blur-sm"
                      onClick={() => window.open('https://github.com/Rist-A', '_blank')}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="sr-only">GitHub</span>
                    </Button>
                    <Button
  variant="outline"
  type="button"
  className="h-12 border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-md backdrop-blur-sm"
  onClick={() => window.open('https://t.me/rist_621', '_blank')}
>
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.191c-.174.761-1.408 6.781-1.408 6.781s-.103.48-.311.591c-.208.111-.458.098-.458.098l-3.379-.047l-.793-1.423l4.157-3.857c.185-.185.049-.334-.149-.21l-5.143 3.397l-2.177-.682c-.476-.152-.519-.476.107-.714l8.455-3.261c.357-.143.595.089.595.089l.001.001z"/>
  </svg>
  <span className="sr-only">Telegram</span>
</Button>
                  </div>

                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Prefer a call?{" "}
                    <a
                      href="tel:+1234567890"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
                    >
                       +251904601880
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative hidden md:flex overflow-hidden w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Contact Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent dark:from-black/70 flex items-center justify-center">
                  <div className="text-white p-8">
                    <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                    <p className="text-lg opacity-90">
                      Let's bring your ideas to life with cutting-edge solutions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <motion.div
            className="w-full max-w-sm md:max-w-3xl mx-auto px-4 sm:px-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <div className="text-gray-600 dark:text-gray-400 text-center text-xs sm:text-sm text-balance break-words">
              I typically respond within 24 hours. For urgent matters,{" "}
              <a
                href="tel:+1234567890"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
              >
                call me directly
              </a>
              .
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}