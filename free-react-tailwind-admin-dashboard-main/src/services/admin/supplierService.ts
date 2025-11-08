import axiosInstance from "../../utils/axiosInstance";
import { ADMIN_API_BASE_URL } from "../../config/api";
import {
  SupplierResponse,
  CreateSupplierRequest,
  UpdateSupplierRequest,
  PaginatedResponse,
  PaginationParams,
} from "../../types/supplier.types";
import { mockSuppliers } from "../../utils/mockData";
import { apiWithMock, apiWithMockPaginated } from "../../utils/apiWithMock";

/**
 * Supplier Service - Admin APIs for managing suppliers
 */

/**
 * Create a new supplier
 * POST /api/admin/suppliers
 */
export const createSupplier = async (
  data: CreateSupplierRequest
): Promise<SupplierResponse> => {
  try {
    const response = await axiosInstance.post<SupplierResponse>(
      `${ADMIN_API_BASE_URL}/suppliers`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.warn("Failed to create supplier, using mock data:", error);
    // Return mock supplier with new ID
    const newSupplier: SupplierResponse = {
      id: mockSuppliers.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    return newSupplier;
  }
};

/**
 * Get list of suppliers with pagination
 * GET /api/admin/suppliers
 */
export const getSuppliers = async (
  params?: PaginationParams
): Promise<PaginatedResponse<SupplierResponse> | SupplierResponse[]> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<SupplierResponse[] | PaginatedResponse<SupplierResponse>>(
        `${ADMIN_API_BASE_URL}/suppliers`,
        { params }
      );
      return response.data;
    },
    mockSuppliers,
    "Failed to fetch suppliers, using mock data"
  );
};

/**
 * Get list of active suppliers
 * GET /api/admin/suppliers/active
 */
export const getActiveSuppliers = async (
  params?: PaginationParams
): Promise<PaginatedResponse<SupplierResponse> | SupplierResponse[]> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<SupplierResponse[] | PaginatedResponse<SupplierResponse>>(
        `${ADMIN_API_BASE_URL}/suppliers/active`,
        { params }
      );
      return response.data;
    },
    mockSuppliers.filter((s) => s.isActive),
    "Failed to fetch active suppliers, using mock data"
  );
};

/**
 * Get supplier details by ID
 * GET /api/admin/suppliers/{id}
 */
export const getSupplierById = async (id: number): Promise<SupplierResponse> => {
  return apiWithMock(
    async () => {
      const response = await axiosInstance.get<SupplierResponse>(
        `${ADMIN_API_BASE_URL}/suppliers/${id}`
      );
      return response.data;
    },
    mockSuppliers.find((s) => s.id === id) || mockSuppliers[0],
    `Failed to fetch supplier ${id}, using mock data`
  );
};

/**
 * Update supplier information
 * PUT /api/admin/suppliers/{id}
 */
export const updateSupplier = async (
  id: number,
  data: UpdateSupplierRequest
): Promise<SupplierResponse> => {
  try {
    const response = await axiosInstance.put<SupplierResponse>(
      `${ADMIN_API_BASE_URL}/suppliers/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.warn(`Failed to update supplier ${id}, using mock data:`, error);
    // Return updated mock supplier
    const mockSupplier = mockSuppliers.find((s) => s.id === id) || mockSuppliers[0];
    return {
      ...mockSupplier,
      ...data,
      updatedAt: new Date().toISOString(),
    };
  }
};

/**
 * Delete supplier
 * DELETE /api/admin/suppliers/{id}
 */
export const deleteSupplier = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(
      `${ADMIN_API_BASE_URL}/suppliers/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.warn(`Failed to delete supplier ${id}, using mock response:`, error);
    return { message: "Supplier deleted (mock)" };
  }
};

