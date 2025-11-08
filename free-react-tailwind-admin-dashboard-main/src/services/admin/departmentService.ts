import axiosInstance from "../../utils/axiosInstance";
import { ADMIN_API_BASE_URL } from "../../config/api";
import {
  DepartmentResponse,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  PaginatedResponse,
  PaginationParams,
} from "../../types/admin.types";
import { mockDepartments, mockUsers } from "../../utils/mockData";
import { apiWithMock, apiWithMockPaginated } from "../../utils/apiWithMock";

/**
 * Department Service - Admin APIs for managing departments
 */

/**
 * Create a new department
 * POST /api/admin/departments
 */
export const createDepartment = async (
  data: CreateDepartmentRequest
): Promise<DepartmentResponse> => {
  try {
    const response = await axiosInstance.post<DepartmentResponse>(
      `${ADMIN_API_BASE_URL}/departments/active`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.warn("Failed to create department, using mock data:", error);
    const manager = data.managerId ? mockUsers.find((u) => u.id === data.managerId) : mockUsers[0];
    const newDept: DepartmentResponse = {
      id: mockDepartments.length + 1,
      name: data.name,
      code: data.code || `DEPT${mockDepartments.length + 1}`,
      isActive: data.isActive !== undefined ? data.isActive : true,
      manager: manager || null,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    return newDept;
  }
};

/**
 * Get list of departments with pagination
 * GET /api/admin/departments
 */
export const getDepartments = async (
  params?: PaginationParams
): Promise<PaginatedResponse<DepartmentResponse> | DepartmentResponse[]> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<DepartmentResponse[] | PaginatedResponse<DepartmentResponse>>(
        `${ADMIN_API_BASE_URL}/departments/active`,
        { params }
      );
      return response.data;
    },
    mockDepartments,
    "Failed to fetch departments, using mock data"
  );
};

/**
 * Get list of active departments
 * GET /api/admin/departments/active
 */
export const getActiveDepartments = async (
  params?: PaginationParams
): Promise<PaginatedResponse<DepartmentResponse> | DepartmentResponse[]> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<DepartmentResponse[] | PaginatedResponse<DepartmentResponse>>(
        `${ADMIN_API_BASE_URL}/departments/active`,
        { params }
      );
      return response.data;
    },
    mockDepartments.filter((d) => d.isActive),
    "Failed to fetch active departments, using mock data"
  );
};

/**
 * Get department details by ID
 * GET /api/admin/departments/{id}
 */
export const getDepartmentById = async (id: number): Promise<DepartmentResponse> => {
  return apiWithMock(
    async () => {
      const response = await axiosInstance.get<DepartmentResponse>(
        `${ADMIN_API_BASE_URL}/departments/${id}`
      );
      return response.data;
    },
    mockDepartments.find((d) => d.id === id) || mockDepartments[0],
    `Failed to fetch department ${id}, using mock data`
  );
};

/**
 * Update department information
 * PUT /api/admin/departments/{id}
 */
export const updateDepartment = async (
  id: number,
  data: UpdateDepartmentRequest
): Promise<DepartmentResponse> => {
  try {
    const response = await axiosInstance.put<DepartmentResponse>(
      `${ADMIN_API_BASE_URL}/departments/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.warn(`Failed to update department ${id}, using mock data:`, error);
    const mockDept = mockDepartments.find((d) => d.id === id) || mockDepartments[0];
    const manager = data.managerId ? mockUsers.find((u) => u.id === data.managerId) : mockDept.manager;
    return {
      ...mockDept,
      ...(data.name && { name: data.name }),
      ...(data.code && { code: data.code }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(manager && { manager }),
      updatedAt: new Date().toISOString(),
    };
  }
};

