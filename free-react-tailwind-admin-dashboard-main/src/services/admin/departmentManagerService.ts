import axiosInstance from "../../utils/axiosInstance";
import { ADMIN_API_BASE_URL } from "../../config/api";
import {
  UserResponse,
  PaginatedResponse,
  PaginationParams,
} from "../../types/admin.types";
import { mockUsers } from "../../utils/mockData";
import { apiWithMockPaginated } from "../../utils/apiWithMock";

/**
 * Department Manager Service - Admin APIs for managing department managers
 */

/**
 * Get list of Department Managers with pagination
 * GET /api/admin/dept-managers
 */
export const getDepartmentManagers = async (
  params?: PaginationParams
): Promise<PaginatedResponse<UserResponse> | UserResponse[]> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<UserResponse[] | PaginatedResponse<UserResponse>>(
        `${ADMIN_API_BASE_URL}/dept-managers`,
        { params }
      );
      return response.data;
    },
    // Filter users with DEPT_MANAGER role for mock data
    mockUsers.filter((u) => u.roles.some((r) => r.name === "DEPT_MANAGER")) || mockUsers,
    "Failed to fetch department managers, using mock data"
  );
};

/**
 * Get list of active Department Managers
 * GET /api/admin/dept-managers/active
 */
export const getActiveDepartmentManagers = async (
  params?: PaginationParams
): Promise<PaginatedResponse<UserResponse> | UserResponse[]> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<UserResponse[] | PaginatedResponse<UserResponse>>(
        `${ADMIN_API_BASE_URL}/dept-managers/active`,
        { params }
      );
      return response.data;
    },
    // Filter active users with DEPT_MANAGER role for mock data
    mockUsers.filter(
      (u) => u.isActive && u.roles.some((r) => r.name === "DEPT_MANAGER")
    ) || mockUsers.filter((u) => u.isActive),
    "Failed to fetch active department managers, using mock data"
  );
};

