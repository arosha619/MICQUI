import axios from "axios";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjQsImFkbWluX25hbWUiOiJzYWppdGgiLCJlbWFpbCI6InNhaml0aHRoaWxhbmdhOTRAZ21haWwuY29tIiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjc3MjU1MzI0MjYxLCJleHAiOjE2NzcyNTY1MzM4NjF9.SDG0zFeP2BuyPc5v1-1meoJjIryKO2YKzp4DKHPfda8"
export const registerAPI = axios.create({
    baseURL: "http://ec2-3-128-189-68.us-east-2.compute.amazonaws.com:8000/",
    timeout: 30000,
    headers: {
        "Access-Control-Allow-Origin": "*",
         Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  export const ImageAPI = axios.create({
    baseURL: "http://ec2-3-128-189-68.us-east-2.compute.amazonaws.com:8000/"
  });
  export const API = axios.create({
    baseURL: "http://ec2-3-128-189-68.us-east-2.compute.amazonaws.com:8000/"
  });
  export const createAdmin = async (formData) => {
    const res = await ImageAPI.post(`admin/register`, formData);
    return res;
  };
  export const updateAdmin = async (formData,id) => {
    const res = await registerAPI.put(`admin/update/${id}`, formData,id);
    return res;
  };
  export const updateUser = async (id, formData) => {
    const res = await registerAPI.put(`user/update/${id}`, formData);
    return res;
  };
  export const deleteUser = async (id) => {
    const res = await registerAPI.delete(`user/delete/${id}`);
    return res;
  };
  export const forgotPassword = async (email) => {
    const res = await API.post(`admin/forgotpassword`,email);
    return res;
  };
  export const getAllUsers = async () => {
    const res = await registerAPI.get(`user/getAllUser`);
    return res;
  };
  export const getadminbyID = async (id) => {
    const res = await registerAPI.get(`admin/getAdmin/${id}`,id);
    return res;
  };
  export const deleteadminbyID = async (id) => {
    const res = await API.delete(`admin/delete/${id}`,id);
    return res;
  };