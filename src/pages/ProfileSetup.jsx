import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Select from 'react-select';
import ProfileLayout from './ProfileLayout';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify

const ProfileSetup = () => {
    const { userData, token, backendUrl, loadUserProfileData } = useContext(AuthContext);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        contact: {
            country: null,
            state: "",
            city: "",
            pincode: "",
        },
        socialLinks: {
            facebook: "",
            twitter: "",
            linkedin: "",
            website: "", // Assuming you want a website link
        },
        establishmentYear: "",
        businessLogo: null, // Will store the File object for upload
        yearOfExperience: "",
        licenseNumber: "",
        languageSpoken: [], // Will use react-select for multiple values
        workHistory: [], // Array of { name, role, duration }
        testimonials: [], // Array of { clientName, message, date }
        awards: [], // Array of { title, organization, year, description }
        projects: [], // Array of project objects
        isOpenToFreelance: null,
        availability: {
            fullTime: false,
            partTime: false,
        },
        openToCollaboration: null,
        openToHiringOrInternship: null,
        certifications: [], // Array of strings
        associations: [], // Array of strings
        teamMembers: [], // Array of team member objects
    });

    const [activeSection, setActiveSection] = useState("Profile Info");
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
    const [businessLogoPreview, setBusinessLogoPreview] = useState(null);
    const [coverPhotoFile, setCoverPhotoFile] = useState(null);
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);
    const [businessLogoFile, setBusinessLogoFile] = useState(null);
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
        { value: true, label: "Yes" },
        { value: false, label: "No" }
    ];

    const availabilityOptions = [
        { value: { fullTime: true, partTime: false }, label: "Full Time" },
        { value: { fullTime: false, partTime: true }, label: "Part Time" },
        { value: { fullTime: true, partTime: true }, label: "Both" },
    ];

    const openToHiringOptions = [
        { value: "hiring", label: "Hiring" },
        { value: "internship", label: "Internship" },
        { value: "both", label: "Both" },
        { value: null, label: "No" },
    ];

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then(response => {
            const countries = response.data.map(c => ({ label: c.name.common, value: c.name.common }))
                .sort((a, b) => a.label.localeCompare(b.label));
            setCountryOptions(countries);
        });
    }, []);

    useEffect(() => {
        if (userData) {
            setState(prev => ({
                ...prev,
                firstName: userData.firstname || "",
                lastName: userData.lastname || "",
                bio: userData.bio || "",
                contact: {
                    country: userData.contact?.country ? { value: userData.contact.country, label: userData.contact.country } : null,
                    state: userData.contact?.state || "",
                    city: userData.contact?.city || "",
                    pincode: userData.contact?.pincode || "",
                },
                socialLinks: {
                    facebook: userData.socialLinks?.facebook || "",
                    twitter: userData.socialLinks?.twitter || "",
                    linkedin: userData.socialLinks?.linkedin || "",
                    website: userData.socialLinks?.website || "",
                },
                establishmentYear: userData.establishmentYear || "",
                yearOfExperience: userData.yearOfExperience || "",
                licenseNumber: userData.licenseNumber || "",
                languageSpoken: userData.languageSpoken?.map(lang => ({ value: lang, label: lang })) || [],
                workHistory: userData.workHistory || [],
                testimonials: userData.testimonials || [],
                awards: userData.awards || [],
                projects: userData.projects || [],
                isOpenToFreelance: userData.isOpenToFreelance !== undefined ? (userData.isOpenToFreelance ? yesNoOptions[0] : yesNoOptions[1]) : null,
                availability: {
                    fullTime: userData.availability?.fullTime || false,
                    partTime: userData.availability?.partTime || false,
                },
                openToCollaboration: userData.openToCollaboration !== undefined ? (userData.openToCollaboration ? yesNoOptions[0] : yesNoOptions[1]) : null,
                openToHiringOrInternship: userData.openToHiringOrInternship ? (userData.openToHiringOrInternship === 'both' ? openToHiringOptions[2] : (userData.openToHiringOrInternship === 'hiring' ? openToHiringOptions[0] : openToHiringOptions[1])) : openToHiringOptions[3],
                certifications: userData.certifications || [],
                associations: userData.associations || [],
                teamMembers: userData.teamMembers || [],
            }));

            setProfilePhotoPreview(userData.profilePhoto !== 'default_profile_pic_url' ? userData.profilePhoto : null);
            setCoverPhotoPreview(userData.coverImage !== 'default_cover_image_url' ? userData.coverImage : null);
            setBusinessLogoPreview(userData.businessLogo || null);
        }
    }, [userData]);

    const sections = [
        "Profile Info", "Contact Info", "Social Media", "Business Info",
        "Experience", "Testimonials", "Awards", "Projects",
        "Collaboration", "Certifications", "Team Members"
    ];

    const selectStyles = { }; // Your existing selectStyles

    const handleFieldChange = (field, value) => {
        setState(prev => {
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                return { ...prev, [parent]: { ...prev[parent], [child]: value } };
            }
            return { ...prev, [field]: value };
        });
        setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const handleMultiSelectChange = (field, selectedOptions) => {
        setState(prev => ({ ...prev, [field]: selectedOptions }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const handleImageChange = (field, e, setPreview, setFile) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFile(file);
            setState(prev => ({ ...prev, [field]: file })); // Store File object in state for upload
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const handleAddItemToArray = (field, newItem) => {
        setState(prev => ({ ...prev, [field]: [...prev[field], newItem] }));
    };

    const handleRemoveItemFromArray = (field, index) => {
        setState(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
    };

    const handleUpdateItemInArray = (field, index, updatedItem) => {
        setState(prev => {
            const updatedArray = [...prev[field]];
            updatedArray[index] = updatedItem;
            return { ...prev, [field]: updatedArray };
        });
    };

    const validateFields = (fields) => {
        const newErrors = {};
        fields.forEach(field => {
            const value = field.includes('.') ? (state[field.split('.')[0]]?.[field.split('.')[1]]) : state[field];
            if (!value || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0)) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const renderInput = (label, field, type = 'text', placeholder = '', valueOverride) => (
        <div className="mb-4">
            <label className="block font-medium text-black mb-1">{label}</label>
            <input
                type={type}
                className="border border-gray-300 p-2 rounded w-full"
                value={valueOverride !== undefined ? valueOverride : (field.includes('.') ? (state[field.split('.')[0]]?.[field.split('.')[1]] || '') : state[field] || '')}
                placeholder={placeholder}
                onChange={e => handleFieldChange(field, e.target.value)}
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
    );

    const renderSelect = (label, field, options) => (
        <div className="mb-4">
            <label className="block font-medium text-black mb-1">{label}</label>
            <Select
                options={options}
                styles={selectStyles}
                value={state[field]}
                onChange={(selected) => handleFieldChange(field, selected)}
                isClearable
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
    );

    const renderMultiSelect = (label, field, options) => (
        <div className="mb-4">
            <label className="block font-medium text-black mb-1">{label}</label>
            <Select
                isMulti
                options={options.map(opt => ({ value: opt.value, label: opt.label || opt.value }))}
                styles={selectStyles}
                value={state[field]}
                onChange={(selected) => handleMultiSelectChange(field, selected)}
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
    );

    const renderImageUpload = (label, field, preview, setPreview, setFile) => (
        <div className="mb-4">
            <label className="block font-medium text-black mb-1">{label}</label>
            {preview && <img src={preview} alt={label} className="mb-2 max-h-48" />}
            <input type="file" onChange={e => handleImageChange(field, e, setPreview, setFile)} />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
    );

    const renderArrayInput = (label, field, itemKeys, renderItemInputs) => (
        <div className="mb-4">
            <label className="block font-medium text-black mb-1">{label}</label>
            {state[field].map((item, index) => (
                <div key={index} className="border p-2 mb-2 rounded">
                    {renderItemInputs(item, index, (updatedItem) => handleUpdateItemInArray(field, index, updatedItem))}
                    <button type="button" onClick={() => handleRemoveItemFromArray(field, index)} className="text-red-500 hover:text-red-700">Remove</button>
                </div>
            ))}
            <button type="button" onClick={() => handleAddItemToArray(field, itemKeys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))} className="bg-green-500 text-white p-2 rounded hover:bg-green-700">Add {label.slice(0, -1)}</button>
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
    );

    const renderWorkHistoryInputs = (item, index, updateItem) => (
        <>
            {renderInput("Company Name", `workHistory.${index}.name`, 'text', "Company Name", item.name)}
            {renderInput("Role", `workHistory.${index}.role`, 'text', "Your Role", item.role)}
            {renderInput("Duration", `workHistory.${index}.duration`, 'text', "e.g., 2020-2022", item.duration)}
        </>
    );

    const renderTestimonialInputs = (item, index, updateItem) => (
        <>
            {renderInput("Client Name", `testimonials.${index}.clientName`, 'text', "Client Name", item.clientName)}
            {renderInput("Message", `testimonials.${index}.message`, 'textarea', "Testimonial Message", item.message)}
            {renderInput("Date", `testimonials.${index}.date`, 'date', "", item.date ? new Date(item.date).toISOString().split('T')[0] : '')}
        </>
    );

    const renderAwardInputs = (item, index, updateItem) => (
        <>
            {renderInput("Title", `awards.${index}.title`, 'text', "Award Title", item.title)}
            {renderInput("Organization", `awards.${index}.organization`, 'text', "Awarding Organization", item.organization)}
            {renderInput("Year", `awards.${index}.year`, 'number', "Year Received", item.year)}
            {renderInput("Description", `awards.${index}.description`, 'textarea', "Description", item.description)}
        </>
    );

    const renderProjectInputs = (item, index, updateItem) => (
        <>
            {renderInput("Title", `projects.${index}.title`, 'text', "Project Title", item.title)}
            {renderSelect("Type", `projects.${index}.type`, projectTypeOptions, item.type)}
            {renderInput("Status (Completed/In Progress)", `projects.${index}.yearStatus`, 'text', "e.g., Completed", item.yearStatus)}
            {renderInput("Location", `projects.${index}.location`, 'text', "Location", item.location)}
            {renderInput("Budget Range", `projects.${index}.budgetRange`, 'text', "e.g., $10k - $50k", item.budgetRange)}
            {renderInput("Role in Project", `projects.${index}.roleInProject`, 'text', "Your Role", item.roleInProject)}
            {renderInput("Link", `projects.${index}.projectLink`, 'text', "Project Link", item.projectLink)}
        </>
    );

    const renderTeamMemberInputs = (item, index, updateItem) => (
        <>
            {renderInput("Name", `teamMembers.${index}.name`, 'text', "Team Member Name", item.name)}
            {renderInput("Role", `teamMembers.${index}.role`, 'text', "Team Member Role", item.role)}
            {renderInput("Bio", `teamMembers.${index}.bio`, 'textarea', "Short Bio", item.bio)}
            {renderInput("Linked Profile ID", `teamMembers.${index}.linkedProfileId`, 'text', "Internal Profile ID", item.linkedProfileId)}
        </>
    );

    const renderSubmitButton = (fields) => (
        <button
            onClick={() => {
                if (validateFields(fields)) {
                    updateUserProfileData();
                }
            }}
            className="mt-4 px-4 py-2 bg-amber-300 text-black rounded hover:bg-amber-400 transition-colors"
        >
            Save Profile
        </button>
    );

    const updateUserProfileData = async () => {
      try {
          const formData = new FormData();

          // Basic Info
          formData.append('firstname', state.firstName);
          formData.append('lastname', state.lastName);
          formData.append('name', `${state.firstName} ${state.lastName}`.trim()); // Construct full name
          formData.append('bio', state.bio);
          formData.append('establishmentYear', state.establishmentYear);
          formData.append('yearOfExperience', state.yearOfExperience);
          formData.append('licenseNumber', state.licenseNumber);
          formData.append('category', userData?.category || ""); // Assuming category doesn't change here
          formData.append('profileType', userData?.profileType || ""); // Assuming profileType doesn't change here

          // Contact Info
          formData.append('contact[country]', state.contact.country?.value || '');
          formData.append('contact[state]', state.contact.state);
          formData.append('contact[city]', state.contact.city);
          formData.append('contact[pincode]', state.contact.pincode);

          // Social Links
          formData.append('socialLinks[facebook]', state.socialLinks.facebook);
          formData.append('socialLinks[twitter]', state.socialLinks.twitter);
          formData.append('socialLinks[linkedin]', state.socialLinks.linkedin);
          formData.append('socialLinks[website]', state.socialLinks.website);

          // Languages Spoken (handle as array)
          state.languageSpoken.forEach(lang => {
              formData.append('languageSpoken', lang.value);
          });

          // Work History (handle as array of objects)
          state.workHistory.forEach((item, index) => {
              formData.append(`workHistory[${index}][name]`, item.name);
              formData.append(`workHistory[${index}][role]`, item.role);
              formData.append(`workHistory[${index}][duration]`, item.duration);
          });

          // Testimonials (handle as array of objects)
          state.testimonials.forEach((item, index) => {
              formData.append(`testimonials[${index}][clientName]`, item.clientName);
              formData.append(`testimonials[${index}][message]`, item.message);
              formData.append(`testimonials[${index}][date]`, item.date ? new Date(item.date).toISOString() : '');
          });

          // Awards (handle as array of objects)
          state.awards.forEach((item, index) => {
              formData.append(`awards[${index}][title]`, item.title);
              formData.append(`awards[${index}][organization]`, item.organization);
              formData.append(`awards[${index}][year]`, item.year);
              formData.append(`awards[${index}][description]`, item.description);
          });

          // Projects (handle as array of objects)
          state.projects.forEach((item, index) => {
              formData.append(`projects[${index}][title]`, item.title);
              formData.append(`projects[${index}][type]`, item.type?.value || '');
              formData.append(`projects[${index}][yearStatus]`, item.yearStatus);
              formData.append(`projects[${index}][location]`, item.location);
              formData.append(`projects[${index}][budgetRange]`, item.budgetRange);
              formData.append(`projects[${index}][roleInProject]`, item.roleInProject);
              formData.append(`projects[${index}][projectLink]`, item.projectLink);
          });

          // Collaboration Preferences
          formData.append('isOpenToFreelance', state.isOpenToFreelance?.value || '');
          formData.append('availability[fullTime]', state.availability.fullTime);
          formData.append('availability[partTime]', state.availability.partTime);
          formData.append('openToCollaboration', state.openToCollaboration?.value || '');
          formData.append('openToHiringOrInternship', state.openToHiringOrInternship);

          // Certifications (handle as comma-separated string)
          formData.append('certifications', state.certifications.join(','));

          // Associations (handle as comma-separated string)
          formData.append('associations', state.associations.join(','));

          // Team Members (handle as array of objects)
          state.teamMembers.forEach((member, index) => {
              formData.append(`teamMembers[${index}][name]`, member.name);
              formData.append(`teamMembers[${index}][role]`, member.role);
              formData.append(`teamMembers[${index}][bio]`, member.bio);
              formData.append(`teamMembers[${index}][linkedProfileId]`, member.linkedProfileId);
          });

          // Handle Image Uploads
          if (profilePhotoFile) {
              formData.append('profilePhoto', profilePhotoFile);
          }
          if (coverPhotoFile) {
              formData.append('coverImage', coverPhotoFile);
          }
          if (businessLogoFile) {
              formData.append('businessLogo', businessLogoFile);
          }

          // Log FormData for debugging
          for (const [key, value] of formData.entries()) {
              console.log(`${key}: ${value}`);
          }

          const { data } = await axios.post(`${backendUrl}/api/users/update-profile`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  token,
              },
          });

          if (data.success) {
              toast.success(data.message);
              await loadUserProfileData();
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Failed to update profile.");
      }
    }
  };

  export default ProfileSetup;