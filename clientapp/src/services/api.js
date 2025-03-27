import axios from "axios";

const API_URL = "http://localhost:5003/api/Freelancer"; 

const api = {
    getUsers: () => axios.get(API_URL),
    addUser: (user) => axios.post(API_URL, user),
    updateUser: (id, user) => axios.put(`${API_URL}/${id}`, user),
    deleteUser: (id) => axios.delete(`${API_URL}/${id}`),
};

export default api;
