import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Select from 'react-select';
import ProfileLayout from './ProfileLayout'; // Adjust the path if needed
import { toast } from 'react-toastify';

const ProfileSetup = () => {
    const { userData, token, backendUrl, loadUserProfileData } = useContext(AuthContext);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        isVerified: "",
        category: "",
        p_no: "",
        p_code: "",
        email: "",
        bio: "",
        // contact
            country: null,
            state: "",
            city: "",
            pincode: "",
       // social media
            facebook: "",
            twitter: "",
            linkedin: "",
            website: "",
    
        establishmentYear: "",
        name: "",
        businessLogo: null,
        yearOfExperience: "",
        licenseNumber: "",
        workHistory: [],
        testimonials: [],
        awards: [],
        projects: [],
        teamMembers: [],
        certifications: [],
        associations: [],
        languageSpoken: [],
        isOpenToFreelance: null,
        availability: {
            fullTime: false,
            partTime: false,
        },
        openToCollaboration: null,
        openToHiringOrInternship: null,
    });

    const [activeSection, setActiveSection] = useState("Profile Info");
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
    const [businessLogoPreview, setBusinessLogoPreview] = useState(null);
    const [countryOptions, setCountryOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const sections = [
        "Profile Info", "Contact Info", "Social Media", "Business Info",
        "Experience", "Testimonials", "Awards", "Projects",
        "Collaboration", "Certifications", "Associations", "Team Members"
    ];
    const selectStyles = {};
    const yesNoOptions = [{ value: true, label: "Yes" }, { value: false, label: "No" }];
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
    const projectTypeOptions = [
        { value: "residential", label: "Residential" },
        { value: "commercial", label: "Commercial" },
        { value: "industrial", label: "Industrial" },
        { value: "landscape", label: "Landscape" },
        { value: "interior", label: "Interior Design" },
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
                isVerified: userData.isVerified || "",
                category: userData.category || "",
                p_no: userData.phone || "",
                p_code: userData.countryCode || "",
                email: userData.email || "",
                bio: userData.bio || "",
                // contact
                    country: userData.country || null,
                    state: userData.state || "",
                    city: userData.city || "",
                    pincode: userData.pincode || "",
        
                // Social Links
                    facebook: userData.facebook || "",
                    twitter: userData.twitter || "",
                    linkedin: userData.linkedin || "",
                    website: userData.website || "",
             
                establishmentYear: userData.establishmentYear || "",
                yearOfExperience: userData.yearOfExperience || "",
                licenseNumber: userData.licenseNumber || "",
                isOpenToFreelance: userData.isOpenToFreelance !== undefined ? (userData.isOpenToFreelance ? yesNoOptions[0] : yesNoOptions[1]) : null,
                availability: {
                    fullTime: userData.availability?.fullTime || false,
                    partTime: userData.availability?.partTime || false,
                },
                openToCollaboration: userData.openToCollaboration !== undefined ? (userData.openToCollaboration ? yesNoOptions[0] : yesNoOptions[1]) : null,
                openToHiringOrInternship: userData.openToHiringOrInternship ? (userData.openToHiringOrInternship === 'both' ? openToHiringOptions[2] : (userData.openToHiringOrInternship === 'hiring' ? openToHiringOptions[0] : openToHiringOptions[1])) : openToHiringOptions[3],
                workHistory: userData.workHistory || [],
                testimonials: userData.testimonials || [],
                awards: userData.awards || [],
                projects: userData.projects || [],
                teamMembers: userData.teamMembers || [],
                certifications: userData.certifications || [],
                associations: userData.associations || [],
                languageSpoken: userData.languageSpoken?.map(lang => ({ value: lang, label: lang })) || [],
            }));

            setProfilePhotoPreview(userData.profilePhoto !== 'default_profile_pic_url' ? userData.profilePhoto : null);
            setCoverPhotoPreview(userData.coverImage !== 'default_cover_image_url' ? userData.coverImage : null);
            setBusinessLogoPreview(userData.businessLogo || null);
        }
    }, [userData]);

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

    const handleImageChange = (field, e, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setState(prev => ({ ...prev, [field]: file }));
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
            if (typeof value === 'string' && !value.trim()) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
            } else if (Array.isArray(value) && value.length === 0 && !['certifications', 'associations'].includes(field)) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
            } else if (value === null && !['isOpenToFreelance', 'openToCollaboration', 'openToHiringOrInternship', 'contact.country'].includes(field)) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const renderInput = (label, field, type = 'text', placeholder = '') => (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={field.includes('.') ? (state[field.split('.')[0]]?.[field.split('.')[1]] || '') : state[field] || ''}
                onChange={e => handleFieldChange(field, e.target.value)}
                placeholder={placeholder}
            />
            {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
        </div>
    );

    const renderSelect = (label, field, options) => (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <Select
                options={options}
                styles={selectStyles}
                value={state[field]}
                onChange={(selected) => handleFieldChange(field, selected)}
                isClearable
            />
            {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
        </div>
    );

    const renderMultiSelect = (label, field, options) => (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <Select
                isMulti
                options={options.map(opt => ({ value: opt.value, label: opt.label || opt.value }))}
                styles={selectStyles}
                value={state[field]}
                onChange={(selected) => handleMultiSelectChange(field, selected)}
            />
            {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
        </div>
    );

    const renderImageUpload = (label, field, preview, setPreview) => (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            {preview && <img src={preview} alt={label} className="mb-2 max-h-48 rounded-md" />}
            <input
                type="file"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                onChange={e => handleImageChange(field, e, setPreview)}
            />
            {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
        </div>
    );

    const renderArrayInput = (label, field, itemKeys, renderItemInputs) => (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            {state[field].map((item, index) => (
                <div key={index} className="border rounded-md p-3 mb-2 bg-gray-50">
                    {renderItemInputs(item, index, (updatedItem) => handleUpdateItemInArray(field, index, updatedItem))}
                    <button
                        type="button"
                        onClick={() => handleRemoveItemFromArray(field, index)}
                        className="mt-2 px-2 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300 text-sm"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => handleAddItemToArray(field, itemKeys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
            >
                Add {label.slice(0, -1)}
            </button>
            {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
        </div>
    );

    const renderWorkHistoryInputs = (item, index, updateItem) => (
        <>
            {renderInput("Company Name", `workHistory.${index}.name`, 'text', "Company Name")}
            {renderInput("Role", `workHistory.${index}.role`, 'text', "Your Role")}
            {renderInput("Duration", `workHistory.${index}.duration`, 'text', "e.g., 2020-2022")}
        </>
    );

    const renderTestimonialInputs = (item, index, updateItem) => (
        <>
            {renderInput("Client Name", `testimonials.${index}.clientName`, 'text', "Client Name")}
            {renderInput("Message", `testimonials.${index}.message`, 'textarea', "Testimonial Message")}
            {renderInput("Date", `testimonials.${index}.date`, 'date')}
        </>
    );

    const renderAwardInputs = (item, index, updateItem) => (
        <>
            {renderInput("Title", `awards.${index}.title`, 'text', "Award Title")}
            {renderInput("Organization", `awards.${index}.organization`, 'text', "Awarding Organization")}
            {renderInput("Year", `awards.${index}.year`, 'number', "Year Received")}
            {renderInput("Description", `awards.${index}.description`, 'textarea', "Description")}
        </>
    );

    const renderProjectInputs = (item, index, updateItem) => (
        <>
            {renderInput("Title", `projects.${index}.title`, 'text', "Project Title")}
            {renderSelect("Type", `projects.${index}.type`, projectTypeOptions)}
            {renderInput("Status (Completed/In Progress)", `projects.${index}.yearStatus`, 'text', "e.g., Completed")}
            {renderInput("Location", `projects.${index}.location`, 'text', "Location")}
            {renderInput("Budget Range", `projects.${index}.budgetRange`, 'text', "e.g., $10k - $50k")}
            {renderInput("Role in Project", `projects.${index}.roleInProject`, 'text', "Your Role")}
            {renderInput("Link", `projects.${index}.projectLink`, 'text', "Project Link")}
        </>
    );

    const renderTeamMemberInputs = (item, index, updateItem) => (
        <>
            {renderInput("Name", `teamMembers.${index}.name`, 'text', "Team Member Name")}
            {renderInput("Role", `teamMembers.${index}.role`, 'text', "Team Member Role")}
            {renderInput("Bio", `teamMembers.${index}.bio`, 'textarea', "Short Bio")}
            {renderInput("Linked Profile ID", `teamMembers.${index}.linkedProfileId`, 'text', "Internal Profile ID")}
        </>
    );

    const handleSaveSection = async (sectionName) => {
        let dataToSave = {};
        let fieldsToValidate = [];

        switch (sectionName) {
            case "Profile Info":
                dataToSave = {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    bio: state.bio,
                    profilePhoto: state.profilePhoto,
                    coverImage: state.coverImage,
                };
                fieldsToValidate = ["firstName", "lastName", "bio"];
                break;
            case "Contact Info":
                dataToSave = {
                    country: state.contact,
                    state: state.state,
                    city: state.city,
                    pincode: state.pincode,
                };
                fieldsToValidate = ["country", "state", "city", "pincode"];
                break;
            case "Social Media":
                dataToSave = {
                    facebook: state.facebook,
                    twitter: state.twitter,
                    linkedin: state.linkedin,
                    website: state.website
                };
                fieldsToValidate = ["facebook", "twitter", "linkedin", "website"];
                break;
            case "Business Info":
                dataToSave = {
                    establishmentYear: state.establishmentYear,
                    businessLogo: state.businessLogo,
                    yearOfExperience: state.yearOfExperience,
                    licenseNumber: state.licenseNumber,
                    languageSpoken: state.languageSpoken.map(lang => lang.value),
                };
                fieldsToValidate = ["establishmentYear", "yearOfExperience", "licenseNumber"];
                break;
            case "Experience":
                dataToSave = {
                    workHistory: state.workHistory,
                };
                fieldsToValidate = ["workHistory"]; // Consider validating individual items
                break;
            case "Testimonials":
                dataToSave = {
                    testimonials: state.testimonials,
                };
                fieldsToValidate = ["testimonials"];
                break;
            case "Awards":
                dataToSave = {
                    awards: state.awards,
                };
                fieldsToValidate = ["awards"];
                break;
            case "Projects":
                dataToSave = {
                    projects: state.projects,
                };
                fieldsToValidate = ["projects"];
                break;
            case "Collaboration":
                dataToSave = {
                    isOpenToFreelance: state.isOpenToFreelance?.value,
                    availability: state.availability,
                    openToCollaboration: state.openToCollaboration?.value,
                    openToHiringOrInternship: state.openToHiringOrInternship?.value,
                };
                fieldsToValidate = ["isOpenToFreelance", "availability", "openToCollaboration", "openToHiringOrInternship"];
                break;
            case "Certifications":
                dataToSave = {
                    certifications: state.certifications,
                };
                fieldsToValidate = ["certifications"];
                break;
            case "Associations":
                dataToSave = {
                    associations: state.associations,
                };
                fieldsToValidate = ["associations"];
                break;
            case "Team Members":
                dataToSave = {
                    teamMembers: state.teamMembers,
                };
                fieldsToValidate = ["teamMembers"];
                break;
            default:
                console.warn(`Saving for section "${sectionName}" not implemented.`);
                return;
        }

        // Validate the fields for the current section
        const sectionErrors = {};
        fieldsToValidate.forEach(field => {
            const value = field.includes('.') ? (state[field.split('.')[0]]?.[field.split('.')[1]]) : state[field];
            if (typeof value === 'string' && !value.trim()) {
                sectionErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
            } else if (Array.isArray(value) && value.length === 0 && !['certifications', 'associations'].includes(field)) {
                sectionErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
            } else if (value === null && !['isOpenToFreelance', 'openToCollaboration', 'openToHiringOrInternship', 'contact.country'].includes(field)) {
                sectionErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
            }
        });
        setErrors(prevErrors => ({ ...prevErrors, ...sectionErrors }));

        if (Object.keys(sectionErrors).length === 0) {
            try {
                const formData = new FormData();
                for (const key in dataToSave) {
                    if (Array.isArray(dataToSave[key])) {
                        dataToSave[key].forEach((item, index) => {
                            if (typeof item === 'object' && item !== null) {
                                for (const itemKey in item) {
                                    formData.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
                                }
                            } else {
                                formData.append(key, item);
                            }
                        });
                    } else if (dataToSave[key] instanceof File) {
                        formData.append(key, dataToSave[key]);
                    } else {
                        formData.append(key, dataToSave[key]);
                    }
                }
    

                const { data } = await axios.post(`${backendUrl}/api/users/update-profile`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`, // Add "Bearer " before the token
                    },
                });

                if (data.success) {
                    toast.success(data.message);
                    await loadUserProfileData(); // Refresh user data to reflect changes
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error("Error updating profile section:", sectionName, error);
                toast.error(`Failed to update ${sectionName}.`);
            }
        }
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case "Profile Info":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                        {renderInput("First Name", "firstName")}
                        {renderInput("Last Name", "lastName")}
                        {renderInput("Profile Verified", "isVerified")}
                        {renderInput("Email Address", "email")}
                        {renderInput("Profile Category", "category")}
                        {renderInput("Personal Mobile No.", "p_no")}
                        {renderInput("Mobile Code", "p_code")}
                        {renderInput("Bio", "bio", 'textarea')}
                        {renderImageUpload("Profile Photo", "profilePhoto", profilePhotoPreview, setProfilePhotoPreview)}
                        {renderImageUpload("Cover Photo", "coverImage", coverPhotoPreview, setCoverPhotoPreview)}
                        <button
                            onClick={() => handleSaveSection('Profile Info')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Profile Info
                        </button>
                    </>
                );
            case "Contact Info":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        {renderSelect("Country", "country", countryOptions)}
                        {renderInput("State", "state")}
                        {renderInput("City", "city")}
                        {renderInput("Pincode", "pincode")}
                        <button
                            onClick={() => handleSaveSection('Contact Info')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Contact Info
                        </button>
                    </>
                );
            case "Social Media":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
                        {renderInput("Facebook", "facebook", )}
                        {renderInput("Twitter", "twitter")}
                        {renderInput("LinkedIn", "linkedin")}
                        {renderInput("Website", "website")}
                        <button
                            onClick={() => handleSaveSection('Social Media')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Social Media
                        </button>
                    </>
                );
            case "Business Info":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Business Information</h2>
                        {renderInput("Establishment Year", "establishmentYear", 'number')}
                        {renderImageUpload("Business Logo", "businessLogo", businessLogoPreview, setBusinessLogoPreview)}
                        {renderInput("Years of Experience", "yearOfExperience", 'number')}
                        {renderInput("License Number", "licenseNumber")}
                        {renderMultiSelect("Languages Spoken", "languageSpoken", [
                            { value: 'english', label: 'English' },
                            { value: 'hindi', label: 'Hindi' },
                            { value: 'spanish', label: 'Spanish' },
                            { value: 'french', label: 'French' },
                            // Add more languages as needed
                        ])}
                        <button
                            onClick={() => handleSaveSection('Business Info')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Business Info
                        </button>
                    </>
                );
            case "Experience":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Work History</h2>
                        {renderArrayInput("Work History", "workHistory", ["name", "role", "duration"], renderWorkHistoryInputs)}
                        <button
                            onClick={() => handleSaveSection('Experience')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Experience
                        </button>
                    </>
                );
            case "Testimonials":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
                        {renderArrayInput("Testimonials", "testimonials", ["clientName", "message", "date"], renderTestimonialInputs)}
                        <button
                            onClick={() => handleSaveSection('Testimonials')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Testimonials
                        </button>
                    </>
                );
            case "Awards":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Awards</h2>
                        {renderArrayInput("Awards", "awards", ["title", "organization", "year", "description"], renderAwardInputs)}
                        <button
                            onClick={() => handleSaveSection('Awards')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Awards
                        </button>
                    </>
                );
            case "Projects":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Projects</h2>
                        {renderArrayInput("Projects", "projects", ["title", "type", "yearStatus", "location", "budgetRange", "roleInProject", "projectLink"], renderProjectInputs)}
                        <button
                            onClick={() => handleSaveSection('Projects')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Projects
                        </button>
                    </>
                );
            case "Collaboration":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Collaboration Preferences</h2>
                        {renderSelect("Open to Freelance", "isOpenToFreelance", yesNoOptions)}
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-1">Availability</label>
                            <Select
                                options={availabilityOptions}
                                styles={selectStyles}
                                value={Object.keys(state.availability).filter(key => state.availability[key]).map(key => availabilityOptions.find(opt => opt.value[key] === state.availability[key]))}
                                isMulti
                                onChange={(selectedOptions) => {
                                    const fullTime = selectedOptions?.some(opt => opt.value.fullTime) || false;
                                    const partTime = selectedOptions?.some(opt => opt.value.partTime) || false;
                                    handleFieldChange("availability", { fullTime, partTime });
                                }}
                            />
                        </div>
                        {renderSelect("Open to Collaboration", "openToCollaboration", yesNoOptions)}
                        {renderSelect("Open to Hiring or Internship", "openToHiringOrInternship", openToHiringOptions)}
                        <button
                            onClick={() => handleSaveSection('Collaboration')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Collaboration
                        </button>
                    </>
                );
            case "Certifications":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-1">Certifications (comma-separated)</label>
                            <input
                                type="text"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={state.certifications.join(', ')}
                                onChange={e => handleFieldChange("certifications", e.target.value.split(',').map(item => item.trim()))}
                            />
                            {errors["certifications"] && <p className="mt-1 text-red-500 text-sm">{errors["certifications"]}</p>}
                        </div>
                        <button
                            onClick={() => handleSaveSection('Certifications')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Certifications
                        </button>
                    </>
                );
            case "Associations":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Associations</h2>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-1">Associations (comma-separated)</label>
                            <input
                                type="text"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={state.associations.join(', ')}
                                onChange={e => handleFieldChange("associations", e.target.value.split(',').map(item => item.trim()))}
                            />
                            {errors["associations"] && <p className="mt-1 text-red-500 text-sm">{errors["associations"]}</p>}
                        </div>
                        <button
                            onClick={() => handleSaveSection('Associations')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Associations
                        </button>
                    </>
                );
            case "Team Members":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
                        {renderArrayInput("Team Members", "teamMembers", ["name", "role", "bio", "linkedProfileId"], renderTeamMemberInputs)}
                        <button
                            onClick={() => handleSaveSection('Team Members')}
                            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Save Team Members
                        </button>
                    </>
                );
            default:
                return <div>Select a section to edit your profile.</div>;
        }
    };

    return (
        <ProfileLayout
            coverPhoto={coverPhotoPreview}
            profilePhoto={profilePhotoPreview}
            username={userData?.username}
            firstName={userData?.firstname}
            lastName={userData?.lastname}
            onCoverPhotoChange={(e) => handleImageChange('coverImage', e, setCoverPhotoPreview)}
            onProfilePhotoChange={(e) => handleImageChange('profilePhoto', e, setProfilePhotoPreview)}
            activeSection={activeSection}
            sections={sections}
            onSectionChange={setActiveSection}
        >
            {renderSectionContent()}
        </ProfileLayout>
    );
};

export default ProfileSetup;