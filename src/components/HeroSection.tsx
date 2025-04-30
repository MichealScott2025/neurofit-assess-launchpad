
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-[Poppins] text-[#0a1a2f] leading-tight">
            Faster, fairer hiring that actually works
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Comprehensive personality, cognitive, and cultural-fit assessments to find your perfect candidates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-[#00c2c7] hover:bg-[#00a5aa] text-white">
              Start Free Assessment
            </Button>
            <Button variant="link" className="text-[#0a1a2f]">
              See Pricing <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-lg bg-[#0a1a2f]/5 p-2 shadow-lg">
            <div className="aspect-[16/9] overflow-hidden rounded-md bg-[#0a1a2f]/20">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1a2f] to-[#00c2c7]/50 opacity-20"></div>
                <div className="flex h-full items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    alt="NeuroFit Dashboard with diverse team"
                    className="h-full w-full object-cover opacity-90 mix-blend-overlay"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] aspect-[16/9] bg-white rounded-lg shadow-xl p-4 opacity-90">
                      <div className="h-8 w-full bg-[#0a1a2f]/10 rounded mb-4"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-[#00c2c7]/10 rounded"></div>
                        <div className="h-24 bg-[#00c2c7]/10 rounded"></div>
                        <div className="h-12 bg-[#00c2c7]/10 rounded"></div>
                        <div className="h-12 bg-[#00c2c7]/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
