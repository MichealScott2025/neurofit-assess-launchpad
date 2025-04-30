
import React from "react";
import { CheckCircle } from "lucide-react";

export const ProblemSolutionBlock = () => {
  const problems = [
    {
      title: "Manual Screening Overload",
      description:
        "HR teams spend 23 hours per hire manually sifting through resumes, leading to fatigue-based decisions.",
    },
    {
      title: "Culture Mis-Hires",
      description:
        "62% of failed placements stem from cultural misalignment, not skill gaps.",
    },
    {
      title: "Hidden Cognitive Gaps",
      description:
        "Traditional interviews miss cognitive abilities that predict 42% of job success.",
    },
  ];

  const solutions = [
    "Automated pre-screening saves 18+ hours per role",
    "Value-matching algorithms reduce culture mis-hires by 71%",
    "Cognitive testing predicts performance with 3.4× higher accuracy",
  ];

  return (
    <section className="py-16 bg-white rounded-xl shadow-sm my-8 md:my-16">
      <div className="px-4 md:px-8">
        <h2 className="text-3xl font-bold font-[Poppins] text-center text-[#0a1a2f] mb-12">
          Why Traditional Hiring Misses the Mark
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-[#f7f9fb] border border-gray-100"
            >
              <h3 className="font-bold text-xl mb-3 text-[#0a1a2f]">
                {problem.title}
              </h3>
              <p className="text-gray-700">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0a1a2f] rounded-lg p-6 md:p-8">
          <h3 className="text-xl font-bold font-[Poppins] text-white mb-4">
            How We Fix It
          </h3>
          <ul className="space-y-3">
            {solutions.map((solution, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#00c2c7] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-white">{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
