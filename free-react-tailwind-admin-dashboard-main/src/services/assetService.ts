import axiosInstance from "../utils/axiosInstance";
import { API_BASE_URL } from "../config/api";
import {
  AssetResponse,
  CreateAssetRequest,
  AssignAssetRequest,
  AssignAssetResponse,
  RevokeAssetRequest,
  RetireAssetRequest,
  RevokeLog,
  RetireLog,
} from "../types/asset.types";
import { PaginatedResponse, PaginationParams } from "../types/admin.types";
import { mockAssets } from "../utils/mockData";
import { apiWithMock, apiWithMockPaginated } from "../utils/apiWithMock";

/**
 * Asset Service - APIs for managing assets
 */

/**
 * Get list of assets
 * GET /api/assets
 */
export const getAssets = async (
  params?: PaginationParams
): Promise<AssetResponse[] | PaginatedResponse<AssetResponse>> => {
  return apiWithMockPaginated(
    async () => {
      const response = await axiosInstance.get<AssetResponse[] | PaginatedResponse<AssetResponse>>(
        `${API_BASE_URL}/assets`,
        { params }
      );
      return response.data;
    },
    mockAssets,
    "Failed to fetch assets, using mock data"
  );
};

/**
 * Get asset details by ID
 * GET /api/assets/{id}
 */
export const getAssetById = async (id: number): Promise<AssetResponse> => {
  return apiWithMock(
    async () => {
      const response = await axiosInstance.get<AssetResponse>(
        `${API_BASE_URL}/assets/${id}`
      );
      return response.data;
    },
    mockAssets.find((a) => a.id === id) || mockAssets[0],
    `Failed to fetch asset ${id}, using mock data`
  );
};

/**
 * Create a new asset
 * POST /api/assets
 */
export const createAsset = async (
  data: CreateAssetRequest
): Promise<AssetResponse> => {
  try {
    const response = await axiosInstance.post<AssetResponse>(
      `${API_BASE_URL}/assets`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.warn("Failed to create asset, using mock data:", error);
    const newAsset: AssetResponse = {
      id: mockAssets.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    return newAsset;
  }
};

/**
 * Assign asset to users
 * POST /api/assets/assign
 */
export const assignAsset = async (
  data: AssignAssetRequest
): Promise<AssignAssetResponse> => {
  try {
    const response = await axiosInstance.post<AssignAssetResponse>(
      `${API_BASE_URL}/assets/assign`,
      data
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to assign asset";
    throw new Error(message);
  }
};

/**
 * Revoke asset from users
 * POST /api/assets/revoke
 */
export const revokeAsset = async (
  data: RevokeAssetRequest
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>(
      `${API_BASE_URL}/assets/revoke`,
      data
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to revoke asset";
    throw new Error(message);
  }
};

/**
 * Retire asset
 * POST /api/assets/retire
 */
export const retireAsset = async (
  data: RetireAssetRequest
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>(
      `${API_BASE_URL}/assets/retire`,
      data
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to retire asset";
    throw new Error(message);
  }
};

/**
 * Get revoke logs for an asset
 * GET /api/assets/{id}/revoke-logs
 */
export const getRevokeLogs = async (
  id: number
): Promise<RevokeLog[]> => {
  try {
    const response = await axiosInstance.get<RevokeLog[]>(
      `${API_BASE_URL}/assets/${id}/revoke-logs`
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch revoke logs";
    throw new Error(message);
  }
};

/**
 * Get retire logs for an asset
 * GET /api/assets/{id}/retire-logs
 */
export const getRetireLogs = async (
  id: number
): Promise<RetireLog[]> => {
  try {
    const response = await axiosInstance.get<RetireLog[]>(
      `${API_BASE_URL}/assets/${id}/retire-logs`
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch retire logs";
    throw new Error(message);
  }
};

