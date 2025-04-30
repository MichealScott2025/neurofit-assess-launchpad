
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSolutionBlock } from "@/components/ProblemSolutionBlock";
import { FeatureGrid } from "@/components/FeatureGrid";
import { AIRoleFitAnalysis } from "@/components/AIRoleFitAnalysis";
import { PricingTable } from "@/components/PricingTable";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { Questionnaire } from "@/components/Questionnaire";
import { AssessmentReport } from "@/components/AssessmentReport";

const Index = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  const handleStartAssessment = () => {
    setShowQuestionnaire(true);
    setShowReport(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleShowReport = () => {
    setShowQuestionnaire(false);
    setShowReport(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-[#f7f9fb] font-[Inter]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!showQuestionnaire && !showReport && (
          <>
            <HeroSection onStartAssessment={handleStartAssessment} />
            <ProblemSolutionBlock />
            <FeatureGrid />
            <AIRoleFitAnalysis />
            <PricingTable />
            <TestimonialsCarousel />
            <FAQAccordion />
          </>
        )}
        
        {showQuestionnaire && (
          <div className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8 font-[Poppins] text-[#0a1a2f]">
              Candidate Assessment Questionnaire
            </h2>
            <Questionnaire />
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline" 
                className="mr-4"
                onClick={() => setShowQuestionnaire(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleShowReport}>
                Skip to Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {showReport && (
          <div className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8 font-[Poppins] text-[#0a1a2f]">
              Assessment Results
            </h2>
            <AssessmentReport />
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline" 
                className="mr-4"
                onClick={() => {
                  setShowReport(false);
                  setShowQuestionnaire(false);
                }}
              >
                Back to Home
              </Button>
              <Button onClick={handleStartAssessment}>
                Take Another Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
