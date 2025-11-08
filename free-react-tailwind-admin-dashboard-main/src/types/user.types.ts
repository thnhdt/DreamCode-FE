// User API Types
export interface AccidentLogResponse {
  id: number;
  assetId: number;
  title: string;
  description: string;
  imageKeys?: string[];
  status?: string;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateAccidentRequest {
  assetId: number;
  title: string;
  description: string;
  imageKeys?: string[];
}

