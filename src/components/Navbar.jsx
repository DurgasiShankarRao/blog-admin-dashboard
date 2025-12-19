import { Menu, User } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu />
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Blog Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-700">
            Admin
          </p>
          <p className="text-xs text-gray-500">
            Frontend Developer
          </p>
        </div>

        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <User size={18} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
