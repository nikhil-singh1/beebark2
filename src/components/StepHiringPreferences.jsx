// src/components/StepHiringPreferences.jsx
const StepHiringPreferences = ({ formData, setFormData }) => {
    const preferences = [
      { label: "Open to Freelance Work?", field: "freelance" },
      { label: "Available for Full Time or Part Time?", field: "fulltimeParttime" },
      { label: "Open to Collaboration?", field: "collaboration" },
      { label: "Open to Internship Hiring?", field: "internshipHiring" }
    ];
  
    const handleChange = (field, value) => {
      setFormData({
        ...formData,
        hiringPreferences: { ...formData.hiringPreferences, [field]: value }
      });
    };
  
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Collaboration / Hiring Preferences</h3>
  
        {preferences.map(pref => (
          <div key={pref.field}>
            <label className="block text-sm font-medium text-gray-700">{pref.label}</label>
            <select
              onChange={(e) => handleChange(pref.field, e.target.value)}
              className="border mt-1 p-2 rounded w-full"
              defaultValue=""
            >
              <option value="" disabled>Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              {pref.field === "fulltimeParttime" && (
                <>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </>
              )}
            </select>
          </div>
        ))}
      </div>
    );
  };
  
  export default StepHiringPreferences;
  