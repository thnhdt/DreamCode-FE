import axiosInstance from "../utils/axiosInstance";
import { API_BASE_URL } from "../config/api";
import { UserResponse, PaginatedResponse, PaginationParams } from "../types/admin.types";
import { AssetResponse } from "../types/asset.types";
import {
  AccidentLogResponse,
  CreateAccidentRequest,
} from "../types/user.types";
import { mockUsers, mockAssets } from "../utils/mockData";
import { apiWithMock, apiWithMockPaginated } from "../utils/apiWithMock";

/**
 * User Service - APIs for user operations
 */

/**
 * Get current user profile
 * GET /api/user/me
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  return apiWithMock(
    async () => {
      const response = await axiosInstance.get<UserResponse>(
        `${API_BASE_URL}/user/me`
      );
      return response.data;
    },
    mockUsers[0],
    "Failed to fetch user profile, using mock data"
  );
};

/**
 * Get list of assets assigned to current user
 * GET /api/user/my-assets
 */
export const getMyAssets = async (
  params?: PaginationParams
): Promise<PaginatedResponse<AssetResponse>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<AssetResponse>>(
      `${API_BASE_URL}/user/my-assets`,
      { params }
    );
    return response.data;
  } catch (error: any) {
    console.warn("Failed to fetch my assets, using mock data:", error);
    // Return mock assets with ASSIGNED status
    return {
      data: mockAssets.filter((a) => a.status === "ASSIGNED"),
      totalElements: mockAssets.filter((a) => a.status === "ASSIGNED").length,
      totalPages: 1,
      page: 0,
      size: 10,
    };
  }
};

/**
 * Get asset details assigned to current user
 * GET /api/user/my-assets/{assetId}
 */
export const getMyAssetById = async (assetId: number): Promise<AssetResponse> => {
  return apiWithMock(
    async () => {
      const response = await axiosInstance.get<AssetResponse>(
        `${API_BASE_URL}/user/my-assets/${assetId}`
      );
      return response.data;
    },
    mockAssets.find((a) => a.id === assetId && a.status === "ASSIGNED") || mockAssets[0],
    `Failed to fetch my asset ${assetId}, using mock data`
  );
};

/**
 * Report an accident for an asset
 * POST /api/user/accidents
 */
export const reportAccident = async (
  data: CreateAccidentRequest
): Promise<AccidentLogResponse> => {
  try {
    const response = await axiosInstance.post<AccidentLogResponse>(
      `${API_BASE_URL}/user/accidents`,
      data
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to report accident";
    throw new Error(message);
  }
};

/**
 * Get list of accident logs for current user
 * GET /api/user/accidents
 */
export const getAccidents = async (
  params?: PaginationParams
): Promise<PaginatedResponse<AccidentLogResponse>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<AccidentLogResponse>>(
      `${API_BASE_URL}/user/accidents`,
      { params }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch accidents";
    throw new Error(message);
  }
};

/**
 * Get accident log details
 * GET /api/user/accidents/{accidentId}
 */
export const getAccidentById = async (accidentId: number): Promise<AccidentLogResponse> => {
  try {
    const response = await axiosInstance.get<AccidentLogResponse>(
      `${API_BASE_URL}/user/accidents/${accidentId}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("Bad request");
    }
    const message = error.response?.data?.message || "Failed to fetch accident";
    throw new Error(message);
  }
};

