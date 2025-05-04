import React from 'react';

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
  children 
}) => {
  return (
    <div className="min-h-screen bg-white text-black py-10 px-4">
      <div className="max-w-7xl mx-auto border shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Cover Section */}
        <div className="relative h-40 sm:h-64 bg-gray-300 overflow-visible group">
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
              <span className="text-white text-opacity-70">Upload a Cover Photo</span>
            </div>
          )}

          <label className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-3 py-1 rounded text-xs sm:text-sm cursor-pointer shadow hover:bg-opacity-60 focus-within:bg-opacity-60 transition opacity-0 group-hover:opacity-100 focus-within:opacity-100">
            Change Cover
            <input type="file" accept="image/*" onChange={onCoverPhotoChange} className="hidden" />
          </label>

          {/* Profile Photo and Name */}
          <div className="absolute left-4 sm:left-8 -bottom-12 sm:-bottom-16 flex items-end space-x-4">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-4 border-white bg-gray-400 shadow-lg rounded-full overflow-hidden group">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-100 text-sm bg-gray-400">
                  Add Photo
                </div>
              )}
              <label className="absolute bottom-0 right-0 cursor-pointer z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-400 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <span className="text-lg sm:text-xl block">📷</span>
                <input type="file" accept="image/*" onChange={onProfilePhotoChange} className="hidden" />
              </label>
            </div>

            <div className="pb-1 sm:pb-2">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
                {firstName && lastName ? `${firstName} ${lastName}` : username}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col sm:flex-row border-t mt-16 sm:mt-20">
          {/* Sidebar */}
          <div className="w-full sm:w-60 md:w-72 bg-gray-50 border-r p-4 sm:p-6 flex-shrink-0">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">Account Settings</h3>
            <nav className="space-y-1">
              {sections && sections.length > 0 ? (
                sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => onSectionChange(section)}
                    className={`w-full text-left py-2.5 px-3 rounded transition text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-400 ${
                      activeSection === section
                        ? "bg-yellow-300 font-semibold text-black"
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {section}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No sections available</p>
              )}
            </nav>
          </div>

          {/* Content Area */}
          <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-white">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
