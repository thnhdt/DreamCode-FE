import { data } from "react-router";
import axiosInstance from "../utils/axiosInstance";
import { CreateDepartmentRequest } from "../types/admin.types";

// API endpoints - sử dụng proxy thay vì localhost:8080
const API_BACKEND_URL = "/api/admin";
const API_BACKEND_URL2 = "/api";

// ============================================================
// RE-EXPORTS FROM SERVICES (Recommended approach)
// ============================================================
export {
    // User services
    createUser,
    getUsers,
    getActiveUsers,
    getUserById,
    updateUser,

    // Department Manager services
    getDepartmentManagers,
    getActiveDepartmentManagers,

    // Department services
    createDepartment,
    getDepartments,
    getActiveDepartments,
    getDepartmentById,
    updateDepartment,

    // Supplier services
    getSuppliers,
    getActiveSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
} from "../services/admin";

// Re-export asset services
export { getAssets, getAssetById, createAsset } from "../services/assetService";

// ============================================================
// LEGACY APIs (Deprecated - for backward compatibility)
// ============================================================

/**
 * Get list of departments
 * @deprecated Use getDepartments from services/admin instead
 */
export async function getListDepartmentApi() {
    const res = await axiosInstance.get(
        `${API_BACKEND_URL}/departments/active`
    );
    return res;
}

/**
 * Create a new department
 * @deprecated Use createDepartment from services/admin instead
 */
export async function postListDepartmentApi(data: CreateDepartmentRequest) {
    const res = await axiosInstance.post(
        `${API_BACKEND_URL}/departments`,
        data
    );
    return res;
}

/**
 * Delete/Update department
 */
export async function deleteDepartmentApi(data: any) {
    const res = await axiosInstance.put(
        `${API_BACKEND_URL}/departments/${data.id}`,
        data
    );
    return res;
}

/**
 * Create new department
 * @deprecated Use createDepartment from services/admin/departmentService instead
 */
export async function postDepartmentApi(data: CreateDepartmentRequest) {
    const res = await axiosInstance.post(
        `${API_BACKEND_URL}/departments`,
        data
    );
    return res;
}

// ============================================================
// SUPPLIER APIs
// ============================================================

/**
 * Get list of suppliers
 * @deprecated Use getSuppliers from services/admin instead
 */
export async function getListSupplierApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/suppliers/active`);
    return res;
}

/**
 * Create new supplier
 */
export async function createSupplierApi(data: any) {
    const res = await axiosInstance.post(`${API_BACKEND_URL}/suppliers`, data);
    return res;
}

/**
 * Delete/Update supplier
 */
export async function deleteSupplierApi(data: any) {
    const res = await axiosInstance.put(
        `${API_BACKEND_URL}/suppliers/${data.id}`,
        data
    );
    return res;
}

// ============================================================
// ASSET APIs
// ============================================================

/**
 * Get list of assets
 * @deprecated Use getAssets from services/assetService instead
 */
export async function getListAssetApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL2}/assets`);
    return res;
}

export async function createAssetApi(data: any) {
    const res = await axiosInstance.post(`${API_BACKEND_URL2}/assets`, data);
    return res;
}

export async function deleteAssetApi(data: any) {
    const res = await axiosInstance.delete(
        `${API_BACKEND_URL2}/assets/${data.id}`
    );
    return res;
}

export async function assignAssetApi(data: any) {
    const res = await axiosInstance.post(
        `${API_BACKEND_URL2}/assets/assign`,
        data
    );
    return res;
}

export async function revokeAssetApi(data: any) {
    const res = await axiosInstance.post(
        `${API_BACKEND_URL2}/assets/revoke`,
        data
    );
    return res;
}

export async function getListCategoryApi() {
    try {
        const response = await axiosInstance.get(
            `${API_BACKEND_URL2}/categories`
        );
        return response.data;
    } catch (error) {
        console.warn("Failed to fetch categories, using mock data:", error);
        // Mock data fallback
        return [
            {
                id: 1,
                name: "Thiết bị CNTT",
                code: "IT_EQUIPMENT",
                description: "Thiết bị công nghệ thông tin",
            },
            {
                id: 2,
                name: "Thiết bị văn phòng",
                code: "OFFICE_EQUIPMENT",
                description: "Thiết bị văn phòng",
            },
            {
                id: 3,
                name: "Nội thất",
                code: "FURNITURE",
                description: "Nội thất văn phòng",
            },
            {
                id: 4,
                name: "Thiết bị mạng",
                code: "NETWORK_EQUIPMENT",
                description: "Thiết bị mạng",
            },
        ];
    }
}

/**
 * Create new category
 */
export async function createCategoryApi(data: any) {
    const res = await axiosInstance.post(
        `${API_BACKEND_URL2}/categories`,
        data
    );
    return res;
}

/**
 * Delete category
 */
export async function deleteCategoryApi(data: any) {
    const res = await axiosInstance.delete(
        `${API_BACKEND_URL2}/categories/${data.id}`
    );
    return res;
}

// ============================================================
// DEPARTMENT MANAGER APIs
// ============================================================

/**
 * Get list of department managers
 * @deprecated Use getDepartmentManagers from services/admin instead
 */
export async function getListDeptManagerApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/dept-managers`);
    return res;
}
