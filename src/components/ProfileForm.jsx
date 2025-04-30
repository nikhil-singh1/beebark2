import { useState } from "react";

export default function ProfileForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value.split(',') }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <input name="name" placeholder="Full Name" value={formData.name || ''} onChange={handleChange} className="input" required />
      <input name="email" placeholder="Email" value={formData.email || ''} onChange={handleChange} className="input" required />
      <input name="phone" placeholder="Phone" value={formData.phone || ''} onChange={handleChange} className="input" />

      <input name="tagline" placeholder="Tagline" value={formData.tagline || ''} onChange={handleChange} className="input" />
      <input name="yearOfExperience" placeholder="Years of Experience" type="number" value={formData.yearOfExperience || ''} onChange={handleChange} className="input" />
      <input name="licenseNumber" placeholder="License/Registration Number" value={formData.licenseNumber || ''} onChange={handleChange} className="input" />

      <input name="languages" placeholder="Languages (comma separated)" value={formData.languages?.join(',') || ''} onChange={(e) => handleArrayChange('languages', e.target.value)} className="input" />

      <input name="specializations" placeholder="Specializations (comma separated)" value={formData.specializations?.join(',') || ''} onChange={(e) => handleArrayChange('specializations', e.target.value)} className="input" />

      {/* Hiring Preferences */}
      <div className="space-y-2">
        <label>Freelance Available?</label>
        <select name="hiringPreferences.freelance" onChange={handleChange} value={formData.hiringPreferences?.freelance || ''} className="input">
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>Full Time / Part Time?</label>
        <input name="hiringPreferences.fulltimeParttime" placeholder="Full Time / Part Time" value={formData.hiringPreferences?.fulltimeParttime || ''} onChange={handleChange} className="input" />

        <label>Open to Collaboration?</label>
        <select name="hiringPreferences.collaboration" onChange={handleChange} value={formData.hiringPreferences?.collaboration || ''} className="input">
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>Open to Internship Hiring?</label>
        <select name="hiringPreferences.internshipHiring" onChange={handleChange} value={formData.hiringPreferences?.internshipHiring || ''} className="input">
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        Save Profile
      </button>
    </form>
  );
}
