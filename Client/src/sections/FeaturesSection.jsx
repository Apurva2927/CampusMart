import SectionTitle from "../components/SectionTitle";

export default function FeaturesSection() {
    return (
        <section className="features-section">
            <SectionTitle text1="Features" text2="Features Overview" text3="A visual collection of our most recent works - each piece crafted with intention, emotion and style." />

            <div className="features-section__grid">
                <div className="feature-card">
                    <img className="rounded-xl" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png" alt="Card Image" height={400} width={400} />
                    <h3 className="text-base font-semibold text-slate-700 mt-4">Feedback analyser</h3>
                    <p className="text-sm text-slate-600 mt-1">Get instant insights into your finances with live dashboards.</p>
                </div>
                <div className="feature-card">
                    <img className="rounded-xl" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png" alt="Card Image" height={400} width={400} />
                    <h3 className="text-base font-semibold text-slate-700 mt-4">User management</h3>
                    <p className="text-sm text-slate-600 mt-1">Get instant insights into your finances with live dashboards.</p>
                </div>
                <div className="feature-card">
                    <img className="rounded-xl" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png" alt="Card Image" height={400} width={400} />
                    <h3 className="text-base font-semibold text-slate-700 mt-4">Better invoicing</h3>
                    <p className="text-sm text-slate-600 mt-1">Get instant insights into your finances with live dashboards.</p>
                </div>
            </div>
        </section>
    );
}