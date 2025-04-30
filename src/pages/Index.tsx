
import React from "react";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f7f9fb] font-[Inter]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <ProblemSolutionBlock />
        <FeatureGrid />
        <AIRoleFitAnalysis />
        <PricingTable />
        <TestimonialsCarousel />
        <FAQAccordion />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
