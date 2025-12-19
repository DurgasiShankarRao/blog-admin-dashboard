import { useState, useEffect } from "react";

/* Convert image file to Base64 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const emptyForm = {
  title: "",
  description: "",
  category: "",
  author: "",
  publishDate: "",
  status: "",
  image: null,
};

const BlogForm = ({
  blogs,
  setBlogs,
  editingBlog,
  setEditingBlog,
}) => {
  const [formData, setFormData] = useState(emptyForm);
  const [originalData, setOriginalData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  /* When edit button clicked */
  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        description: editingBlog.description,
        category: editingBlog.category,
        author: editingBlog.author,
        publishDate: editingBlog.publishDate,
        status: editingBlog.status,
        image: null,
      });

      setImagePreview(editingBlog.image);
      setOriginalData(editingBlog);
    }
  }, [editingBlog]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (!file) return;

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPG or PNG images allowed");
        return;
      }

      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* Preview image */
  useEffect(() => {
    if (!formData.image) return;

    const objectUrl = URL.createObjectURL(formData.image);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.image]);

  /* Detect changes (Quick Logic Task) */
  const isChanged = editingBlog
    ? JSON.stringify({
        ...formData,
        image: imagePreview,
      }) !==
      JSON.stringify({
        title: originalData?.title,
        description: originalData?.description,
        category: originalData?.category,
        author: originalData?.author,
        publishDate: originalData?.publishDate,
        status: originalData?.status,
        image: originalData?.image,
      })
    : true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Title and Description are required");
      return;
    }

    let base64Image = imagePreview;

    if (formData.image) {
      base64Image = await fileToBase64(formData.image);
    }

    if (editingBlog) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === editingBlog.id
          ? { ...blog, ...formData, image: base64Image }
          : blog
      );

      setBlogs(updatedBlogs);
      setEditingBlog(null);
    } else {
      const newBlog = {
        id: Date.now(),
        ...formData,
        image: base64Image,
        isDeleted: false,
        deletedAt: null,
      };

      setBlogs([...blogs, newBlog]);
    }

    setFormData(emptyForm);
    setImagePreview(null);
    setOriginalData(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {editingBlog ? "✏️ Edit Blog" : "➕ Add New Blog"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Left column */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <textarea
            name="description"
            placeholder="Blog Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Status</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

          <div className="border rounded-lg p-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="w-full text-sm"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={!isChanged}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isChanged
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {editingBlog ? "Update Blog" : "Save Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
