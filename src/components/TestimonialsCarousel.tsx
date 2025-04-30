
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export const TestimonialsCarousel = () => {
  const testimonials = [
    {
      quote:
        "Cut our time-to-hire by 40% while improving retention rates across technical roles.",
      company: "Tech Startup, Series A",
    },
    {
      quote:
        "The culture fit assessment found candidates who've transformed our team dynamics.",
      company: "E-commerce Growth Leader",
    },
    {
      quote:
        "Finally, data we can trust to make unbiased hiring decisions at scale.",
      company: "Healthcare Innovation Company",
    },
  ];

  return (
    <section className="py-16 my-8">
      <h2 className="text-3xl font-bold font-[Poppins] text-center text-[#0a1a2f] mb-12">
        What Our Clients Say
      </h2>

      <Carousel className="max-w-4xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card className="border-none bg-[#f7f9fb]">
                <CardContent className="py-10 px-8 text-center">
                  <div className="mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto text-[#00c2c7]/30"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="text-xl mb-6 font-medium text-[#0a1a2f]">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-4" />
        <CarouselNext className="mr-4" />
      </Carousel>
    </section>
  );
};
