// Asset Types
export interface AssetResponse {
  id: number;
  name: string;
  location?: string;
  description?: string;
  status: "IN_STOCK" | "ASSIGNED" | "MAINTENANCE" | "RETIRED" | "LOST";
  imageKeys?: string[];
  purchaseDate?: string;
  value: number;
  departmentId?: number;
  categoryId?: number;
  supplierId?: number;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface CreateAssetRequest {
  name: string;
  location?: string;
  description?: string;
  status: "IN_STOCK" | "ASSIGNED" | "MAINTENANCE" | "RETIRED" | "LOST";
  imageKeys?: string[];
  purchaseDate?: string;
  value: number;
  departmentId?: number;
  categoryId?: number;
  supplierId?: number;
}

export interface AssignAssetRequest {
  assetId: number;
  userIds: number[];
  notes?: string;
  approvalNotes?: string;
}

export interface AssignAssetResponse {
  id: number;
  assetId: number;
  userIds: number[];
  notes?: string;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  approvalNotes?: string;
  createdAt: string;
  updatedAt?: string | null;
  beginTime: string;
  endTime?: string | null;
}

export interface RevokeAssetRequest {
  assetId: number;
  revokedTime: string;
  reason: string;
}

export interface RetireAssetRequest {
  assetId: number;
  retiredTime: string;
  reason: string;
  salvageValue: number;
}

export interface RevokeLog {
  id: number;
  assetId: number;
  revokedTime: string;
  reason: string;
  createdAt: string;
}

export interface RetireLog {
  id: number;
  assetId: number;
  retiredTime: string;
  reason: string;
  salvageValue: number;
  createdAt: string;
}

