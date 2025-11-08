import React from 'react'
import FooterFlow, {
  FeatureItem,
  HoverLink,
} from "../UI/FooterFlow"
import { Mail, Github, Linkedin, FileText } from "lucide-react";


const Footer = () => {
  return (
    <div className='pt-[350px]'>
     <FooterFlow
  emblem={<span>Wubrist Alemu</span>}
  links={[
   
  ]}
  extraIcons={[
    <a key="github" href="https://github.com/Rist-A" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
      <Github className="h-5 w-5" />
    </a>,
    <a key="linkedin" href="https://www.linkedin.com/in/wubrist-alemu-45a375385/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
      <Linkedin className="h-5 w-5" />
    </a>,
    <a key="resume" href="./" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
      <FileText className="h-5 w-5" />
    </a>,
  ]}
/>
    </div>
  )
}

export default Footer
