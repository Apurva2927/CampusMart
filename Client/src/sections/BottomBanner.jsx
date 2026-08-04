import { Star } from "lucide-react";

export default function BottomBanner() {
    return (
        <section className="bottom-banner">
            <div className="bottom-banner__inner">
                <p className="bottom-banner__copy">Join hundreds of developers building better SaaS products.</p>
                <button className="primary-button primary-button--wide">
                    <Star size={20} />
                    <span>Star on Github</span>
                </button>
            </div>
        </section>
    );
}