// src/components/StepCertifications.jsx
import { useState } from "react";

const StepCertifications = ({ formData, setFormData }) => {
  const [member, setMember] = useState({ name: '', role: '' });

  const addMember = () => {
    setFormData({ ...formData, teamMembers: [...formData.teamMembers, member] });
    setMember({ name: '', role: '' });
  };

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Certifications and Team Members</h3>

      <input
        type="text"
        name="name"
        placeholder="Member Name"
        value={member.name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="role"
        placeholder="Role (Head of Design, Engineering, etc.)"
        value={member.role}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <button onClick={addMember} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Team Member
      </button>

      <ul className="list-disc mt-4 ml-6">
        {formData.teamMembers.map((member, idx) => (
          <li key={idx}>{member.name} - {member.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default StepCertifications;
