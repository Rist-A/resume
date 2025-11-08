import StatsCarouselCount from "../UI/statscarousel";
import React from 'react'

const Achievement = () => {
  const achievements = [
    { 
      title: "3rd Place – She Codes Hackathon",
      year: "2024",
      description: "Achieved 3rd Place in the She Codes Hackathon, a competitive women's tech event held across 14 universities with 47 participating teams, for developing an innovative project in a collaborative, high-pressure environment.",
      hasCertificate: true,
      certificateUrl: "/certificates/she-codes-hackathon.pdf",
      counterValue: 47,
      counterSuffix: " Teams",
      counterLabel: "Competed Against"
    },
    { 
      title: "Completed Internship",
      year: "2024", 
      description: "Completed a practical internship at Nael Production, where I contributed to tech-related tasks, collaborated with the team, and received a recognition certificate for strong performance.",
      hasCertificate: true,
      certificateUrl: "/certificates/nael-production-internship.pdf",
      counterValue: 100,
      counterSuffix: "%",
      counterLabel: "Performance Rating"
    },
    { 
      title: "Completed Internship",
      year: "2024",
      description: "Completed a practical internship at Arada Subcity, where I contributed to automate different automation systems.",
      hasCertificate: false,
      counterValue: 5,
      counterSuffix: "+",
      counterLabel: "Systems Automated"
    },
  ];

  return (
    <div className="text-center mb-2">
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 pt-12 mt-12">
        ACHIEVEMENTS
      </h1>
      <StatsCarouselCount
        stats={achievements}
        className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
        cardClassName=""
      />
    </div>
  )
}

export default Achievement