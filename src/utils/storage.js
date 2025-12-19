const STORAGE_KEY = "blogs";

/**
 * Get blogs from LocalStorage
 */
export const getBlogs = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Save blogs to LocalStorage
 */
export const saveBlogs = (blogs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
};
