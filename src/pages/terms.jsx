import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-white text-[#2d2119] min-h-screen px-6 py-12 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-yellow-500 text-4xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-lg text-black mb-6">
          <strong>Beebark Premium Offer</strong> for Architects, Interior Designers & Real Estate Professionals
        </p>

        <Section title="1. Eligibility">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>This offer is valid exclusively for professional Architects, Interior Designers, and Real Estate Brokers/Developers based in India.</li>
            <li>Participants may be required to verify their professional status with credentials, portfolios, or identity documentation.</li>
          </ul>
        </Section>

        <Section title="2. Offer Inclusions (Total Value: ₹4,10,000)">
          <ul className="space-y-2">
            <ListCheck>Digital Presence Audit (₹10,000 value)</ListCheck>
            <ListCheck>1-Year Access to Beebark SaaS Platform (₹2,50,000 value)</ListCheck>
            <ListCheck>Custom Website Development (₹1,00,000 value)</ListCheck>
            <ListCheck>Premium Branding Kit (₹50,000 value, includes up to 4 edits)</ListCheck>
          </ul>
        </Section>

        <Section title="3. Availing This Offer">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>Register for free on the Beebark platform</li>
            <li>Subscribe to the <strong>Organic Meta & LinkedIn Marketing Package</strong> at ₹35,000/month for 6 months</li>
            <li>Be among the <strong>first 10 businesses</strong> to claim the offer before it closes</li>
          </ul>
          <p className="mt-3 text-[#221912] font-semibold">
            Note: Free registration also grants 1-year SaaS access (pre and post-launch) for the <strong>first 1,000 professionals</strong> even without the marketing subscription.
          </p>
        </Section>

        <Section title="4. Marketing Strategy">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>Focused entirely on <strong>organic growth</strong>: content marketing, SEO, social media engagement, and LinkedIn</li>
            <li>Paid ads are optional and handled only on request; clients bear all ad expenses</li>
            <li>Strategy, content creation, and analytics are managed by Beebark</li>
          </ul>
        </Section>

        <Section title="5. SaaS Platform Access">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>Clients with the 6-month marketing subscription receive <strong>1-year free platform access</strong></li>
            <li>First 50 clients get early access to feature updates and may join the <strong>beta testing group</strong></li>
            <li>Free registrants (without marketing subscription) get only platform access</li>
          </ul>
        </Section>

        <Section title="6. Pricing & Payment">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>Service Fee: ₹35,000/month (inclusive of 18% GST)</li>
            <li>Total Duration: 6 months (total: ₹2,10,000)</li>
            <li>Monthly invoices will be raised</li>
            <li>Payments are <strong>non-refundable</strong> after project commencement or campaign activation</li>
          </ul>
        </Section>

        <Section title="7. Branding & Revisions">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>Branding kit includes up to <strong>4 revisions</strong></li>
            <li>Additional edits may incur <strong>extra charges</strong> based on scope and time</li>
          </ul>
        </Section>

        <Section title="8. Referral Rewards">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>Refer another Architect, Interior Designer, or Real Estate professional</li>
            <li>Earn <strong>₹5,000</strong> credit when they subscribe successfully</li>
          </ul>
        </Section>

        <Section title="9. Deliverables & Ownership">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>Final website and branding assets are handed over to the client</li>
            <li>Beebark retains the right to showcase selected works in its portfolio or marketing</li>
            <li>Services like domain, hosting, email, and CRM are <strong>not included</strong> by default (available on request for additional fees)</li>
          </ul>
        </Section>

        <Section title="10. Termination">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>Breach of terms</li>
            <li>Unethical behavior</li>
            <li>Submission of false business or identity details</li>
          </ul>
        </Section>

        <Section title="11. Acceptance">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>By registering and subscribing to our plans, you acknowledge and agree to the terms and conditions outlined in this document.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold text-yellow-500 mb-2">{title}</h2>
    <div className="text-gray-800 leading-relaxed">{children}</div>
  </div>
);

const ListCheck = ({ children }) => (
  <li className="flex items-start gap-2">
    <span className="text-green-600 mt-1">✓</span>
    <span>{children}</span>
  </li>
);

export default TermsConditions;
