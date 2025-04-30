// src/components/StepAbout.jsx
const StepAbout = ({ formData, setFormData }) => {
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">One-line Bio / Tagline (Public)</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">Year of Experience / Establishment Year (Public)</label>
          <input
            type="number"
            name="yearOfExperience"
            value={formData.yearOfExperience}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">License / Registration Number (Private)</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">Languages Spoken (Public)</label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(",") })}
            placeholder="English, Hindi, French"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    );
  };
  
  export default StepAbout;
  