import axios from "axios";

export const client = axios.create({
  baseURL: "https://65b795b246324d531d54faef.mockapi.io/users/users/",
  // baseURL: "https://reqres.in/api",
});

export const getUsers = () => {
  return client.get("");
  // return client.get("/users");
};

export const deleteUser = (userId) => {
  return client.delete(`/${userId}`);
  // return client.delete(`/users/${userId}`);
};

export const createUser = (userData) => {
  return client.post("", userData);
  // return client.post("/users", userData);
};
