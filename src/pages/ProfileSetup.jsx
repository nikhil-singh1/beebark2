// src/pages/ProfileSetup.jsx
import MultiStepForm from "../components/MultiStepForm";

const ProfileSetup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default ProfileSetup;
