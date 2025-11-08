import React from "react";
import ProfileCard from "../UI/profilecard";
import { FaGithub, 
  FaLinkedin, 
  FaTelegram, 
  FaDatabase, 
  FaCode, 
  FaServer, 
  FaCloud,
  FaJs,
  FaReact,
  FaNode  } from "react-icons/fa";
import VenomBeam from "../UI/venom-beam.tsx";
import { SiJavascript, SiReact, SiNodedotjs } from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-xl" /> },
  { name: "React", icon: <SiReact className="text-blue-400 text-xl" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-500 text-xl" /> },
];

const socialLinks = [
  { name: "GitHub", url: "https://github.com/Rist-A", icon: <FaGithub /> },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/wubrist-alemu-45a375385/", icon: <FaLinkedin /> },
  { name: "Telegram", url: "https://t.me/rist_621", icon: <FaTelegram /> },
];

const Profile = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background - Behind everything */}
      <div className="fixed inset-0 -z-10">
        <VenomBeam />
      </div>
      
      {/* Content - With proper z-index */}
      <div className="relative z-0 w-full max-w-7xl mx-auto">
        <div className="text-center mb-2 md:mb-4 pt-2 px-4">
          <div className="relative inline-block">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1">
              About Me
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with modern technologies
          </p>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-180px)] pb-6 scrollbar-hide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
              
              <div className="w-full lg:w-2/5 relative">
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                    <ProfileCard
                      spotlight
                      spotlightColor="99,102,241"
                      img="https://github.com/Adityakishore0.png"
                      name="Wubrist Alemu"
                      bio="Full-Stack developer with strong creativity"
                      skills={skills}
                      socialLinks={socialLinks}
                      position="Full Stack Developer"
                    />
                  </div>
                </div>
              </div>

              {/* Right Content Section */}
              <div className="w-full lg:w-3/5">
                <div className="space-y-6">
                  {/* Bio Section */}
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-1.5 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-1"></div>
                      <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed font-light">
                        I am a full-stack developer with a strong passion for backend development, 
                        specializing in building well-structured APIs and designing efficient databases 
                        for large-scale solutions. I am currently pursuing my Bachelor's degree in 
                        Information Systems at Addis Ababa University, where I am a 4th-year student. 
                        I enjoy tackling complex problems and creating scalable, organized systems 
                        that make a real impact.
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 backdrop-blur-sm border border-blue-200/20 dark:border-blue-500/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <FaServer className="text-white text-lg" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Backend Development</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">
                        Building robust APIs and server architecture for scalable applications
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 backdrop-blur-sm border border-green-200/20 dark:border-green-500/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <FaDatabase className="text-white text-lg" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Database Design</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">
                        Designing efficient database structures and optimization strategies
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 backdrop-blur-sm border border-purple-200/20 dark:border-purple-500/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <FaCode className="text-white text-lg" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white">API Architecture</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">
                        Creating well-documented and maintainable RESTful APIs
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 backdrop-blur-sm border border-orange-200/20 dark:border-orange-500/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <FaCloud className="text-white text-lg" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Scalable Systems</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">
                        Developing systems that grow with your business needs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;