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

// Legacy functions - kept for backward compatibility
// These functions now use the proper services with mock fallback support
import { getDepartments, createDepartment } from "../services/admin";
import { getSuppliers } from "../services/admin";
import { getAssets } from "../services/assetService";
import { getDepartmentManagers } from "../services/admin";
import axiosInstance from "../utils/axiosInstance";
import { API_BASE_URL } from "../config/api";
import { CreateDepartmentRequest } from "../types/admin.types";

/**
 * Get list of departments
 * @deprecated Use getDepartments from services/admin/departmentService instead
 */
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
/**
 * Create a new department
 * @deprecated Use createDepartment from services/admin/departmentService instead
 */
export async function postListDepartmentApi(data: CreateDepartmentRequest) {
  return await createDepartment(data);
}

/**
 * Get list of suppliers
 * @deprecated Use getSuppliers from services/admin/supplierService instead
 */
export async function getListSupplierApi() {
  return await getSuppliers();
}

/**
 * Get list of assets
 * @deprecated Use getAssets from services/assetService instead
 */
export async function getListAssetApi() {
  return await getAssets();
}

/**
 * Get list of categories
 * Note: Category service not yet implemented, using mock fallback
 */
export async function getListCategoryApi() {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/category`);
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch categories, using mock data:", error);
    // Return mock categories
    return [
      { id: 1, name: "Thiết bị CNTT", code: "IT_EQUIPMENT", description: "Thiết bị công nghệ thông tin" },
      { id: 2, name: "Thiết bị văn phòng", code: "OFFICE_EQUIPMENT", description: "Thiết bị văn phòng" },
      { id: 3, name: "Nội thất", code: "FURNITURE", description: "Nội thất văn phòng" },
      { id: 4, name: "Thiết bị mạng", code: "NETWORK_EQUIPMENT", description: "Thiết bị mạng" },
    ];
  }
}

/**
 * Get list of department managers
 * @deprecated Use getDepartmentManagers from services/admin/departmentManagerService instead
 */
export async function getListDeptManagerApi() {
  return await getDepartmentManagers();
}
