import { Sparkles } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { pricingData } from "../data/pricingData";

export default function Pricing() {
    return (
        <section className="pricing-section">
            <SectionTitle text1="Pricing" text2="Our Pricing Plans" text3="Flexible pricing options designed to meet your needs — whether you're just getting started or scaling up." />

            <div className="pricing-section__grid">
                {pricingData.map((plan, index) => (
                    <div key={index} className={`pricing-card ${plan.mostPopular ? "pricing-card--popular" : ""}`}>
                        {plan.mostPopular && (
                            <div className="pricing-card__badge">
                                <Sparkles size={14} />
                                <p>Most Popular</p>
                            </div>
                        )}
                        <p className={plan.mostPopular ? "text-white" : ""}>{plan.title}</p>
                        <h4 className={`text-3xl font-semibold mt-1 ${plan.mostPopular && "text-white"}`}>${plan.price}<span className={`font-normal text-sm ${plan.mostPopular ? "text-white" : "text-slate-500"}`}>/mo</span></h4>
                        <hr className="pricing-card__divider" />
                        <div className={`space-y-2 ${plan.mostPopular ? "text-white" : "text-slate-500"}`}>
                            {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-1.5">
                                    <feature.icon size={18} className={`${plan.mostPopular ? "text-white" : "text-indigo-600"}`} />
                                    <span>{feature.name}</span>
                                </div>
                            ))}
                        </div>
                        <button className={`primary-button primary-button--block ${plan.mostPopular ? "primary-button--light" : ""}`}>
                            <span>{plan.buttonText}</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}