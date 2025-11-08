import FlipStack from "../UI/flipstack";
import {X} from "lucide-react"
import React from 'react'
import { useState } from 'react'
import img from "../assets/dashboard.avif"
import assit from "../assets/assist.avif"
import blog from "../assets/blog.avif"
import DetailProject from '../Components/DetailProject.tsx';
type ActiveComponent = 'home' | 'projects' | 'about' | 'contact' | null;
const Projects = () => {
 
const [activeComponent, setActiveComponent] = useState<ActiveComponent>(null);

  const handleNavigation = (component: ActiveComponent) => {
    setActiveComponent(component);
  };

  const closeComponent = () => {
    setActiveComponent(null);
  };

   const modalContainerClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm";
  const modalContentClass = "relative max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden rounded-2xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-2xl";
  const scrollContainerClass = "overflow-y-auto h-full scrollbar-hide";
  const projectCards = [
   {
  id: 1,
  title: "Arada Subcity Integrated Service Portal",
  description: "A unified digital portal for Arada Subcity that integrates stock management, feedback, automation, and hall reservation systems into one centralized platform.",
  imageUrl:img,
  githubUrl: "https://github.com/Rist-A/ERP-system.git",
  fullContent: (
    <div className="p-2 sm:p-4">
             {img ? (
          <div className="w-full h-48 sm:h-56 rounded-xl mb-6 overflow-hidden">
            <img 
              src={img} 
              alt="Arada Subcity Integrated Service Portal"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              Arada Subcity Integrated Service Portal
            </span>
          </div>
        )}


      <h3 className="text-xl sm:text-2xl font-bold mb-4">
        Arada Subcity Integrated Service Portal
      </h3>
      {/* GitHub Link in the modal - Minimal design */}
<div className="mb-4 flex justify-center">
  <a 
    href="https://github.com/Rist-A/ERP-system.git" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 text-sm"
  >
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    GitHub
  </a>
</div>

      <p className="text-gray-700 dark:text-gray-300 mb-6 text-base sm:text-lg">
        The <strong>Arada Subcity Integrated Service Portal</strong> is a digital transformation platform 
        developed to modernize and automate administrative operations within 
        <strong> Arada Subcity, 4 Kilo</strong>. It serves as a unified gateway that brings together multiple 
        systems — from stock management and automation to digital hall reservations and citizen feedback — 
        into one seamless and efficient web environment. Designed for scalability, data accuracy, and 
        transparency, it enhances productivity and ensures smoother communication between departments and citizens.
      </p>
       {/* Demo Video Section - Embedded YouTube */}
<div className="mb-6 sm:mb-8">
  <h4 className="font-semibold mb-4 text-lg text-gray-800 dark:text-gray-200">Demo Video</h4>
  <div className="w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://www.youtube.com/embed/GhnJPzTIPhY?autoplay=0&rel=0&modestbranding=1"
        title="Arada Subcity Portal Demo"
        className="w-full h-64 sm:h-80 md:h-96"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="p-4 bg-gray-800 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-lg">Arada Subcity Project</p>
          <p className="text-sm text-gray-300 mt-1">Watch the complete demo of all features and user interactions</p>
        </div>
        <div className="flex items-center space-x-2 text-sm bg-red-600 px-3 py-1 rounded-full">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          <span>YouTube</span>
        </div>
      </div>
    </div>
  </div>
  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
    The video will play directly in this window. Use fullscreen for the best viewing experience.
  </p>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h4 className="font-semibold mb-3 text-lg">Technologies</h4>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>Node</li>
            <li>React.js</li>
            <li>PostgreSql</li>
            <li>JWT Authentication</li>
            <li>RESTful API Integration</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-lg">Key Features</h4>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>Stock Recording & Management</li>
            <li>Automated Stock Analysis Dashboard</li>
            <li>Digital Hall Reservation System</li>
            <li>Feedback & Request Management</li>
            <li>Comprehensive Admin Dashboard</li>
            <li>Role-Based Access Control</li>
            <li>Integrated Multi-System Architecture</li>
          </ul>
        </div>
      </div>
       <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-lg text-blue-800 dark:text-blue-300">Problem Solved</h4>
        <p className="text-sm text-blue-700 dark:text-blue-200">
          Addresses the common challenges faced by AAU freshmen in accessing accurate, up-to-date 
          information about university procedures, reducing confusion and saving time for thousands 
          of new students each academic year.
        </p>
      </div>
    </div>
  )
},

{
  id: 2,
  title: "AAU Assistant - University Guidance Platform",
  description: "AI-powered assistant for Addis Ababa University freshmen providing guidance on procedures, schedules, and campus information.",
  imageUrl: assit,
  githubUrl: "https://github.com/Rist-A/AAU-Assistant.git",
  fullContent: (
    <div className="p-1 sm:p-3">
      {img ? (
        <div className="w-full h-40 sm:h-48 rounded-xl mb-6 overflow-hidden">
          <img 
            src={assit} 
            alt="AAU Assistant - University Guidance Platform"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">
            AAU Assistant Platform
          </span>
        </div>
      )}

      <h3 className="text-xl sm:text-2xl font-bold mb-4">
        AAU Assistant - University Guidance Platform
      </h3>
          {/* GitHub Link in the modal - Minimal design */}
<div className="mb-4 flex justify-center">
  <a 
    href="https://github.com/Rist-A/AAU-Assistant.git" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 text-sm"
  >
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    GitHub
  </a>
</div>

      <p className="text-gray-700 dark:text-gray-300 mb-6 text-base sm:text-md">
        The <strong>AAU Assistant</strong> is an innovative web platform designed specifically for 
        <strong> Addis Ababa University freshmen students</strong> who often struggle to navigate the 
        university's complex administrative procedures. This intelligent assistant combines 
        <strong> comprehensive institutional data</strong> with <strong>Google Gemini AI</strong> to provide 
        accurate, context-aware guidance. The system is trained on official university documents, 
        procedural manuals, and campus information, ensuring students receive reliable answers 
        about registration processes, department transfer requirements, office locations, 
        academic calendars, and administrative workflows.
      </p>

     
      {/* Demo Video Section - Embedded YouTube */}
      <div className="mb-6 sm:mb-8">
        <h4 className="font-semibold mb-4 text-lg text-gray-800 dark:text-gray-200">Demo Video</h4>
        <div className="w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/1lqPX9msBME?autoplay=0&rel=0&modestbranding=1"
              title="AAU Assistant Platform Demo"
              className="w-full h-64 sm:h-80 md:h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4 bg-gray-800 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">AAU Assistant Platform Walkthrough</p>
                <p className="text-sm text-gray-300 mt-1">Watch the complete demo of all features and user interactions</p>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-red-600 px-3 py-1 rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <span>YouTube</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
          The video will play directly in this window. Use fullscreen for the best viewing experience.
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h4 className="font-semibold mb-3 text-lg">Technologies</h4>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>React.js & Next.js</li>
            <li>Node.js Backend</li>
            <li>Google Gemini AI with Institutional Data</li>
            <li>PostgreSQL Database</li>
            <li>RESTful API Architecture</li>
            <li>Tailwind CSS</li>
            <li>JWT Authentication</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-lg">Key Features</h4>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>Context-Aware AI Chatbot powered by institutional data</li>
            <li>Official University Procedure Guidance</li>
            <li>Verified Department Transfer Information</li>
            <li>Accurate Campus Office Directory & Locations</li>
            <li>Official Academic Calendar & Schedules</li>
            <li>Step-by-Step Registration Guides</li>
            <li>Freshman Orientation Resources</li>
            <li>Real-time Q&A with Verified Information</li>
            <li>Mobile-Responsive Design</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-lg text-green-800 dark:text-green-300">AI Implementation</h4>
        <p className="text-sm text-green-700 dark:text-green-200 mb-2">
          <strong>Not just generic AI responses</strong> - The system uses Google Gemini AI trained on 
          specific institutional data including official AAU documents, procedural guidelines, 
          and campus information to provide accurate, university-specific answers.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-200">
          <li>Trained on official university documents and procedures</li>
          <li>Context-aware responses based on institutional data</li>
          <li>Verified information from AAU administrative sources</li>
          <li>Regular updates with current academic policies</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-lg text-blue-800 dark:text-blue-300">Problem Solved</h4>
        <p className="text-sm text-blue-700 dark:text-blue-200">
          Addresses the common challenges faced by AAU freshmen in accessing accurate, up-to-date 
          information about university procedures by providing a reliable AI assistant trained on 
          institutional data, reducing confusion and saving time for thousands of new students 
          each academic year.
        </p>
      </div>
    </div>
  )
},
    {
  id: 3,
  title: "AI-Powered Blog Platform",
  description: "Interactive blogging platform with AI-assisted content creation, social features, and personalized user experience.",
  imageUrl: blog,
  githubUrl: "https://github.com/Rist-A/Advance-Blog.git",
  fullContent: (
    <div className="p-4 sm:p-6">
          {img ? (
        <div className="w-full h-48 sm:h-56 rounded-xl mb-6 overflow-hidden">
          <img 
            src={blog} 
            alt="AI-Powered Blog Platform"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">
            AI-Powered Blog Platform
          </span>
        </div>
      )}
      
      
      <h3 className="text-xl sm:text-2xl font-bold mb-4">AI-Powered Blog Platform</h3>
         {/* GitHub Link in the modal - Minimal design */}
<div className="mb-4 flex justify-center">
  <a 
    href="https://github.com/Rist-A/Advance-Blog.git" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 text-sm"
  >
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    GitHub
  </a>
</div>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-base sm:text-lg">
        A <strong>modern, interactive blogging platform</strong> that combines social networking features 
        with <strong>AI-powered content assistance</strong>. Users can register, create personalized profiles, 
        and engage with a community of writers and readers. The platform's intelligent AI system helps 
        users generate compelling titles from content or create engaging captions from titles, making 
        content creation effortless and professional.
      </p>

      {/* Demo Video Section - Embedded YouTube */}
<div className="mb-6 sm:mb-8">
  <h4 className="font-semibold mb-4 text-lg text-gray-800 dark:text-gray-200">Demo Video</h4>
  <div className="w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://www.youtube.com/embed/JuhjbAP_cNU?autoplay=0&rel=0&modestbranding=1"
        title="AI Blog Platform Demo"
        className="w-full h-64 sm:h-80 md:h-96"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="p-4 bg-gray-800 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-lg">Modern Blog Platform Walkthrough</p>
          <p className="text-sm text-gray-300 mt-1">Watch the complete demo of all features and user interactions</p>
        </div>
        <div className="flex items-center space-x-2 text-sm bg-red-600 px-3 py-1 rounded-full">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          <span>YouTube</span>
        </div>
      </div>
    </div>
  </div>
  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
    The video will play directly in this window. Use fullscreen for the best viewing experience.
  </p>
</div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h4 className="font-semibold mb-3 text-lg">Technologies</h4>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>React.js with TypeScript</li>
            <li>Node.js & Express.js</li>
            <li>MongoDB/Mongoose</li>
            <li>OpenAI/Gemini AI Integration</li>
            <li>JWT Authentication</li>
            <li>Cloudinary for Image Storage</li>
            <li>Socket.io for Real-time Features</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-lg">Core Features</h4>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>User Registration & Authentication</li>
            <li>AI Title Generation from Content</li>
            <li>AI Caption Creation from Titles</li>
            <li>Create, Edit & Delete Posts</li>
            <li>Like & Comment System</li>
            <li>Save/Bookmark Posts</li>
            <li>User Profile Management</li>
            <li>Personalized Feed</li>
            <li>Real-time Notifications</li>
            <li>Rich Text Editor</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-lg text-green-800 dark:text-green-300">AI Content Assistance</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-200">
            <li>Smart title suggestions based on content</li>
            <li>Engaging caption generation from titles</li>
            <li>Content optimization recommendations</li>
            <li>SEO-friendly meta descriptions</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-lg text-purple-800 dark:text-purple-300">Social Features</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-purple-700 dark:text-purple-200">
            <li>Interactive like and comment system</li>
            <li>Post bookmarking for later reading</li>
            <li>User following and followers</li>
            <li>Personalized content recommendations</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-lg text-blue-800 dark:text-blue-300">User Experience</h4>
        <p className="text-sm text-blue-700 dark:text-blue-200">
          Provides a seamless blogging experience where writers can focus on content creation while 
          AI handles the technical aspects of crafting engaging titles and captions. Readers enjoy 
          a social media-like experience with easy interaction and personalized content discovery.
        </p>
      </div>
    </div>
  )
},
  ];

  const handleSeeMore = () => {
    handleNavigation('projects'); 
  };

 
  const renderModal = () => {
    if (activeComponent === 'projects') {
      return (
        <div className={modalContainerClass}>
          <div className={modalContentClass}>
            <button
              onClick={closeComponent}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
              <X size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
            <div className={scrollContainerClass}>
              <DetailProject />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };


  return (
    <div id="projects">
      <div className="text-center mb-2">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Top Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-md max-w-2xl mx-auto">
          Explore my featured projects showcasing modern web development technologies and innovative solutions.
        </p>
      </div>
      <FlipStack cards={projectCards} onSeeMore={handleSeeMore} />
        {renderModal()}
    </div>
  )
}

export default Projects