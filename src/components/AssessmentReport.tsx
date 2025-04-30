
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, RadialBarChart, RadialBar, PieChart, Pie, Cell } from "recharts";

const personalityData = [
  { name: "Openness", value: 75 },
  { name: "Conscientiousness", value: 82 },
  { name: "Extraversion", value: 45 },
  { name: "Agreeableness", value: 70 },
  { name: "Neuroticism", value: 30 },
];

const cognitiveData = [
  { name: "Logical Reasoning", value: 80 },
  { name: "Numerical Analysis", value: 65 },
  { name: "Pattern Recognition", value: 90 },
  { name: "Verbal Comprehension", value: 72 },
];

const cultureFitData = [
  { name: "Innovation", value: 85, fill: "#00C2C7" },
  { name: "Teamwork", value: 75, fill: "#0A1A2F" },
  { name: "Customer Focus", value: 60, fill: "#5DADE2" },
  { name: "Growth Mindset", value: 82, fill: "#1ABC9C" },
];

const overallScoreConfig = {
  score: {
    theme: {
      light: "#00C2C7",
      dark: "#00C2C7",
    },
  },
};

export const AssessmentReport = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0a1a2f] mb-1">Your Assessment Results</h2>
          <p className="text-gray-600">Comprehensive analysis of your personality, cognitive abilities, and cultural fit</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Overall Match:</span>
          <span className="px-3 py-1 bg-[#00c2c7] text-white font-bold rounded-full">78%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-[#0a1a2f]">Personality Profile</h3>
          <p className="text-sm text-gray-600 mb-4">Based on the Big Five personality traits</p>
          <div className="h-[240px]">
            <ChartContainer config={overallScoreConfig}>
              <BarChart
                data={personalityData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#00C2C7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-[#0a1a2f]">Cognitive Aptitude</h3>
          <p className="text-sm text-gray-600 mb-4">Measuring problem-solving and analytical abilities</p>
          <div className="h-[240px]">
            <ChartContainer config={overallScoreConfig}>
              <RadialBarChart
                innerRadius="30%"
                outerRadius="100%"
                data={cognitiveData}
                startAngle={180}
                endAngle={0}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                  fill="#0A1A2F"
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </RadialBarChart>
            </ChartContainer>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-[#0a1a2f]">Cultural Fit Analysis</h3>
          <p className="text-sm text-gray-600 mb-4">Alignment with key company values</p>
          <div className="h-[240px]">
            <ChartContainer config={overallScoreConfig}>
              <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <Pie
                  data={cultureFitData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {cultureFitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 text-[#0a1a2f]">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[#00c2c7] mb-2">Strengths</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
              <li>Strong analytical abilities and problem-solving skills</li>
              <li>High conscientiousness indicates reliability and attention to detail</li>
              <li>Excellent alignment with innovative company cultures</li>
              <li>Growth mindset suggests adaptability to changing environments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-[#00c2c7] mb-2">Development Areas</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
              <li>May benefit from improving teamwork and collaboration approaches</li>
              <li>Moderate extraversion suggests potential challenges in highly social roles</li>
              <li>Could enhance customer-facing communication skills</li>
              <li>Consider developing numerical analysis capabilities further</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-[#0a1a2f]">Recommended Roles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["Data Analyst", "UX Researcher", "Product Manager"].map((role) => (
            <div key={role} className="border border-gray-200 rounded-lg p-4 hover:border-[#00c2c7] transition-colors">
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
  );
};
