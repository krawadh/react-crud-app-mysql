import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Remove any existing Authorization headers
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Intercept any error responses from the API
 * and check if the token is no longer valid.
 * If the token has expired or the user is no longer
 * authenticated, logout the user.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Perform logout or any other action
      // store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
