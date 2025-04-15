import React from "react";

export default function ManifestoPage() {
  const manifesto = [
    {
      title: "We Begin With Honesty",
      description:
        "We tell the truth—about who we are, what we offer, and what we cannot promise. Honesty is our first act of service to our clients, team, and selves.",
    },
    {
      title: "We Choose Hope Over Fear",
      description:
        "Even when things are uncertain, we believe that the right people, opportunities, and ideas will meet us as we walk in alignment.",
    },
    {
      title: "We Surrender to a Higher Vision",
      description:
        "We are not here to just build a digital agency. We are here to create transformation—within ourselves, for our clients, and through every interaction.",
    },
    {
      title: "We Stay Accountable",
      description:
        "We regularly review where our business is aligned—and where it's not. We don't hide behind perfection or pride. We clean the mirror daily.",
    },
    {
      title: "We Share Openly",
      description:
        "We speak about our struggles and our growth. Vulnerability is part of our leadership. Transparency is part of our culture.",
    },
    {
      title: "We Let Go of What Blocks Us",
      description:
        "Ego, control, fear, procrastination—they don’t lead here. We pause, listen, and choose again. We stay willing to change.",
    },
    {
      title: "We Lead with Humility",
      description:
        "We serve. We don’t dominate. We allow others to shine. We’re not above feedback, and we’re never done learning.",
    },
    {
      title: "We Make Amends, Not Excuses",
      description:
        "When we mess up, we own it. We fix it. We grow. Integrity means we leave things better than we found them.",
    },
    {
      title: "We Repair Through Right Action",
      description:
        "We rebuild trust through consistent, honest effort. Our clients, partners, and team know we walk our talk.",
    },
    {
      title: "We Reflect Daily",
      description:
        "At the end of each day, we ask: Did I serve? Did I grow? Did I honor the mission? And if not, we begin again tomorrow.",
    },
    {
      title: "We Stay Spiritually Connected",
      description:
        "We are guided by intuition, inspiration, and service. We begin each day grounded in silence, intention, and trust.",
    },
    {
      title: "We Exist to Serve",
      description:
        "We are here to help others rise. Our work is sacred. Our clients are partners. Our growth is rooted in contribution. We don’t chase success—we attract it by alignment.",
    },
  ];

  return (
    <div className="bg-[#221912] text-white min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-yellow-500 text-center mb-6">BeeBark Manifesto</h1>
        <p className="text-lg text-gray-100 text-center mb-12 max-w-3xl mx-auto">
          BeeBark exists to help creators of space—architects, builders, designers—connect to their audience through honest, creative, and conscious digital work. We believe in clarity over clutter, intention over trends, and service over ego. This business is a vessel for integrity, growth, and impact.
        </p>

        <div className="space-y-10">
          {manifesto.map((point, index) => (
            <div
              key={index}
              className="bg-[#2d2119] p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-yellow-500 mb-2">
                {index + 1}. {point.title}
              </h2>
              <p className="text-gray-100 text-lg leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
