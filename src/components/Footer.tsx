
import React from "react";
import { Mail, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg font-[Poppins] text-[#0a1a2f] mb-4">
            NeuroFit Assessments
          </h3>
          <p className="text-gray-600 text-sm">
            Evidence-based hiring tools for forward-thinking companies.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-[#0a1a2f] mb-3">Product</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-[#00c2c7] text-sm">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-600 hover:text-[#00c2c7] text-sm">
                Pricing
              </a>
            </li>
            <li>
              <a href="#faq" className="text-gray-600 hover:text-[#00c2c7] text-sm">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-[#0a1a2f] mb-3">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-[#00c2c7] text-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-[#00c2c7] text-sm">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-[#00c2c7] text-sm">
                Data Processing
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-[#0a1a2f] mb-3">Contact</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-[#00c2c7] text-sm flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@neurofit.io</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-[#00c2c7] text-sm flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} NeuroFit Assessments. All rights reserved.</p>
      </div>
    </footer>
  );
};
