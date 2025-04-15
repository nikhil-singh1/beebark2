export default function ReferralSection() {
  return (
    <div className="bg-[#221912] text-white p-6 text-center mx-auto">
      <h2 className="text-xl font-bold">
        Refer a Friend & Earn 5,000 Credit towards your next marketing campaign.
      </h2>
      <p className="text-sm mt-2">
        Transform Your Business with Beebark - The Future of Architectural Networking & Marketing!
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="email"
          placeholder="Enter email address"
          className="px-4 py-2 w-64 rounded-lg text-gray-800 focus:outline-none"
        />
        <button className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded-lg flex items-center gap-1">
          Invite
        </button>
      </div>
      {/* Yellow horizontal line */}
      <hr className="w-full border-0 h-1 bg-yellow-400 mt-6" />
    </div>
  );
}
