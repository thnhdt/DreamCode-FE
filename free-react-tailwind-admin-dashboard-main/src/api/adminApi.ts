import axiosInstance from "../utils/axiosInstance";

const API_BACKEND_URL = "http://localhost:8080/api/admin";
const API_BACKEND_URL2 = "http://localhost:8080/api";

export async function getListDepartmentApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/departments`);
    return res;
}

export async function postListDepartmentApi(data: any) {
    const res = await axiosInstance.post(
        `${API_BACKEND_URL}/departments`,
        data
    );
    return res;
}

export async function getListSupplierApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/suppliers`);
    return res;
}

export async function getListAssetApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL2}/assets`);
    return res;
}

export async function getListCategoryApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL2}/category`);
    return res;
}

export async function getListDeptManagerApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/dept-managers`);
    return res;
}
