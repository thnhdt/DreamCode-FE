// Department Asset Types
export interface AssetRequestResponse {
  id: number;
  type: "PROVISION" | "RETURN" | "MAINTENANCE";
  reason: string;
  priority: number;
  assetId?: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  notes?: string;
  createdAt: string;
  updatedAt?: string | null;
  userId?: number;
}

export interface CreateAssetRequestRequest {
  type: "PROVISION" | "RETURN" | "MAINTENANCE";
  reason: string;
  priority: number;
  assetId?: number;
}

export interface ApproveRequestRequest {
  notes?: string;
}

export interface RejectRequestRequest {
  notes: string;
}

