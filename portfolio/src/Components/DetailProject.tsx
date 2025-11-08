import FlipStack from "../UI/flipstacks";
import React from 'react'
import VenomBeam from "../UI/venom-beam.tsx";
import delivery from "../assets/delivery.png"
import expense from "../assets/expenseTrack.webp"
import wedding from "../assets/wedding.png"
import kids from "../assets/kids e.jpg"
import apartment from "../assets/apatrment.jpg"
import starlines from "../assets/starlines.jpeg"

const DetailProject = () => {
  const projectCards = [
    {
      id: 1,
      title: "RouteOptimizer Pro - Traveling Salesman Delivery System",
      description: "An intelligent delivery route optimization platform that calculates optimal paths with minimal transportation costs across multiple regions using advanced graph algorithms.",
      imageUrl: delivery,
      githubUrl: "https://github.com/Rist-A/travelling-sales-person-.git", // Add GitHub URL
      technologies: ["Node.js", "Adjacency Matrix Algorithm", "Graph Theory", "Express", "PostgreSQL","Dijkstra Algorithm"],
      features: [
        "Multi-region transportation cost database",
        "Optimal path sequence calculation using Dijkstra algorithms",
        "Real-time lowest cost route optimization",
        "Interactive region and destination mapping",
        "Total transportation cost estimation and breakdown"
      ],
      category: "Logistics & Delivery Optimization",
      demoUrl: "https://demo.routeoptimizer-pro.com"
    },
    {
      id: 2,
      title: "Expense Tracker Mobile App",
      description: "A comprehensive financial management application for tracking expenses, income, and generating detailed financial analytics with real-time insights.",
      imageUrl: expense,
      githubUrl: "https://github.com/Rist-A/Expense-tracker-mobile-application.git", // Add GitHub URL
      technologies: ["Kotlin", "Room Database", "NoSQL", "Android SDK"],
      features: [
        "Real-time expense and income registration",
        "Automated total balance calculation",
        "Advanced financial analytics and spending patterns",
        "Interactive charts and visual reports",
        "Offline data synchronization with Room persistence"
      ],
      category: "Financial Management Mobile App",
      demoUrl: "https://demo.fintrack-pro.com"
    },
    {
      id: 3,
      title: "WeboraWeddings - Wedding Reservation System",
      description: "A comprehensive wedding management platform featuring couple storytelling, guest reservations, and digital invitation management with QR code integration.",
      imageUrl: wedding,
      githubUrl: "https://github.com/Beamlak-Tessema/debruik-eternal-bloom.git", // Add GitHub URL
      technologies: ["React", "Node.js", "PostgreSQL", "QR Code Generator", "Nodemailer", "Express"],
      features: [
        "Interactive couple story and journey timeline",
        "Digital RSVP reservation form for guests",
        "Admin dashboard for invitation management",
        "Automated QR code generation for confirmed guests",
        "Real-time email notifications and confirmation system"
      ],
      category: "Wedding Management Platform",
    },
    {
      id: 4,
      title: "KidsAccessories - Children's E-Commerce Platform",
      description: "A comprehensive e-commerce solution specializing in children's accessories with advanced cart management and secure payment processing.",
      imageUrl: kids,
      githubUrl: "https://github.com/Rebiya/kids-accessories-Ecommerce.git", // Add GitHub URL
      technologies: ["React", "Node.js", "Stripe", "Express", "JWT"],
      features: [
        "Categorized product catalog (Toys, Apparel, Educational Materials)",
        "Enterprise-grade Stripe payment integration",
        "Advanced shopping cart with real-time inventory management",
        "Automated total calculation with tax and shipping estimates",
        "Secure user authentication and session management"
      ],
      category: "Children's Retail E-Commerce",
      demoUrl: "https://demo.kidsaccessories-pro.com"
    },
    {
      id: 5,
      title: "ApartmentManager Rental Management System",
      description: "A comprehensive backend solution for apartment rental management featuring tenant tracking, payment processing, and maintenance request handling with secure authentication.",
      imageUrl: apartment,
      githubUrl: "https://github.com/Rist-A/Apartment-Management-System-Backend.git", // Add GitHub URL
      technologies: ["C#", "ASP.NET Core", "JWT Authentication", "Entity Framework", "SQL Server" ,"swagger"],
      features: [
        "Secure tenant and landlord authentication system",
        "Maintenance request management workflow",
        "Lease agreement and document management",
        "Real-time apartment availability and booking system"
      ],
      category: "Property Management Backend",
      demoUrl: "https://demo.apartmentmanager-pro.com"
    },
    {
      id: 6,
      title: "Starlines - Corporate Portal Interface",
      description: "A modern and responsive login and landing page for Starlines company featuring secure authentication and elegant corporate branding.",
      imageUrl: starlines,
      githubUrl: "https://github.com/Rist-A/Starlineslogin.git", // Add GitHub URL
      technologies: ["React", "React Router", "CSS3", "Context API", "Formik"],
      features: [
        "Responsive corporate landing page with company branding",
        "Dynamic navigation and user dashboard interface",
        "Form validation and error handling",
        "Mobile-optimized responsive design"
      ],
      category: "Corporate Web Application",
      demoUrl: "https://demo.starlines-portal.com"
    }
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Background - Behind everything */}
      <div className="fixed inset-0 -z-10">
        <VenomBeam />
      </div>
      
      {/* Content - With proper z-index */}
      <div className="relative z-0 w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-2 md:mb-4 pt-6 px-4">
          <div className="relative inline-block">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
              Project Details
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto">
            View More Projects
          </p>
        </div>

        {/* Scrollable Content without scrollbar */}
        <div className="overflow-y-auto max-h-[calc(100vh-180px)] pb-[100px] scrollbar-hide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-2">
              <FlipStack
                cards={projectCards}
                onSeeMore={() => console.log("See more projects clicked")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProject