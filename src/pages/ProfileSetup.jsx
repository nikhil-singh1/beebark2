import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import ProfileLayout from './ProfileLayout';

const ProfileSetup = () => {
  const [state, setState] = useState({
    username: "Prashant Kumar",
    email: "prashant@example.com",
    firstName: "",
    lastName: "",
    aboutMe: "",
    nextHouseProject: "",
    country: null,
    state: "",
    city: "",
    pincode: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    businessName: "",
    establishmentYear: "",
    licenseNumber: "",
    projectTitle: "",
    projectType: null,
    projectStatus: "completed",
    projectYear: "",
    projectLocation: "",
    budgetRange: "",
    projectRole: "",
    projectLink: "",
    workHistory: "",
    pastClients: "",
    testimonials: "",
    awards: "",
    certifications: "",
    teamMembers: "",
    teamRoles: "",
    teamBios: "",
    teamLeads: "",
    teamProfileLinks: "",
    projectMedia: null,
    collaborationPreferences: "",
    freelanceWork: null,
    availability: null,
    openToCollaborations: null,
    internshipHiring: null
  });

  const [activeSection, setActiveSection] = useState("Profile Info");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [businessLogo, setBusinessLogo] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [errors, setErrors] = useState({});

  const projectTypeOptions = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "landscape", label: "Landscape" },
    { value: "interior", label: "Interior Design" },
  ];

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  const availabilityOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "both", label: "Both" },
    { value: "not-available", label: "Not Available" }
  ];

  const internshipHiringOptions = [
    { value: "internship", label: "Open to Internship" },
    { value: "hiring", label: "Open to Hiring" },
    { value: "both", label: "Both" },
    { value: "none", label: "None" }
  ];

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(response => {
      const countries = response.data.map(c => ({ label: c.name.common, value: c.name.common }))
        .sort((a, b) => a.label.localeCompare(b.label));
      setCountryOptions(countries);
    });
  }, []);

  const sections = [
    "Profile Info", "Contact Info", "Password", "Social Media Settings",
    "Portfolio", "Business Info", "Collaboration/Hiring Preferences",
    "Experience & Clients", "Certifications & Associations"
  ];

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? 'rgb(59 130 246)' : 'rgb(209 213 219)',
      boxShadow: state.isFocused ? '0 0 0 1px rgb(59 130 246)' : 'none',
      minHeight: '46px',
      '&:hover': {
        borderColor: state.isFocused ? 'rgb(59 130 246)' : 'rgb(156 163 175)',
      }
    })
  };

  const handleFieldChange = (field, value) => {
    setState(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateFields = (fields) => {
    const newErrors = {};
    fields.forEach(field => {
      if (!state[field] || (typeof state[field] === 'string' && !state[field].trim())) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderInput = (label, field, type = 'text', placeholder = '') => (
    <div className="w-2/3 mb-4">
      <label className="block font-medium text-black mb-1">{label}</label>
      <input
        type={type}
        className="border border-gray-300 p-2 rounded w-full"
        value={state[field]}
        placeholder={placeholder}
        onChange={e => handleFieldChange(field, e.target.value)}
      />
      {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  const renderSelect = (label, field, options) => (
    <div className="w-2/3 mb-4">
      <label className="block font-medium text-black mb-1">{label}</label>
      <Select
        options={options}
        styles={selectStyles}
        value={state[field]}
        onChange={(selected) => handleFieldChange(field, selected)}
      />
      {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  const renderSubmitButton = (fields) => (
    <button
      onClick={() => validateFields(fields) && alert("Submitted")}
      className="mt-4 px-4 py-2 bg-amber-300 text-black rounded hover:bg-amber-400 transition-colors"
    >
      Submit
    </button>
  );

  const renderProfileInfo = () => (
    <div className="space-y-4">
      {renderInput("First Name", "firstName", "text", "Enter your first name")}
      {renderInput("Last Name", "lastName", "text", "Enter your last name")}
      {renderInput("About Me", "aboutMe", "text", "Write something about yourself")}
      {renderInput("Next House Project", "nextHouseProject", "text", "Your next project idea")}
      {renderSubmitButton(["firstName", "lastName", "aboutMe", "nextHouseProject"])}
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-4">
      {renderSelect("Country", "country", countryOptions)}
      {renderInput("State", "state", "text", "Enter your state")}
      {renderInput("City", "city", "text", "Enter your city")}
      {renderInput("Pincode", "pincode", "text", "Enter your pincode")}
      {renderSubmitButton(["country", "state", "city", "pincode"])}
    </div>
  );

  const renderPassword = () => (
    <div className="space-y-4">
      {renderInput("Current Password", "currentPassword", "password", "Enter current password")}
      {renderInput("New Password", "newPassword", "password", "Enter new password")}
      {renderInput("Confirm Password", "confirmPassword", "password", "Re-enter new password")}
      {renderSubmitButton(["currentPassword", "newPassword", "confirmPassword"])}
    </div>
  );

  const renderSocialMediaSettings = () => (
    <div className="space-y-4">
      {renderInput("Facebook", "facebook", "text", "Facebook profile link")}
      {renderInput("Twitter", "twitter", "text", "Twitter handle")}
      {renderInput("Instagram", "instagram", "text", "Instagram profile")}
      {renderInput("LinkedIn", "linkedin", "text", "LinkedIn profile")}
      {renderSubmitButton(["facebook", "twitter", "instagram", "linkedin"])}
    </div>
  );

  const renderCollaborationPreferences = () => (
    <div className="space-y-4">
      {renderSelect("Open to Freelance work?", "freelanceWork", yesNoOptions)}
      {renderSelect("Available for", "availability", availabilityOptions)}
      {renderSelect("Open to collaborations?", "openToCollaborations", yesNoOptions)}
      {renderSelect("Open to Internship/Hiring", "internshipHiring", internshipHiringOptions)}
      {renderInput("Collaboration Preferences", "collaborationPreferences", "textarea", "Describe your preferences")}
      {renderSubmitButton(["freelanceWork", "availability", "openToCollaborations", "internshipHiring"])}
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-4">
      <label className="block font-medium text-black mb-1">Upload Project Media (images/videos)</label>
      <input type="file" multiple onChange={e => handleFieldChange("projectMedia", e.target.files)} />
      {renderInput("Project Title", "projectTitle", "text", "Enter project title")}
      {renderSelect("Project Type", "projectType", projectTypeOptions)}
      {renderInput("Year Completed/In Progress", "projectYear", "text", "Enter year or 'In Progress'")}
      {renderInput("Location", "projectLocation", "text", "Enter location")}
      {renderInput("Budget Range", "budgetRange", "text", "Enter budget")}
      {renderInput("Role in Project", "projectRole", "text", "Your role")}
      {renderInput("Link to Case Study / External Site", "projectLink", "text", "Project link")}
      {renderSubmitButton(["projectTitle", "projectYear", "projectLocation", "budgetRange", "projectRole", "projectLink"])}
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="space-y-4">
      {renderInput("Business Name", "businessName", "text", "Enter business name")}
      <label className="block font-medium text-black mb-1">Business Logo</label>
      <input type="file" onChange={e => setBusinessLogo(e.target.files[0])} />
      {renderInput("Establishment Year", "establishmentYear", "text", "Enter year")}
      {renderInput("Licence or Registration Number", "licenseNumber", "text", "Enter license or registration number")}
      {renderSubmitButton(["businessName", "establishmentYear", "licenseNumber"])}
    </div>
  );

  const renderExperienceAndClients = () => (
    <div className="space-y-4">
      {renderInput("Work History (Name, Role, Duration)", "workHistory", "text", "Summarize your work history")}
      {renderInput("Past Clients", "pastClients", "text", "List past clients")}
      {renderInput("Testimonials / Client Reviews", "testimonials", "text", "Enter testimonials")}
      {renderInput("Awards / Recognition", "awards", "text", "List awards")}
      {renderSubmitButton(["workHistory", "pastClients", "testimonials", "awards"])}
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-4">
      {renderInput("Certifications", "certifications", "text", "List certifications")}
      {renderInput("Team Members' Names", "teamMembers", "text", "Enter team members")}
      {renderInput("Roles", "teamRoles", "text", "Team member roles")}
      {renderInput("Bios", "teamBios", "text", "Short bios")}
      {renderInput("Heads of Design/Engineering/Business", "teamLeads", "text", "List team leads")}
      {renderInput("Internal Profile Links", "teamProfileLinks", "text", "Links to team profiles")}
      {renderSubmitButton(["certifications", "teamMembers", "teamRoles", "teamBios", "teamLeads", "teamProfileLinks"])}
    </div>
  );

  return (
    <div className="bg-white min-h-screen p-6">
      <ProfileLayout
        coverPhoto={coverPhoto}
        profilePhoto={profilePhoto}
        username={state.username}
        firstName={state.firstName}
        lastName={state.lastName}
        onCoverPhotoChange={(e) => setCoverPhoto(URL.createObjectURL(e.target.files[0]))}
        onProfilePhotoChange={(e) => setProfilePhoto(URL.createObjectURL(e.target.files[0]))}
        activeSection={activeSection}
        sections={sections}
        onSectionChange={setActiveSection}
      >
        <h2 className="text-2xl font-semibold mb-4 text-black">{activeSection}</h2>
        {activeSection === "Profile Info" && renderProfileInfo()}
        {activeSection === "Contact Info" && renderContactInfo()}
        {activeSection === "Password" && renderPassword()}
        {activeSection === "Social Media Settings" && renderSocialMediaSettings()}
        {activeSection === "Portfolio" && renderPortfolio()}
        {activeSection === "Business Info" && renderBusinessInfo()}
        {activeSection === "Collaboration/Hiring Preferences" && renderCollaborationPreferences()}
        {activeSection === "Experience & Clients" && renderExperienceAndClients()}
        {activeSection === "Certifications & Associations" && renderCertifications()}
      </ProfileLayout>
    </div>
  );
};

export default ProfileSetup;