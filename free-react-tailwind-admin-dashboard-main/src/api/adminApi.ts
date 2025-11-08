import axiosInstance from "../utils/axiosInstance";

const API_BACKEND_URL = "http://localhost:8080/api/admin";

export async function getListDepartmentApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/departments`);
    return res;
}
