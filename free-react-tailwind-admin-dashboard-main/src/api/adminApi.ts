// Re-export all admin services for backward compatibility
// ✅ Recommended: Import directly from services/admin instead
const API_BACKEND_URL = "http://localhost:8080/api/admin";
const API_BACKEND_URL2 = "http://localhost:8080/api";
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
  
  // Legacy (deprecated) APIs for backward compatibility
  import axiosInstance from "../utils/axiosInstance";
  import { API_BASE_URL } from "../config/api";
  import { CreateDepartmentRequest } from "../types/admin.types";
  import { getDepartments, createDepartment, getDepartmentManagers, getSuppliers } from "../services/admin";
  import { getAssets } from "../services/assetService";
  
  /**
   * Get list of departments
   * @deprecated Use getDepartments from services/admin instead
   */
  export async function getListDepartmentApi() {
    const res = await axiosInstance.get(`${API_BASE_URL}/admin/departments/active`);
    return res;
  }
  
  /**
   * Create a new department
   * @deprecated Use createDepartment from services/admin instead
   */
  export async function postListDepartmentApi(data: CreateDepartmentRequest) {
    return await createDepartment(data);
  }
  
  /**
   * Delete department
   */
  export async function deleteDepartmentApi(data: any) {
    const res = await axiosInstance.put(`${API_BASE_URL}/admin/departments/${data.id}`, data);
    return res;
  }
  
  /**
   * Get list of suppliers
   * @deprecated Use getSuppliers from services/admin instead
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
   * Get list of categories (mock fallback)
   */
  export async function getListCategoryApi() {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/category`);
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch categories, using mock data:", error);
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
   * @deprecated Use getDepartmentManagers from services/admin instead
   */
  // export async function getListDeptManagerApi() {
  //   return await getDepartmentManagers();
  // }


/**
 * Create new department
 * @deprecated Use createDepartment from services/admin/departmentService instead
 */
export async function postDepartmentApi(data: CreateDepartmentRequest) {
  // bạn có thể dùng API cũ hoặc redirect sang service mới
  // return await createDepartment(data);
  const res = await axiosInstance.post(`${API_BASE_URL}/departments`, data);
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

// export async function getListAssetApi() {
//     const res = await axiosInstance.get(`${API_BACKEND_URL2}/assets`);
//     return res;
// }

// export async function getListCategoryApi() {
//     const res = await axiosInstance.get(`${API_BACKEND_URL2}/categories`);
//     return res;
// }

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
