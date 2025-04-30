// src/components/MultiStepForm.jsx
import { useState } from "react";
import StepAbout from "./StepAbout";
import StepSpecializations from "./StepSpecializations";
import StepPortfolio from "./StepPortfolio";
import StepHiringPreferences from "./StepHiringPreferences";
import StepCertifications from "./StepCertifications";
import { saveProfileData } from "../api/profile";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tagline: "",
    yearOfExperience: "",
    licenseNumber: "",
    languages: [],
    specializations: [],
    portfolio: [],
    hiringPreferences: {},
    teamMembers: []
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    try {
      await saveProfileData(formData);
      alert("Profile Completed!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {step === 1 && <StepAbout formData={formData} setFormData={setFormData} />}
      {step === 2 && <StepSpecializations formData={formData} setFormData={setFormData} />}
      {step === 3 && <StepPortfolio formData={formData} setFormData={setFormData} />}
      {step === 4 && <StepHiringPreferences formData={formData} setFormData={setFormData} />}
      {step === 5 && <StepCertifications formData={formData} setFormData={setFormData} />}
      
      <div className="flex justify-between mt-6">
        {step > 1 && <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">Back</button>}
        {step < 5 && <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>}
        {step === 5 && <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Finish</button>}
      </div>
    </div>
  );
};

export default MultiStepForm;
