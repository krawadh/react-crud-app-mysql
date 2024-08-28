import axios from "axios";
import axiosInstance from "../config/config";

const API_URL = "http://localhost:3001/api";
// const API_URL = "http://127.0.0.1:3001/users";
export const addUser = async (data) => {
  try {
    return await axiosInstance.post(`/users`, data);
    //return await axios.post(`${API_URL}/users`, data);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};

export const getUsers = async () => {
  try {
    //console.log(`${API_URL}/users`);
    return await axiosInstance.get(`/users`);
    //return await axios.get(`${API_URL}/users`);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};

export const getUserByid = async (id) => {
  try {
    return await axiosInstance.get(`/users/${id}`);
    //return await axios.get(`${API_URL}/users/${id}`);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};

export const editUser = async (data, id) => {
  try {
    return await axiosInstance.patch(`/users/${id}`, data);
    //return await axios.patch(`${API_URL}/users/${id}`, data);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};
export const deleteUser = async (id) => {
  try {
    console.log("In api file --", id);
    return await axiosInstance.delete(`/users/${id}`);
    //return await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};

export const login = async (data) => {
  try {
    //console.log("In api file --", data);
    return await axios.post(`${API_URL}/auth/login`, data);
  } catch (error) {
    console.log("Something wrong", error.message);
  }
};
