// src/components/StepSpecializations.jsx
const StepSpecializations = ({ formData, setFormData }) => {
    const roles = [
      "Architect",
      "Interior Designer",
      "Developer",
      "Construction Professional",
      "Other"
    ];
  
    const toggleSpecialization = (role) => {
      const updated = formData.specializations.includes(role)
        ? formData.specializations.filter(r => r !== role)
        : [...formData.specializations, role];
  
      setFormData({ ...formData, specializations: updated });
    };
  
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Specializations / Services Offered</h3>
        <div className="flex flex-wrap gap-4">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => toggleSpecialization(role)}
              className={`px-4 py-2 rounded-full border ${formData.specializations.includes(role) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default StepSpecializations;
  