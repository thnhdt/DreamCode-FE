// Re-export all admin services for backward compatibility
// Recommended: Import directly from services/admin instead
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
} from "../services/admin";

// Legacy function - kept for backward compatibility
// Use getDepartments from services/admin/departmentService instead
import { getDepartments } from "../services/admin";
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

export async function getListCategoryApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL2}/category`);
    return res;
}

export async function getListDeptManagerApi() {
    const res = await axiosInstance.get(`${API_BACKEND_URL}/dept-managers`);
    return res;
}
