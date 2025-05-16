import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { AiOutlineHome, AiOutlineUser, AiOutlineShop, AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfileLayout = ({
  coverPhoto,
  profilePhoto,
  username,
  firstName,
  lastName,
  onCoverPhotoChange,
  onProfilePhotoChange,
  activeSection,
  sections,
  onSectionChange,
  children,
}) => {
  const navigate = useNavigate(); // Initialize navigate

  const mobileSectionsConfig = [
    { name: 'Home', icon: <AiOutlineHome size={24} />, subSections: [], route: '/' }, // Added route
    { name: 'Profile', icon: <AiOutlineUser size={24} />, subSections: ["Profile Info", "Contact Info", "Social Media"] },
    { name: 'Business', icon: <AiOutlineShop size={24} />, subSections: ["Business Info", "Experience", "Testimonials", "Awards", "Projects", "Collaboration", "Certifications", "Associations", "Team Members"] },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [currentMobileCategory, setCurrentMobileCategory] = useState('Profile');
  const [isViewingSubSection, setIsViewingSubSection] = useState(false);
  const [currentSubSection, setCurrentSubSection] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMobileCategoryClick = (category) => {
    const selectedCategory = mobileSectionsConfig.find(cat => cat.name === category);
    if (selectedCategory?.route) {
      navigate(selectedCategory.route); // Navigate if a route exists
      return;
    }
    setCurrentMobileCategory(category);
    setIsViewingSubSection(false);
    setCurrentSubSection(null);
  };

  const handleMobileSubSectionClick = (subSection) => {
    setCurrentSubSection(subSection);
    setIsViewingSubSection(true);
    onSectionChange(subSection);
  };

  const handleBackToSections = () => {
    setIsViewingSubSection(false);
    setCurrentSubSection(null);
    const currentCategoryConfig = mobileSectionsConfig.find(cat => cat.name === currentMobileCategory);
    onSectionChange(currentCategoryConfig?.subSections?.[0] || null);
  };

  if (isMobile) {
    return (
      <>
        <Header/>
        <div className="min-h-screen bg-white text-black"> {/* Removed py-4 px-2 from here */}
          <div className="max-w-md mx-auto border shadow-lg rounded-lg overflow-hidden bg-white">
            {/* Mobile Cover, Profile, Name Area */}
            <div className="pb-8">
              <div className="relative h-48 bg-gray-300 overflow-hidden group">
                {coverPhoto ? (
                  <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                    <span className="text-white text-opacity-70 text-sm">Upload Cover</span>
                  </div>
                )}
              </div>

              <div className="relative -mt-12 mx-4">
                <div className="relative w-24 h-24 border-2 border-white bg-gray-400 shadow-lg rounded-full overflow-hidden mx-auto">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-100 text-sm bg-gray-400">
                      Add Photo
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h1 className="text-xl font-bold text-gray-800">
                    {firstName && lastName ? `${firstName} ${lastName}` : username}
                  </h1>
                </div>
              </div>
            </div>

            {/* Mobile Content Area */}
            <div className="p-4 pb-20">
              {isViewingSubSection ? (
                <div>
                  <button onClick={handleBackToSections} className="flex items-center mb-4 text-gray-700 hover:text-gray-900 focus:outline-none">
                    <AiOutlineArrowLeft size={20} className="mr-2" />
                    Back
                  </button>
                  {children} {/* Render the content of the selected sub-section */}
                </div>
              ) : (
                <div className="mt-4">
                  {mobileSectionsConfig.find(cat => cat.name === currentMobileCategory)?.subSections.map(subSection => (
                    <button
                      key={subSection}
                      onClick={() => handleMobileSubSectionClick(subSection)}
                      className={`block w-full text-left py-3 px-4 rounded-md hover:bg-gray-100 mb-2 text-lg flex justify-between items-center`}
                    >
                      <span>{subSection}</span>
                      <span>&gt;</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t shadow-md z-10">
              <div className="flex justify-around items-center h-16">
                {mobileSectionsConfig.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleMobileCategoryClick(category.name)}
                    className={`flex flex-col items-center justify-center text-gray-600 focus:outline-none ${
                      currentMobileCategory === category.name ? 'text-orange-500' : ''
                    } w-full`} // Make buttons full width
                  >
                    {category.icon}
                    <span className="text-xs">{category.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white text-black py-4 px-2 sm:py-10 sm:px-4">
          <div className="max-w-7xl mx-auto border shadow-lg rounded-lg overflow-hidden bg-white">
            {/* Cover Section */}
            <div className="relative h-32 sm:h-40 md:h-64 bg-gray-300 overflow-visible group">
              {coverPhoto ? (
                <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                  <span className="text-white text-opacity-70 text-sm sm:text-base">Upload a Cover Photo</span>
                </div>
              )}

              {/* Profile Photo and Name */}
              <div className="absolute left-2 sm:left-4 -bottom-10 sm:-bottom-12 md:-bottom-16 flex items-end space-x-2 sm:space-x-4">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 sm:border-4 border-white bg-gray-400 shadow-lg rounded-full overflow-hidden group">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-100 text-xs sm:text-sm bg-gray-400">
                      Add Photo
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 cursor-pointer z-10 bg-white rounded-full p-0.5 sm:p-1 shadow-md hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-400 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <span className="text-sm sm:text-lg block">📷</span>
                    <input type="file" accept="image/*" onChange={onProfilePhotoChange} className="hidden" />
                  </label>
                </div>

                <div className="pb-0.5 sm:pb-1 md:pb-2">
                  <h1 className="text-sm sm:text-xl md:text-3xl font-bold text-gray-800">
                    {firstName && lastName ? `${firstName} ${lastName}` : username}
                  </h1>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex border-t mt-12 sm:mt-16 md:mt-20">
              {/* Sidebar for larger screens */}
              <aside className="hidden sm:block w-60 md:w-72 bg-gray-50 border-r p-4 sm:p-6 flex-shrink-0">
                <h3 className="font-semibold text-lg mb-4 text-gray-700">Account Settings</h3>
                <nav className="space-y-1">
                  {sections && sections.length > 0 ? (
                    sections.map((section) => (
                      <button
                        key={section}
                        onClick={() => onSectionChange(section)}
                        className={`w-full text-left py-2.5 px-3 rounded transition text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 ${activeSection === section ? 'bg-orange-100 font-semibold text-orange-700' : 'hover:bg-gray-100 text-gray-700'}`}
                      >
                        {section}
                      </button>
                    ))
                  ) : (
                    <div>No sections available</div>
                  )}
                </nav>
              </aside>

              {/* Content Area */}
              <div className="flex-1 bg-white p-2 sm:p-4 md:p-6">
                {/* Mobile View (Hidden on larger screens) */}
                <div className="sm:hidden">
                  {isViewingSubSection ? (
                    <div>
                      <button onClick={handleBackToSections} className="flex items-center mb-4 text-gray-700 hover:text-gray-900 focus:outline-none">
                        <AiOutlineArrowLeft size={20} className="mr-2" />
                        Back to Sections
                      </button>
                      {children} {/* Render the content of the selected sub-section */}
                    </div>
                  ) : (
                    <div className="border-b py-4 mb-4">
                      {mobileSectionsConfig.find(cat => cat.name === currentMobileCategory)?.subSections.map(subSection => (
                        <button
                          key={subSection}
                          onClick={() => handleMobileSubSectionClick(subSection)}
                          className={`block w-full text-left py-2 px-3 rounded hover:bg-gray-100 ${currentSubSection === subSection ? 'bg-gray-100 font-semibold' : ''}`}
                        >
                          {subSection}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop View (Visible on larger screens) */}
                <div className="hidden sm:block">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProfileLayout;