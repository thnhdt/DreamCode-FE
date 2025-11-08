import axiosInstance from "../../utils/axiosInstance";
import { ADMIN_API_BASE_URL } from "../../config/api";
import {
  UserResponse,
  PaginatedResponse,
  PaginationParams,
} from "../../types/admin.types";

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
  try {
    const response = await axiosInstance.get<UserResponse[] | PaginatedResponse<UserResponse>>(
      `${ADMIN_API_BASE_URL}/dept-managers`,
      { params }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch department managers";
    throw new Error(message);
  }
};

/**
 * Get list of active Department Managers
 * GET /api/admin/dept-managers/active
 */
export const getActiveDepartmentManagers = async (
  params?: PaginationParams
): Promise<PaginatedResponse<UserResponse> | UserResponse[]> => {
  try {
    const response = await axiosInstance.get<UserResponse[] | PaginatedResponse<UserResponse>>(
      `${ADMIN_API_BASE_URL}/dept-managers/active`,
      { params }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch active department managers";
    throw new Error(message);
  }
};

