import axios from "axios";

const API_URL = "http://localhost:3001/api";
// const API_URL = "http://127.0.0.1:3001/users";
export const addUser = async (data) => {
  try {
    return await axios.post(`${API_URL}/users`, data);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};

export const getUsers = async () => {
  try {
    return await axios.get(`${API_URL}/users`);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};

export const getUserByid = async (id) => {
  try {
    return await axios.get(`${API_URL}/users/${id}`);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};

export const editUser = async (data, id) => {
  try {
    return await axios.patch(`${API_URL}/users/${id}`, data);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};
export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};
