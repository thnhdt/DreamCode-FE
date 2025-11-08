import { data } from "react-router";
import axiosInstance from "../utils/axiosInstance";

const API_BACKEND_URL = "http://localhost:8080/api/admin";
const API_BACKEND_URL2 = "http://localhost:8080/api";

export async function getListDepartmentApi() {
    const res = await axiosInstance.get(
        `${API_BACKEND_URL}/departments/active`
    );
    return res;
}

export async function postDepartmentApi(data: any) {
    const res = await axiosInstance.post(
        `${API_BACKEND_URL}/departments`,
        data
    );
    return res;
}

export async function deleteDepartmentApi(data: any) {
    const res = await axiosInstance.put(
        `${API_BACKEND_URL}/departments/${data.id}`,
        data
    );
    return res;
}

export async function updateDepartmentApi(data: any) {
    const res = await axiosInstance.put(
        `${API_BACKEND_URL}/departments/${data.id}`,
        data
    );
    return res;
}

export async function getListSupplierApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/suppliers/active`);
    return res;
}

export async function createSupplierApi(data: any) {
    const res = await axiosInstance.post(`${API_BACKEND_URL}/suppliers`, data);
    return res;
}

export async function deleteSupplierApi(data: any) {
    const res = await axiosInstance.put(
        `${API_BACKEND_URL}/suppliers/${data.id}`,
        data
    );
    return res;
}

export async function getListAssetApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL2}/assets`);
    return res;
}

export async function createAssetApi(data: any) {
    const res = await axiosInstance.post(`${API_BACKEND_URL2}/assets`, data);
    return res;
}

export async function getListCategoryApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL2}/categories`);
    return res;
}

export async function createCategoryApi(data: any) {
    const res = await axiosInstance.post(
        `${API_BACKEND_URL2}/categories`,
        data
    );
    return res;
}

export async function deleteCategoryApi(data: any) {
    const res = await axiosInstance.delete(
        `${API_BACKEND_URL2}/categories/${data.id}`
    );
    return res;
}

export async function getListDeptManagerApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/dept-managers`);
    return res;
}
