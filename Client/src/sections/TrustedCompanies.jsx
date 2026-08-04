import React from 'react';
import * as MarqueeModule from "react-fast-marquee";
import { companiesLogo } from "../data/companiesLogo";

const Marquee = MarqueeModule.default?.default ?? MarqueeModule.default ?? MarqueeModule;

export default function TrustedCompanies() {
    return (
        <section className="trusted-companies">
            <h3 className="trusted-companies__title">
                Trusting by leading brands, including —
            </h3>
            <Marquee className="trusted-companies__marquee" gradient={true} speed={25}>
                <div className="trusted-companies__row">
                    {[...companiesLogo, ...companiesLogo].map((company, index) => (
                        <img key={index} className="trusted-companies__logo" src={company.logo} alt={company.name} width={100} height={100} />
                    ))}
                </div>
            </Marquee>
        </section>
    );
}