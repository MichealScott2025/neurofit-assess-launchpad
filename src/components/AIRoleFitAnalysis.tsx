
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Check } from "lucide-react";

export const AIRoleFitAnalysis = () => {
  const trustBadges = [
    {
      icon: <Shield className="h-4 w-4" />,
      label: "GDPR compliant",
    },
    {
      icon: <Check className="h-4 w-4" />,
      label: "Validated ≥0.75 reliability",
    },
    {
      icon: <Lock className="h-4 w-4" />,
      label: "Encryption at rest & in transit",
    },
  ];

  return (
    <section className="py-16 my-8 md:my-16">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold font-[Poppins] text-[#0a1a2f] mb-4">
              AI Role-Fit Analysis
            </h2>
            <p className="text-gray-700 mb-6">
              Our GPT-powered system analyzes assessment results against role requirements, creating a personalized fit report. Each candidate receives a detailed PDF and your hiring team gets an email summary with action recommendations.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {trustBadges.map((badge, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1 flex items-center gap-1 border-[#00c2c7]/30">
                  {badge.icon}
                  <span>{badge.label}</span>
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="bg-[#f7f9fb] p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded bg-[#0a1a2f] flex items-center justify-center text-white mr-3">
                  AI
                </div>
                <div>
                  <h4 className="font-bold text-[#0a1a2f]">Role-Fit Report</h4>
                  <p className="text-sm text-gray-500">Generated in 60 seconds</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-6 w-full mt-4"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-16 bg-[#00c2c7]/10 rounded flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full border-4 border-[#00c2c7]"></div>
                  </div>
                  <div className="h-16 bg-[#00c2c7]/10 rounded flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full border-4 border-[#0a1a2f]"></div>
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
