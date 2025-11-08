// Supplier Types
export interface SupplierResponse {
  id: number;
  name: string;
  taxCode: string;
  description?: string;
  email: string;
  address: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface CreateSupplierRequest {
  name: string;
  taxCode: string;
  description?: string;
  email: string;
  address: string;
  isActive: boolean;
}

export interface UpdateSupplierRequest {
  description?: string;
  email?: string;
  address?: string;
  isActive?: boolean;
}

