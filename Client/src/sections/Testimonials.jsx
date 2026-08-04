import React from 'react';
import * as MarqueeModule from "react-fast-marquee";
import TestimonialCard from "../components/TestimonialCard";
import { testimonialsData } from "../data/testimonialsData";
import SectionTitle from "../components/SectionTitle";

const Marquee = MarqueeModule.default?.default ?? MarqueeModule.default ?? MarqueeModule;

export default function Testimonials() {
    return (
        <section className="testimonials-section">
            <SectionTitle text1="Testimonials" text2="Our Social Proof" text3="A visual collection of our most recent works - each piece crafted with intention, emotion and style." />

            <Marquee className="testimonials-section__marquee" gradient={true} speed={25}>
                <div className="testimonials-section__row">
                    {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </Marquee>
            <Marquee className="testimonials-section__marquee" gradient={true} speed={25} direction="right">
                <div className="testimonials-section__row">
                    {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </Marquee>
        </section>
    );
}