import { useState } from "react";
import { ChevronDown, User, Bell, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="  flex justify-between  h-16">
        <div className="flex items-center">
          <div className="font-bold text-2xl text-blue-600">Venrollment</div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            onClick={() => navigate("/rbacmanagement")}
          >
            Access Control
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Bell size={20} />
          </button>
          {/* <button className="text-gray-600 hover:text-gray-900">
              <HelpCircle size={20} />
            </button> */}
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => navigate("/brandkit")}
          >
            <Settings size={20} />
          </button>
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <User size={16} />
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {/* <a */}
                {/* <a
                    href="#profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  </a> */}
                {/* > */}
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
