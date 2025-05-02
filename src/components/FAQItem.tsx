// src/components/FAQItem.tsx
import React from "react";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
}) => {
  return (
    <details className="mb-4 border border-gray-200 rounded-lg">
      <summary
        className="cursor-pointer select-none px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
      >
        {question}
      </summary>
      <div className="px-4 py-2">{answer}</div>
    </details>
  );
};
