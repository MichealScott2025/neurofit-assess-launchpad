
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQAccordion = () => {
  const faqs = [
    {
      question: "How do you customize culture values?",
      answer:
        "Our platform offers a library of 20+ common corporate values. HR teams select 5-7 that best reflect their organization, then rank their importance. We use these selections to generate targeted questions that measure alignment. You can also add custom values unique to your company.",
    },
    {
      question: "Is candidate data private and secure?",
      answer:
        "Absolutely. We're GDPR compliant and use bank-level encryption for all data. Candidates must explicitly opt-in before taking assessments, and results are only shared with designated hiring team members. You control data retention periods, with automatic deletion after your set timeframe.",
    },
    {
      question: "How long do the assessments take to complete?",
      answer:
        "The personality assessment takes 10 minutes, cognitive aptitude 12 minutes, and cultural-fit typically 8 minutes. Candidates can complete them separately or in a single session. All assessments are mobile-friendly and can be paused/resumed.",
    },
    {
      question: "Can I integrate with my existing ATS?",
      answer:
        "Yes, we integrate with major applicant tracking systems including Workday, Greenhouse, Lever, and more. We provide webhook functionality and RESTful APIs for custom integrations. Our team can assist with implementation at no additional cost.",
    },
    {
      question: "What makes your assessments scientifically valid?",
      answer:
        "Our assessments are built on validated psychometric frameworks like the Big Five personality model and have been tested across 50,000+ profiles. We maintain a minimum reliability coefficient of 0.75 and regularly conduct adverse impact analyses to ensure fairness across demographic groups.",
    },
  ];

  return (
    <section className="py-16 my-8" id="faq">
      <h2 className="text-3xl font-bold font-[Poppins] text-center text-[#0a1a2f] mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-[#0a1a2f]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
