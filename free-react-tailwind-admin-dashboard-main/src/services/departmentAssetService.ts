import axiosInstance from "../utils/axiosInstance";
import { API_BASE_URL } from "../config/api";
import {
  AssetRequestResponse,
  CreateAssetRequestRequest,
  ApproveRequestRequest,
  RejectRequestRequest,
} from "../types/department-asset.types";
import { AssetResponse } from "../types/asset.types";
import { PaginatedResponse, PaginationParams } from "../types/admin.types";
import { mockAssets } from "../utils/mockData";
import { apiWithMock, apiWithMockPaginated } from "../utils/apiWithMock";

/**
 * Department Asset Service - APIs for department asset management
 */

/**
 * Get list of assets in department
 * GET /api/department/assets
 */
export const getDepartmentAssets = async (
  params?: PaginationParams
): Promise<PaginatedResponse<AssetResponse>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<AssetResponse>>(
      `${API_BASE_URL}/department/assets`,
      { params }
    );
    return response.data;
  } catch (error: any) {
    console.warn("Failed to fetch department assets, using mock data:", error);
    return {
      data: mockAssets,
      totalElements: mockAssets.length,
      totalPages: 1,
      page: 0,
      size: 10,
    };
  }
};

/**
 * Get department asset details by ID
 * GET /api/department/assets/{assetId}
 */
export const getDepartmentAssetById = async (assetId: number): Promise<AssetResponse> => {
  return apiWithMock(
    async () => {
      const response = await axiosInstance.get<AssetResponse>(
        `${API_BASE_URL}/department/assets/${assetId}`
      );
      return response.data;
    },
    mockAssets.find((a) => a.id === assetId) || mockAssets[0],
    `Failed to fetch department asset ${assetId}, using mock data`
  );
};

/**
 * Create a new asset request
 * POST /api/department/requests
 */
export const createAssetRequest = async (
  data: CreateAssetRequestRequest
): Promise<AssetRequestResponse> => {
  try {
    const response = await axiosInstance.post<AssetRequestResponse>(
      `${API_BASE_URL}/department/requests`,
      data
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to create asset request";
    throw new Error(message);
  }
};

/**
 * Get list of requests for current user
 * GET /api/department/requests
 */
export const getAssetRequests = async (
  params?: PaginationParams
): Promise<PaginatedResponse<AssetRequestResponse>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<AssetRequestResponse>>(
      `${API_BASE_URL}/department/requests`,
      { params }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch asset requests";
    throw new Error(message);
  }
};

/**
 * Get list of pending requests from users in department
 * GET /api/department/user-requests
 */
export const getUserRequests = async (
  params?: PaginationParams
): Promise<PaginatedResponse<AssetRequestResponse>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<AssetRequestResponse>>(
      `${API_BASE_URL}/department/user-requests`,
      { params }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch user requests";
    throw new Error(message);
  }
};

/**
 * Approve a user request
 * POST /api/department/user-requests/{id}/approve
 */
export const approveUserRequest = async (
  id: number,
  data?: ApproveRequestRequest
): Promise<AssetRequestResponse> => {
  try {
    const response = await axiosInstance.post<AssetRequestResponse>(
      `${API_BASE_URL}/department/user-requests/${id}/approve`,
      data || {}
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to approve request";
    throw new Error(message);
  }
};

/**
 * Reject a user request
 * POST /api/department/user-requests/{id}/reject
 */
export const rejectUserRequest = async (
  id: number,
  data: RejectRequestRequest
): Promise<AssetRequestResponse> => {
  try {
    const response = await axiosInstance.post<AssetRequestResponse>(
      `${API_BASE_URL}/department/user-requests/${id}/reject`,
      data
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to reject request";
    throw new Error(message);
  }
};

