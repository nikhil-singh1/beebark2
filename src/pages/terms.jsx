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
          This offer is valid exclusively for professional Architects, Interior Designers, and Real Estate Brokers/Developers based in India. Participants may be required to verify their professional status with credentials, portfolios, or identity documentation.
        </Section>

        <Section title="2. Offer Inclusions (Total Value: ₹4,10,000)">
          <ul className=" list-none space-y-2">
            <li><strong>✓ Digital Presence Audit</strong> (₹10,000 value)</li>
            <li><strong>✓ 1-Year Access to Beebark SaaS Platform</strong> (₹2,50,000 value)</li>
            <li><strong>✓ Custom Website Development</strong> (₹1,00,000 value)</li>
            <li><strong>✓ Premium Branding Kit</strong> (₹50,000 value, includes up to 4 edits)</li>
          </ul>
        </Section>

        <Section title="3. Availing This Offer">
          To avail the complete benefits:
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Register for free on the Beebark platform</li>
            <li>Subscribe to the <strong>Organic Meta & LinkedIn Marketing Package</strong> at ₹35,000/month for 6 months</li>
            <li>Be among the <strong>first 10 businesses</strong> to claim the offer before it closes</li>
          </ul>
          <p className="mt-3 text-yellow-400">
            Note: Free registration also grants 1-year SaaS access (pre and post-launch) for the <strong>first 1,000 professionals</strong> even without the marketing subscription.
          </p>
        </Section>

        <Section title="4. Marketing Strategy">
          - Focused entirely on <strong>organic growth</strong>: content marketing, SEO, social media engagement, and LinkedIn<br />
          - Paid ads are optional and handled only on request; clients bear all ad expenses<br />
          - Strategy, content creation, and analytics are managed by Beebark
        </Section>

        <Section title="5. SaaS Platform Access">
          - Clients with the 6-month marketing subscription receive <strong>1-year free platform access</strong><br />
          - First 50 clients get early access to feature updates and may join the <strong>beta testing group</strong><br />
          - Free registrants (without marketing subscription) get only platform access
        </Section>

        <Section title="6. Pricing & Payment">
          - Service Fee: ₹35,000/month (inclusive of 18% GST)<br />
          - Total Duration: 6 months (total: ₹2,10,000)<br />
          - Monthly invoices will be raised<br />
          - Payments are <strong>non-refundable</strong> after project commencement or campaign activation
        </Section>

        <Section title="7. Branding & Revisions">
          - Branding kit includes up to <strong>4 revisions</strong><br />
          - Additional edits may incur <strong>extra charges</strong> based on scope and time
        </Section>

        <Section title="8. Referral Rewards">
          - Refer another Architect, Interior Designer, or Real Estate professional<br />
          - Earn <strong>₹5,000</strong> credit when they subscribe successfully
        </Section>

        <Section title="9. Deliverables & Ownership">
          - Final website and branding assets are handed over to the client<br />
          - Beebark retains the right to showcase selected works in its portfolio or marketing<br />
          - Services like domain, hosting, email, and CRM are <strong>not included</strong> by default (available on request for additional fees)
        </Section>

        <Section title="10. Termination">
          Beebark may terminate services without refund in cases of:
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Breach of terms</li>
            <li>Unethical behavior</li>
            <li>Submission of false business or identity details</li>
          </ul>
        </Section>

        <Section title="11. Acceptance">
          By registering and subscribing to our plans, you acknowledge and agree to the terms and conditions outlined in this document.
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold text-yellow-500 mb-2">{title}</h2>
    <p className="text-gray-800 leading-relaxed">{children}</p>
  </div>
);

export default TermsConditions;
