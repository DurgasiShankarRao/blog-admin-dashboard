import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

const ONE_DAY = 24 * 60 * 60 * 1000;

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];

    const now = Date.now();
    const purgedBlogs = storedBlogs.filter((blog) => {
      if (!blog.isDeleted) return true;
      return now - blog.deletedAt < ONE_DAY;
    });

    setBlogs(purgedBlogs);
    localStorage.setItem("blogs", JSON.stringify(purgedBlogs));
  }, []);

  const updateBlogs = (updatedBlogs) => {
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 space-y-6">
          <BlogForm
            blogs={blogs}
            setBlogs={updateBlogs}
            editingBlog={editingBlog}
            setEditingBlog={setEditingBlog}
          />

          <BlogList
            blogs={blogs}
            setBlogs={updateBlogs}
            setEditingBlog={setEditingBlog}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
