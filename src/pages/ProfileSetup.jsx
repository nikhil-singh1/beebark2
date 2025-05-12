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
        b_no: "",
        p_code: "",
        email: "",
        bio: "",
        // contact
            address: "",
            country: "",
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
        if (userData) {
            setState(prev => ({
                ...prev,
                firstName: userData.firstname || "",
                lastName: userData.lastname || "",
                isVerified: userData.isVerified || "",
                category: userData.category || "",
                p_no: userData.phone || "",
                b_no: userData.phoneBusiness || "",
                p_code: userData.countryCode|| "",
                email: userData.email || "",
                bio: userData.bio || "",
                // contact
                    address:  userData.address || "",
                    country: userData.country || "",
                    state: userData.state || "",
                    city: userData.city || "",
                    pincode: userData.pincode || "",
        
                // Social Links
                    facebook: userData.facebook || "",
                    twitter: userData.twitter || "",
                    linkedin: userData.linkedin || "",
                    website: userData.website || "",
                name : userData.name || "",
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

    const handleFieldChange = (field, selectedOption) => {
        setState(prev => {
          if (field.includes('.')) {
            const [parent, child] = field.split('.');
            return { ...prev, [parent]: { ...prev[parent], [child]: selectedOption } }; // Store the entire object
          }
          return { ...prev, [field]: selectedOption }; // Store the entire object
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
            } else if (value === null && !['isOpenToFreelance', 'openToCollaboration', 'openToHiringOrInternship', 'country'].includes(field)) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const renderInput = (label, field, type = 'text', placeholder = '') => (
        <div className="mb-4 flex items-center">
            <label className="text-sm md:text-lg font-semibold text-gray-700 w-40 px-2">{label}</label> 
            <input
                type={type}
                className="px-4 py-3 text-sm border border-gray-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 focus:outline-none transition-all duration-200 ease-in-out max-w-[500px] w-full"
                value={field.includes('.') ? (state[field.split('.')[0]]?.[field.split('.')[1]] || '') : state[field] || ''}
                onChange={e => handleFieldChange(field, e.target.value)}
                placeholder={placeholder}
            />
            {errors[field] && <p className="mt-1 text-red-600 text-sm font-medium">{errors[field]}</p>}
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
                    {renderItemInputs(item, index, (name, value) => {
                        const updatedArray = [...state[field]];
                        updatedArray[index] = { ...updatedArray[index], [name]: value };
                        setState(prev => ({ ...prev, [field]: updatedArray }));
                    })}
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
    const renderWorkHistoryInputs = (item, index, onItemChange) => (
        <>
            {renderItemInput(`workHistory.${index}.name`, "Company Name", (value) => onItemChange('name', value), 'text', item.name)}
            {renderItemInput(`workHistory.${index}.role`, "Role", (value) => onItemChange('role', value), 'text', item.role)}
            {renderItemInput(`workHistory.${index}.duration`, "Duration", (value) => onItemChange('duration', value), 'text', item.duration)}
        </>
    );

    const renderTestimonialInputs = (item, index, onItemChange) => (
        <>
            {renderItemInput(`testimonials.${index}.clientName`, "Client Name", (value) => onItemChange('clientName', value), 'text', item.clientName)}
            {renderItemInput(`testimonials.${index}.message`, "Message", (value) => onItemChange('message', value), 'textarea', item.message)}
            {renderItemInput(`testimonials.${index}.date`, "Date", (value) => onItemChange('date', value), 'date', item.date)}
        </>
    );

    const renderAwardInputs = (item, index, onItemChange) => (
        <>
            {renderItemInput(`awards.${index}.title`, "Title", (value) => onItemChange('title', value), 'text', item.title)}
            {renderItemInput(`awards.${index}.organization`, "Organization", (value) => onItemChange('organization', value), 'text', item.organization)}
            {renderItemInput(`awards.${index}.year`, "Year", (value) => onItemChange('year', value), 'number', item.year)}
            {renderItemInput(`awards.${index}.description`, "Description", (value) => onItemChange('description', value), 'textarea', item.description)}
        </>
    );

    const renderProjectInputs = (item, index, onItemChange) => (
        <>
            {renderItemInput(`projects.${index}.title`, "Title", (value) => onItemChange('title', value), 'text', item.title)}
            {renderItemSelect(`projects.${index}.type`, "Type", projectTypeOptions, (selected) => onItemChange('type', selected), item.type)}
            {renderItemInput(`projects.${index}.yearStatus`, "Status (Completed/In Progress)", (value) => onItemChange('yearStatus', value), 'text', item.yearStatus)}
            {renderItemInput(`projects.${index}.location`, "Location", (value) => onItemChange('location', value), 'text', item.location)}
            {renderItemInput(`projects.${index}.budgetRange`, "Budget Range", (value) => onItemChange('budgetRange', value), 'text', item.budgetRange)}
            {renderItemInput(`projects.${index}.roleInProject`, "Role in Project", (value) => onItemChange('roleInProject', value), 'text', item.roleInProject)}
            {renderItemInput(`projects.${index}.projectLink`, "Link", (value) => onItemChange('projectLink', value), 'text', item.projectLink)}
        </>
    );

    const renderTeamMemberInputs = (item, index, onItemChange) => (
        <>
            {renderItemInput(`teamMembers.${index}.name`, "Name", (value) => onItemChange('name', value), 'text', item.name)}
            {renderItemInput(`teamMembers.${index}.role`, "Role", (value) => onItemChange('role', value), 'text', item.role)}
            {renderItemInput(`teamMembers.${index}.bio`, "Bio", (value) => onItemChange('bio', value), 'textarea', item.bio)}
            {renderItemInput(`teamMembers.${index}.linkedProfileId`, "Linked Profile ID", (value) => onItemChange('linkedProfileId', value), 'text', item.linkedProfileId)}
        </>
    );

    const renderItemInput = (field, label, customOnChange, type = 'text', initialValue) => (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={initialValue || ''}
                onChange={e => customOnChange(e.target.value)}
                placeholder={label}
            />
            {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
        </div>
    );

    const renderItemSelect = (field, label, options, customOnChange, initialValue) => (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <Select
                options={options}
                styles={selectStyles}
                value={initialValue || null}
                onChange={selected => customOnChange(selected)}
                isClearable
            />
            {errors[field] && <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>}
        </div>
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
                fieldsToValidate = ["firstName", "lastName"];
                break;
            case "Contact Info":
                dataToSave = {
                    
                    email : state.email,
                    p_code : state.p_code,
                    p_no : state.p_no,
                    b_no : state.b_no,
                    address : state.address,
                    country: state.country,
                    state: state.state,
                    city: state.city,
                    pincode: state.pincode,
                };
                fieldsToValidate = ["email","p_code","p_no","address","country", "state", "city", "pincode"];
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
                    name : state.name,
                    establishmentYear: state.establishmentYear,
                    businessLogo: state.businessLogo,
                    yearOfExperience: state.yearOfExperience,
                    licenseNumber: state.licenseNumber,
                    languageSpoken: state.languageSpoken.map(lang => lang.value),
                };
                fieldsToValidate = ["name","establishmentYear", "yearOfExperience", "licenseNumber"];
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
            } else if (value === null && !['isOpenToFreelance', 'openToCollaboration', 'openToHiringOrInternship', 'country'].includes(field)) {
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
                        {renderInput("Profile Category", "category")}
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
                            {renderInput("Email Address", "email")}
                            {renderInput("Mobile Code", "p_code")}
                            {renderInput("Personal Mobile No.", "p_no")}
                            {renderInput("Business Mobile No.", "b_no")}
                
                            <h3 className="text-lg font-semibold mt-6 mb-2">Business Address</h3>
                            {renderInput("Address", "address")}               {/* New Address field */}
                            {renderInput("Country", "country")}
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
                        {renderInput("Business Name", "name")}
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