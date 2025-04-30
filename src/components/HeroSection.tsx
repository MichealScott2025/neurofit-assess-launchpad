import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onStartAssessment?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartAssessment }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 py-20 items-center">
      <div className="flex-1 text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[Poppins] text-[#0a1a2f]">
          Faster, Fairer Hiring That Works
        </h1>
        <p className="text-lg mb-8 text-gray-700">
          Comprehensive personality, cognitive, and cultural-fit assessments to find your perfect candidates.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-[#00c2c7] hover:bg-[#00a8ac] text-white px-6" 
            size="lg"
            onClick={onStartAssessment}
          >
            Start Free Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="link" className="text-[#0a1a2f]">
            See Pricing
          </Button>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-[80%] aspect-[16/9] bg-white rounded-lg shadow-xl p-4 opacity-90">
          {/* Placeholder for dashboard screenshot */}
          <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-md flex items-center justify-center">
            <img 
              src="/placeholder.svg" 
              alt="NeuroFit Dashboard" 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
