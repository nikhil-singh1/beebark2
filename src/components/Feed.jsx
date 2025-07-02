import React, { useState } from 'react';
// Importing Lucide React icons for the sidebar navigation
import { Home, MessageSquare, Bell, Settings, Bookmark, HelpCircle, Heart, MessageCircle, Repeat2, Send, Handshake } from 'lucide-react';

// Main App Component
const Feed = () => {
  const [activeFilter, setActiveFilter] = useState('Networking');

  // Dummy data for feed posts
  const posts = [
    {
      id: 1,
      username: 'User123',
      profilePic: 'https://placehold.co/40x40/FFEB3B/000000?text=U1',
      image: 'https://placehold.co/600x400/FFEB3B/000000?text=Post+1',
      caption: 'Beautiful project completed!',
      likes: 120,
      comments: 15,
      reposts: 5,
      filter: 'Architects',
    },
    {
      id: 2,
      username: 'RealEstateGuru',
      profilePic: 'https://placehold.co/40x40/221912/FFFFFF?text=RG',
      image: 'https://placehold.co/600x400/221912/FFFFFF?text=Property+Listing',
      caption: 'New listing available in prime location.',
    // Added a save property to existing posts
      likes: 250,
      comments: 30,
      reposts: 10,
      filter: 'Real Estate',
      saved: false,
    },
    {
      id: 3,
      username: 'InteriorDesigns',
      profilePic: 'https://placehold.co/40x40/FFEB3B/000000?text=ID',
      image: 'https://placehold.co/600x400/FFEB3B/000000?text=Design+Idea',
      caption: 'Modern interior concept for small spaces.',
      likes: 80,
      comments: 8,
      reposts: 3,
      filter: 'Interior',
    },
    {
      id: 4,
      username: 'NetworkingPro',
      profilePic: 'https://placehold.co/40x40/221912/FFFFFF?text=NP',
      image: 'https://placehold.co/600x400/221912/FFFFFF?text=Event+Update',
      caption: 'Great networking event last night!',
      likes: 300,
      comments: 45,
      reposts: 12,
      filter: 'Networking',
    },
    {
      id: 5,
      username: 'Construction_Co',
      profilePic: 'https://placehold.co/40x40/FFEB3B/000000?text=CC',
      image: 'https://placehold.co/600x400/FFEB3B/000000?text=Under+Construction',
      caption: 'Progress on our latest commercial building.',
      likes: 180,
      comments: 20,
      reposts: 7,
      filter: 'Construction',
    },
  ];

  // Dummy data for stories
  const stories = [
    { id: 1, username: 'StoryUser1', profilePic: 'https://placehold.co/60x60/FFEB3B/000000?text=S1' },
    { id: 2, username: 'StoryUser2', profilePic: 'https://placehold.co/60x60/221912/FFFFFF?text=S2' },
    { id: 3, username: 'StoryUser3', profilePic: 'https://placehold.co/60x60/FFEB3B/000000?text=S3' },
    { id: 4, username: 'StoryUser4', profilePic: 'https://placehold.co/60x60/221912/FFFFFF?text=S4' },
    { id: 5, username: 'StoryUser5', profilePic: 'https://placehold.co/60x60/FFEB3B/000000?text=S5' },
    { id: 6, username: 'StoryUser6', profilePic: 'https://placehold.co/60x60/221912/FFFFFF?text=S6' },
  ];

  const filteredPosts = posts.filter(post => activeFilter === 'All' || post.filter === activeFilter);

  // Mapping for sidebar items to Lucide icons
  const sidebarIcons = {
    Feed: Home,
    Messages: MessageSquare,
    Notifications: Bell,
    Settings: Settings,
    Saved: Bookmark,
    Help: HelpCircle,
  };

  return (
    // Main container with white background
    <div className="min-h-screen bg-white font-sans text-[#221912]">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="font-bold text-2xl text-[#221912] bg-white">BeeBark</div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-white text-yellow-500 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {/* Search icon */}
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
          </div>
        </div>
        {/* Filter Buttons */}
        <div className="flex space-x-3">
          {['Networking', 'Architects', 'Interior', 'Real Estate', 'Construction'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200
                ${activeFilter === filter ? 'bg-[#221912] text-yellow-500 shadow-lg' : 'bg-yellow-400 text-[#221912] hover:bg-yellow-300'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-grow mt-4 px-4 pb-4">
        {/* Left Sidebar (Settings) */}
        <aside className="w-1/5 p-6 bg-[#221912] rounded-xl shadow-lg mr-4 flex flex-col items-center">
          <div className="mb-8 text-center">
            <img
              src="https://placehold.co/100x100/FFEB3B/000000?text=Profile"
              alt="Profile"
              className="rounded-full border-4 border-yellow-500 mb-2"
            />
            <p className="text-yellow-500 font-semibold text-lg">My Profile</p>
          </div>
          <nav className="w-full">
            <ul>
              {['Feed', 'Messages', 'Notifications', 'Settings', 'Saved', 'Help'].map((item) => {
                const IconComponent = sidebarIcons[item];
                return (
                  <li key={item} className="mb-4">
                    <a
                      href="#"
                      className="flex items-center space-x-3 text-yellow-500 hover:text-yellow-400 transition-colors duration-200 p-2 rounded-md hover:bg-yellow-900"
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />} {/* Render icon component */}
                      <span className="font-medium">{item}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Center Feed Area */}
        <main className="w-3/5 flex flex-col items-center space-y-6 overflow-y-auto pr-4 custom-scrollbar">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-[#221912] rounded-xl shadow-lg p-6 w-full max-w-2xl text-yellow-500">
                {/* Post Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={post.profilePic}
                    alt={`${post.username}'s profile`}
                    className="w-10 h-10 rounded-full border-2 border-yellow-500 mr-3"
                  />
                  <span className="font-semibold text-lg">{post.username}</span>
                </div>
                {/* Post Image */}
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-auto rounded-lg mb-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/FFEB3B/000000?text=Image+Not+Found'; }}
                />
                {/* Post Caption */}
                <p className="mb-4 text-gray-300">{post.caption}</p>
                {/* Interaction Buttons */}
                <div className="flex items-center justify-between text-yellow-500 text-xl mb-4">
                  <div className="flex space-x-6">
                    <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                      <Repeat2 className="w-5 h-5" />
                      <span>{post.reposts}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                      <Send className="w-5 h-5" />
                      <span>Send</span>
                    </button>
                  </div>
                  <div className="flex space-x-6">
                    <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                      <HelpCircle className="w-5 h-5" />
                      <span>Ask a Question</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                      <Handshake className="w-5 h-5" />
                      <span>Collaboration</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                      <Bookmark className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
                {/* Add Comment Section (Simplified) */}
                <div className="border-t border-gray-700 pt-4">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full p-2 rounded-md bg-gray-800 text-yellow-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-yellow-500 text-xl mt-10">No posts available for this category.</p>
          )}
        </main>

        {/* Right Sidebar (Stories) */}
        <aside className="w-1/5 p-6 bg-[#221912] rounded-xl shadow-lg ml-4">
          <h3 className="text-yellow-500 font-bold text-xl mb-6 text-center">Stories</h3>
          <div className="flex flex-col space-y-4 items-center">
            {stories.map((story) => (
              <div key={story.id} className="flex items-center flex-col text-center cursor-pointer hover:opacity-80 transition-opacity">
                <img
                  src={story.profilePic}
                  alt={`${story.username}'s story`}
                  className="w-16 h-16 rounded-full border-4 border-yellow-500 mb-1"
                />
                <p className="text-yellow-500 text-sm truncate w-20">{story.username}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Feed;
