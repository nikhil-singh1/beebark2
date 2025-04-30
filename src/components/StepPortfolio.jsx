// src/components/StepPortfolio.jsx
import { useState } from "react";

const StepPortfolio = ({ formData, setFormData }) => {
  const [project, setProject] = useState({
    title: '',
    type: '',
    yearCompleted: '',
    location: '',
    budgetRange: '',
    roleInProject: '',
    externalLink: ''
  });

  const addProject = () => {
    setFormData({ ...formData, portfolio: [...formData.portfolio, project] });
    setProject({
      title: '',
      type: '',
      yearCompleted: '',
      location: '',
      budgetRange: '',
      roleInProject: '',
      externalLink: ''
    });
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Portfolio / Projects</h3>

      <div className="grid gap-4">
        {["title", "type", "yearCompleted", "location", "budgetRange", "roleInProject", "externalLink"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={project[field]}
            onChange={handleChange}
            placeholder={field.split(/(?=[A-Z])/).join(" ")}
            className="border rounded p-2"
          />
        ))}
      </div>

      <button onClick={addProject} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Project
      </button>

      <ul className="list-disc mt-4 ml-6">
        {formData.portfolio.map((proj, idx) => (
          <li key={idx}>{proj.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default StepPortfolio;
