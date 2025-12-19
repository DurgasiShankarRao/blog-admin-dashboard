import { Home, FileText, X } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white border-r transform transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <span className="text-xl font-bold text-blue-600">
            Blog Admin
          </span>
          <button
            onClick={onClose}
            className="md:hidden"
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
            <Home size={18} />
            Dashboard
          </div>

          <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
            <FileText size={18} />
            Blogs
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
