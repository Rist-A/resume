import React, { useState } from 'react'
import { FlowingLogos } from "../UI/flowing-logos";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const skillsData = [
    // Programming Languages
    { image: "https://commons.wikimedia.org/wiki/Special:FilePath/C_Sharp_Logo_2023.svg" ,name: "C#", category: "Languages" },
    { image: "https://cdn.simpleicons.org/javascript", name: "JavaScript", category: "Languages" },
    { image: "https://cdn.simpleicons.org/typescript", name: "TypeScript", category: "Languages" },
    { image: "https://cdn.simpleicons.org/cplusplus", name: "C++", category: "Languages" },
    { image: "https://cdn.simpleicons.org/python", name: "Python", category: "Languages" },
    { image: "https://commons.wikimedia.org/wiki/Special:FilePath/OpenJDK_logo.svg" ,name: "Java", category: "Languages" }, 

    // Frontend Technologies
    { image: "https://cdn.simpleicons.org/react", name: "React", category: "Frontend" },
    { image: "https://cdn.simpleicons.org/nextdotjs", name: "Next.js", category: "Frontend" },
    { image: "https://commons.wikimedia.org/wiki/Special:FilePath/CSS3_logo.svg" ,name: "CSS3", category: "Frontend"},  
    { image: "https://cdn.simpleicons.org/html5", name: "HTML5", category: "Frontend" },
    { image: "https://cdn.simpleicons.org/tailwindcss", name: "Tailwind CSS", category: "Frontend" },
    { image: "https://commons.wikimedia.org/wiki/Special:FilePath/Typescript_logo_2020.svg", name: "TypeScript", category: "Frontend" },

    // Backend Technologies
    { image: "https://commons.wikimedia.org/wiki/Special:FilePath/Node.js_logo.svg" ,name: "Node.js", category: "Backend"}, 
    { image: "https://commons.wikimedia.org/wiki/Special:FilePath/DotNet_logo.svg" , name: ".NET", category: "Backend" },
    { image: "https://cdn.simpleicons.org/express", name: "Express.js", category: "Backend" },
    { image: "https://cdn.simpleicons.org/mongodb", name: "MongoDB", category: "Backend" },
    { image: "https://cdn.simpleicons.org/postgresql", name: "PostgreSQL", category: "Backend" },
    { image: "https://cdn.simpleicons.org/mysql", name: "MySQL", category: "Backend" },
    
    // Tools & Platforms
    { image: "https://cdn.simpleicons.org/github", name: "GitHub", category: "Tools" },
    { image: "https://cdn.simpleicons.org/jira", name: "Jira", category: "Tools" },
    { image: "https://cdn.simpleicons.org/trello", name: "Trello", category: "Tools" },
    { image: "https://cdn.simpleicons.org/git", name: "Git", category: "Tools" },
    { image: "https://cdn.simpleicons.org/postman", name: "Postman", category: "Tools" },
    { image: "https://cdn.simpleicons.org/notion", name: "Notion", category: "Tools" },
    { image: "https://cdn.simpleicons.org/swagger", name: "Swagger", category: "Tools" },
    { image: "https://commons.wikimedia.org/wiki/Special:FilePath/OpenAI_Logo.svg",  name: "OpenAI",  category: "Tools" },
    { image: "https://commons.wikimedia.org/wiki/Special:FilePath/Google_Gemini_logo.svg", name: "Google Gemini", category: "Tools" },
  ];

  const categories = [
    { id: 'All', name: 'All Skills', count: skillsData.length },
    { id: 'Languages', name: 'Languages', count: skillsData.filter(s => s.category === 'Languages').length },
    { id: 'Frontend', name: 'Frontend', count: skillsData.filter(s => s.category === 'Frontend').length },
    { id: 'Backend', name: 'Backend', count: skillsData.filter(s => s.category === 'Backend').length },
    { id: 'Tools', name: 'Tools', count: skillsData.filter(s => s.category === 'Tools').length },
  ];

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Skills & Technologies
          </h1>
        </div>

        {/* Filter Tabs - Responsive */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "group relative px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-small transition-all duration-300 border text-xs md:text-sm",
                "transform-gpu hover:scale-105 active:scale-95",
                activeCategory === category.id
                  ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                  : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300/50 dark:border-gray-500/50 hover:bg-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700"
              )}
            >
              <span className="relative z-10 flex items-center gap-1 md:gap-2">
                {category.name}
                <span className="hidden sm:inline">({category.count})</span>
              </span>
              
              {/* Active indicator */}
              {activeCategory === category.id && (
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 -z-10" />
              )}
            </button>
          ))}
        </div>

        {/* Skills Display Area */}
        <div className="rounded-3xl p-4 md:p-6">
          {/* Active Category Title */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
              {categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full" />
          </div>

          {/* Flowing Logos */}
          <FlowingLogos
            data={skillsData}
            activeCategory={activeCategory}
          />
        </div>
      </div>
    </div>
  )
}

export default Skills;