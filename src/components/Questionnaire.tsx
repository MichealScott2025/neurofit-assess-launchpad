
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";

type QuestionType = "radio" | "checkbox" | "text" | "select";

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
}

const questions: Question[] = [
  {
    id: "personality_type",
    text: "How would you describe your work personality?",
    type: "radio",
    options: ["Detail-oriented", "Big-picture thinker", "Collaborative", "Independent"],
    required: true,
  },
  {
    id: "strengths",
    text: "Select your top professional strengths (choose up to 3)",
    type: "checkbox",
    options: ["Problem solving", "Communication", "Leadership", "Technical expertise", "Adaptability", "Time management"],
  },
  {
    id: "challenge",
    text: "Describe a recent work challenge you overcame",
    type: "text",
  },
  {
    id: "work_environment",
    text: "What's your preferred work environment?",
    type: "select",
    options: ["Remote", "Hybrid", "In-office", "Flexible"],
    required: true,
  },
];

export const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);
  
  const form = useForm();

  const handleNext = (data: any) => {
    const questionId = questions[currentQuestion].id;
    setAnswers({ ...answers, [questionId]: data[questionId] });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestionField = (question: Question) => {
    switch (question.type) {
      case "radio":
        return (
          <FormField
            name={question.id}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-medium">{question.text}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={answers[question.id]}
                    className="space-y-2"
                  >
                    {question.options?.map((option) => (
                      <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        );

      case "checkbox":
        return (
          <FormField
            name={question.id}
            render={() => (
              <FormItem>
                <FormLabel className="text-lg font-medium">{question.text}</FormLabel>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {question.options?.map((option) => (
                    <FormField
                      key={option}
                      name={`${question.id}.${option}`}
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{option}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
        );

      case "text":
        return (
          <FormField
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">{question.text}</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-2" />
                </FormControl>
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormField
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">{question.text}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={answers[question.id]}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {question.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="bg-green-100 text-green-800 rounded-full p-2 mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Assessment Complete!</h2>
        <p className="text-center text-gray-600 mb-6">
          Thank you for completing the assessment. Your results are ready.
        </p>
        <Button size="lg" className="gap-2">
          View Your Report
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto mb-12">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#00c2c7] h-2 rounded-full"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNext)}
          className="space-y-6"
        >
          {renderQuestionField(currentQ)}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button type="submit">
              {currentQuestion < questions.length - 1 ? "Next" : "Complete"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
