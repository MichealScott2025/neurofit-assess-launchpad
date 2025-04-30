
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

const assessmentData = [
  { name: "Analytical Skills", score: 91, color: "#D946EF" },
  { name: "Cultural Alignment", score: 85, color: "#D946EF" },
  { name: "Technical Knowledge", score: 96, color: "#D946EF" },
  { name: "Communication", score: 92, color: "#D946EF" },
];

export const AssessmentReport = () => {
  const averageScore = Math.round(
    assessmentData.reduce((sum, item) => sum + item.score, 0) / assessmentData.length
  );
  
  const isTopCandidate = averageScore >= 85;

  return (
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto mb-12">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0" 
        style={{ backgroundImage: "url('/lovable-uploads/ffd3030a-50fe-42d1-8c80-ef07b575a813.png')" }}
      />
      
      {/* Content container with z-index to appear above background */}
      <div className="relative z-10 p-8 md:p-12">
        {/* Top candidate badge */}
        {isTopCandidate && (
          <div className="absolute top-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
            <Star className="h-5 w-5 fill-white" />
            <span className="text-lg font-semibold">Top candidate</span>
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-[#0a1a2f] mb-6">Assessment Results</h2>
        
        {/* Score card */}
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md mb-8 max-w-md">
          <div className="space-y-6">
            {/* Overall score */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Overall percentile</h3>
                <div className="flex items-center">
                  <span className="text-4xl font-bold mr-2">{averageScore}</span>
                  <Star className="h-6 w-6 fill-[#D946EF] text-[#D946EF]" />
                </div>
              </div>
              <Progress 
                value={averageScore} 
                className="h-3 bg-gray-700" 
                style={{
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            </div>
            
            {/* Individual scores */}
            {assessmentData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">{item.score}</span>
                    <div className="h-5 w-5 rounded-full border-3 border-[#D946EF]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Detailed analysis section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#0a1a2f]">Strengths</h3>
            <ul className="list-disc list-inside text-sm space-y-2 text-gray-700">
              <li>Strong analytical abilities and problem-solving skills</li>
              <li>High conscientiousness indicates reliability and attention to detail</li>
              <li>Excellent alignment with innovative company cultures</li>
              <li>Growth mindset suggests adaptability to changing environments</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#0a1a2f]">Development Areas</h3>
            <ul className="list-disc list-inside text-sm space-y-2 text-gray-700">
              <li>May benefit from improving teamwork and collaboration approaches</li>
              <li>Moderate extraversion suggests potential challenges in highly social roles</li>
              <li>Could enhance customer-facing communication skills</li>
              <li>Consider developing numerical analysis capabilities further</li>
            </ul>
          </div>
        </div>
        
        {/* Recommended Roles Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-[#0a1a2f]">Recommended Roles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Data Analyst", "UX Researcher", "Product Manager"].map((role) => (
              <div key={role} className="border border-gray-200 rounded-lg p-4 hover:border-[#D946EF] transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{role}</span>
                  <span className="text-sm bg-[#0a1a2f] text-white px-2 py-0.5 rounded-full">92% Match</span>
                </div>
                <p className="text-xs text-gray-600">Your analytical skills and attention to detail make you an excellent candidate for this role.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
