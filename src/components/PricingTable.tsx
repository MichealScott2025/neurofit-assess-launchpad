
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const PricingTable = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for small teams or trial runs",
      features: [
        "1 assessment template",
        "20 candidates per month",
        "Basic results dashboard",
        "Email support",
      ],
      cta: "Try Now",
      popular: false,
    },
    {
      name: "Pro",
      price: "$50",
      period: "per company / month",
      description: "Everything you need for professional hiring",
      features: [
        "Unlimited templates",
        "Unlimited candidates",
        "AI role-fit analysis",
        "HR inbox delivery",
        "API access",
        "Priority support",
      ],
      cta: "Upgrade",
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-16">
      <h2 className="text-3xl font-bold font-[Poppins] text-center text-[#0a1a2f] mb-6">
        Transparent Pricing
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Choose the plan that fits your hiring needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`rounded-xl border ${
              tier.popular
                ? "border-[#00c2c7] shadow-lg"
                : "border-gray-200"
            } p-6 bg-white relative`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-[#00c2c7] text-white text-xs py-1 px-3 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <h3 className="text-xl font-bold font-[Poppins] text-[#0a1a2f]">
              {tier.name}
            </h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold">{tier.price}</span>
              {tier.period && (
                <span className="text-gray-500 text-sm ml-1">{tier.period}</span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-5 w-5 text-[#00c2c7] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className={`w-full ${
                tier.popular
                  ? "bg-[#00c2c7] hover:bg-[#00a5aa] text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
