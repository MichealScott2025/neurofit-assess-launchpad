
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, LineChart } from "lucide-react";

export const FeatureGrid = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-[#00c2c7]" />,
      title: "Personality Test",
      description: "Evidence-based Big Five assessment",
      details: [
        "10-minute completion time",
        "Mobile-friendly interface",
        "Validated against 50,000+ profiles",
      ],
    },
    {
      icon: <Brain className="h-8 w-8 text-[#00c2c7]" />,
      title: "Cognitive Aptitude",
      description: "Adaptive numerical & logical tasks",
      details: [
        "12-minute adaptive assessment",
        "Skills-based, not knowledge-based",
        "Percentile ranking vs. industry benchmarks",
      ],
    },
    {
      icon: <LineChart className="h-8 w-8 text-[#00c2c7]" />,
      title: "Cultural-Fit Builder",
      description: "Customizable values assessment",
      details: [
        "HR selects company values",
        "Questions adapt automatically",
        "Match scores by team and role",
      ],
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold font-[Poppins] text-center text-[#0a1a2f] mb-6">
        Three Core Assessments
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Each scientifically validated to measure different aspects of candidate fit
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="border border-gray-100">
            <CardHeader>
              <div className="mb-3">{feature.icon}</div>
              <CardTitle className="font-[Poppins]">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00c2c7] mr-2"></div>
                    <span className="text-sm text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
