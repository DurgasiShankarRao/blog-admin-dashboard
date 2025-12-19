import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 5;

const BlogList = ({ blogs, setBlogs, setEditingBlog }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Soft delete
  const handleDelete = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id
        ? { ...blog, isDeleted: true, deletedAt: Date.now() }
        : blog
    );
    setBlogs(updatedBlogs);
  };

  // Hide deleted blogs
  const visibleBlogs = blogs.filter(
    (blog) => !blog.isDeleted
  );

  // Search + Filter
  const filteredBlogs = visibleBlogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      blog.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(
    filteredBlogs.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (filteredBlogs.length === 0) {
    return (
      <p className="text-gray-500 mt-6 text-center">
        No blogs found.
      </p>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 p-5 border-b bg-gray-50">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>

      {/* 📋 Table */}
      <table className="w-full">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedBlogs.map((blog) => (
            <tr
              key={blog.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                )}
              </td>

              <td className="px-4 py-3 font-medium text-gray-800">
                {blog.title}
              </td>

              <td className="px-4 py-3 text-gray-600">
                {blog.category}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    blog.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {blog.status}
                </span>
              </td>

              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => setEditingBlog(blog)}
                  className="px-4 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog.id)}
                  className="px-4 py-1.5 rounded-md border border-red-500 text-red-600 text-sm hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔢 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 p-5 bg-gray-50 border-t">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((p) => p - 1)
            }
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-40 hover:bg-gray-100"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((p) => p + 1)
            }
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-40 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
