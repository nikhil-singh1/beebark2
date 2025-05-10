import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Select from 'react-select';
import ProfileLayout from './ProfileLayout';
import { toast } from 'react-toastify';

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
    const sections = [
        "Profile Info", "Contact Info", "Social Media", "Business Info",
        "Experience", "Testimonials", "Awards", "Projects",
        "Collaboration", "Certifications", "Associations", "Team Members"
    ];
    const selectStyles = {}; // Add your custom select styles if needed
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
            console.log("UserData in useEffect:", userData);
            console.log("Token in useEffect:", token);
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

    const renderSectionContent = () => {
        switch (activeSection) {
            case "Profile Info":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                        {renderInput("First Name", "firstName")}
                        {renderInput("Last Name", "lastName")}
                        {renderInput("Bio", "bio", 'textarea')}
                        {renderImageUpload("Profile Photo", "profilePhoto", profilePhotoPreview, setProfilePhotoPreview)}
                        {renderImageUpload("Cover Photo", "coverImage", coverPhotoPreview, setCoverPhotoPreview)}
                    </>
                );
            case "Contact Info":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        {renderSelect("Country", "contact.country", countryOptions)}
                        {renderInput("State", "contact.state")}
                        {renderInput("City", "contact.city")}
                        {renderInput("Pincode", "contact.pincode")}
                    </>
                );
            case "Social Media":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
                        {renderInput("Facebook", "socialLinks.facebook", 'url')}
                        {renderInput("Twitter", "socialLinks.twitter", 'url')}
                        {renderInput("LinkedIn", "socialLinks.linkedin", 'url')}
                        {renderInput("Website", "socialLinks.website", 'url')}
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
                    </>
                );
            case "Experience":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Work History</h2>
                        {renderArrayInput("Work History", "workHistory", ["name", "role", "duration"], renderWorkHistoryInputs)}
                    </>
                );
            case "Testimonials":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
                        {renderArrayInput("Testimonials", "testimonials", ["clientName", "message", "date"], renderTestimonialInputs)}
                    </>
                );
            case "Awards":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Awards</h2>
                        {renderArrayInput("Awards", "awards", ["title", "organization", "year", "description"], renderAwardInputs)}
                    </>
                );
            case "Projects":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Projects</h2>
                        {renderArrayInput("Projects", "projects", ["title", "type", "yearStatus", "location", "budgetRange", "roleInProject", "projectLink"], renderProjectInputs)}
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
                    </>
                );
            case "Team Members":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
                        {renderArrayInput("Team Members", "teamMembers", ["name", "role", "bio", "linkedProfileId"], renderTeamMemberInputs)}
                    </>
                );
            default:
                return <div>Select a section to edit your profile.</div>;
        }
    };

    const handleSubmit = async () => {
        const fieldsToValidate = Object.keys(state).filter(key => key !== 'contact' && key !== 'socialLinks' && key !== 'availability');
        fieldsToValidate.push(
            'contact.country', 'contact.state', 'contact.city', 'contact.pincode',
            'socialLinks.facebook', 'socialLinks.twitter', 'socialLinks.linkedin', 'socialLinks.website'
        );
        if (validateFields(fieldsToValidate)) {
            try {
                const formData = new FormData();
                for (const key in state) {
                    if (key === 'contact') {
                        formData.append('contact[country]', state.contact.country?.value || '');
                        formData.append('contact[state]', state.contact.state);
                        formData.append('contact[city]', state.contact.city);
                        formData.append('contact[pincode]', state.contact.pincode);
                    } else if (key === 'socialLinks') {
                        formData.append('socialLinks[facebook]', state.socialLinks.facebook);
                        formData.append('socialLinks[twitter]', state.socialLinks.twitter);
                        formData.append('socialLinks[linkedin]', state.socialLinks.linkedin);
                        formData.append('socialLinks[website]', state.socialLinks.website);
                    } else if (key === 'languageSpoken') {
                        state.languageSpoken.forEach(lang => formData.append('languageSpoken', lang.value));
                    } else if (key === 'availability') {
                        formData.append('availability[fullTime]', state.availability.fullTime);
                        formData.append('availability[partTime]', state.availability.partTime);
                    } else if (Array.isArray(state[key])) {
                        state[key].forEach((item, index) => {
                            if (typeof item === 'object' && item !== null) {
                                for (const itemKey in item) {
                                    formData.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
                                }
                            } else {
                                formData.append(key, item);
                            }
                        });
                    } else if (state[key] instanceof File) {
                        formData.append(key, state[key]);
                    } else if (typeof state[key] === 'object' && state[key] !== null) {
                        formData.append(key, state[key]?.value);
                    }
                     else {
                        formData.append(key, state[key]);
                    }
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

    return (
        <ProfileLayout activeSection={activeSection} setActiveSection={setActiveSection}>
            <div className="flex">
                <div className="w-1/4 pr-4">
                    <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
                    <div className="space-y-2">
                        {sections.map(section => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`block w-full text-left py-2 px-3 rounded ${activeSection === section ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-3/4 bg-white rounded-md shadow-md p-6">
                    {renderSectionContent()}
                    <button
                        onClick={handleSubmit}
                        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save Profile
                    </button>
                </div>
            </div>
        </ProfileLayout>
    );
};

export default ProfileSetup;