import React, { useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <img
            className="w-24 cursor-pointer"
            src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="Netflix Logo"
          />
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">Home</button>
            <button className="text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">TV Shows</button>
            <button className="text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">Movies</button>
            <button className="text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">New & Popular</button>
            <button className="text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">My List</button>
            <button className="text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">Browse by Languages</button>
          </nav>
        </div>

        {/* Right side - Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Kids */}
          <button className="text-white hover:text-gray-300 transition-colors text-sm bg-transparent border-none cursor-pointer">KIDS</button>

          {/* Notifications */}
          <button className="text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
            </svg>
          </button>

          {/* Profile */}
          <div className="relative group">
            <img
              src="https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"
              alt="Profile"
              className="w-8 h-8 rounded cursor-pointer"
            />
            
            {/* Profile Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-800">
                  <div className="font-medium">User Profile</div>
                  <div className="text-xs text-gray-500">user@example.com</div>
                </div>
                <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 bg-transparent border-none cursor-pointer">Account</button>
                <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 bg-transparent border-none cursor-pointer">Help Center</button>
                <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 bg-transparent border-none cursor-pointer">Sign out of Netflix</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;