import axiosInstance from "../../utils/axiosInstance";
import { ADMIN_API_BASE_URL } from "../../config/api";
import {
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
  PaginatedResponse,
  PaginationParams,
} from "../../types/admin.types";
import { mockUsers, mockDepartments } from "../../utils/mockData";
import { apiWithMock, apiWithMockPaginated } from "../../utils/apiWithMock";

/**
 * User Service - Admin APIs for managing users
 */

/**
 * Create a new user
 * POST /api/admin/users
 */
export const createUser = async (
  data: CreateUserRequest
): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.post<UserResponse>(
      `${ADMIN_API_BASE_URL}/users`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.warn("Failed to create user, using mock data:", error);
    // Return mock user with new ID
    const newUser: UserResponse = {
      id: mockUsers.length + 1,
      userName: data.userName,
      avatarKey: data.avatarKey,
      isActive: data.isActive,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      roles: data.roles.map((roleName) => ({
        id: 1,
        name: roleName,
        description: `${roleName} role`,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        permissions: [],
      })),
      department: mockDepartments.find((d) => d.id === data.departmentId) || null,
      managedDepartment: null,
    };
    return newUser;
  }
};

/**
 * Get list of users with pagination
 * GET /api/admin/users
 */
export const getUsers = async (
  params?: PaginationParams
): Promise<PaginatedResponse<UserResponse> | UserResponse[]> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<UserResponse[] | PaginatedResponse<UserResponse>>(
        `${ADMIN_API_BASE_URL}/users`,
        { params }
      );
      return response.data;
    },
    mockUsers,
    "Failed to fetch users, using mock data"
  );
};

/**
 * Get list of active users
 * GET /api/admin/users/active
 */
export const getActiveUsers = async (
  params?: PaginationParams
): Promise<PaginatedResponse<UserResponse> | UserResponse[]> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<UserResponse[] | PaginatedResponse<UserResponse>>(
        `${ADMIN_API_BASE_URL}/users/active`,
        { params }
      );
      return response.data;
    },
    mockUsers.filter((u) => u.isActive),
    "Failed to fetch active users, using mock data"
  );
};

/**
 * Get user details by ID
 * GET /api/admin/users/{id}
 */
export const getUserById = async (id: number): Promise<UserResponse> => {
  return apiWithMock(
    async () => {
      const response = await axiosInstance.get<UserResponse>(
        `${ADMIN_API_BASE_URL}/users/${id}`
      );
      return response.data;
    },
    mockUsers.find((u) => u.id === id) || mockUsers[0],
    `Failed to fetch user ${id}, using mock data`
  );
};

/**
 * Update user information
 * PUT /api/admin/users/{id}
 */
export const updateUser = async (
  id: number,
  data: UpdateUserRequest
): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.put<UserResponse>(
      `${ADMIN_API_BASE_URL}/users/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.warn(`Failed to update user ${id}, using mock data:`, error);
    // Return updated mock user
    const mockUser = mockUsers.find((u) => u.id === id) || mockUsers[0];
    return {
      ...mockUser,
      ...(data.avatarKey && { avatarKey: data.avatarKey }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.roles && {
        roles: data.roles.map((roleName) => ({
          id: 1,
          name: roleName,
          description: `${roleName} role`,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          permissions: [],
        })),
      }),
      ...(data.departmentId && {
        department: mockDepartments.find((d) => d.id === data.departmentId) || mockUser.department,
      }),
      updatedAt: new Date().toISOString(),
    };
  }
};

