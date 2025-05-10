import React from 'react';
import Header from '../components/Header';

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

                    <label className="absolute top-2 right-2 bg-black bg-opacity-40 text-white px-2 py-0.5 rounded text-xs cursor-pointer shadow hover:bg-opacity-60 focus-within:bg-opacity-60 transition opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                        Change Cover
                        <input type="file" accept="image/*" onChange={onCoverPhotoChange} className="hidden" />
                    </label>

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

                {/* Main Content */}
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

                    {/* Content Area with top wrapping horizontal navigation for smaller screens */}
                    <div className="flex-1 bg-white">
                        {/* Horizontal Navigation for smaller screens (wrapping) */}
                        <nav className="sm:hidden bg-gray-50 border-b p-2">
                            <div className="flex flex-wrap gap-2">
                                {sections && sections.length > 0 ? (
                                    sections.map((section) => (
                                        <button
                                            key={section}
                                            onClick={() => onSectionChange(section)}
                                            className={`inline-block py-2 px-3 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 ${activeSection === section ? 'bg-orange-100 text-orange-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            {section}
                                        </button>
                                    ))
                                ) : (
                                    <div>No sections available</div>
                                )}
                            </div>
                        </nav>

                        {/* Main Content Area */}
                        <div className="p-2 sm:p-4 md:p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProfileLayout;