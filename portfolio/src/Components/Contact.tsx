
import { ContactForm } from "../UI/ContactForm";
import VenomBeam from "../UI/venom-beam.tsx";

const Contact = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background - Behind everything */}
      <div className="fixed inset-0 -z-10">
        <VenomBeam />
      </div>
      
      {/* Content - With proper z-index */}
      <div className="relative z-0 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8 md:mb-12 mt-[12px]">
          {/* Add relative inline-block wrapper */}
          <div className="relative inline-block">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Contact Me
            </h1>
            {/* Move the underline inside the relative container */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
        
        {/* Scrollable content without scrollbar */}
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact