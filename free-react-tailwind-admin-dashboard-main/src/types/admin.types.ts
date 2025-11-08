// User Types
export interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
  permissions: any[];
}

export interface Department {
  id: number;
  name: string;
  code?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface UserResponse {
  id: number;
  userName: string;
  avatarKey: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  roles: Role[];
  department: Department | null;
  managedDepartment: Department | null;
}

// Request Types
export interface CreateUserRequest {
  userName: string;
  password: string;
  avatarKey: string;
  isActive: boolean;
  roles: string[];
  departmentId: number;
}

export interface UpdateUserRequest {
  password?: string;
  avatarKey?: string;
  isActive?: boolean;
  roles?: string[];
  departmentId?: number;
}

export interface CreateDepartmentRequest {
  name: string;
  code?: string;
  isActive: boolean;
  managerId?: number;
}

export interface UpdateDepartmentRequest {
  name?: string;
  code?: string;
  isActive?: boolean;
  managerId?: number;
}

export interface DepartmentResponse {
  id: number;
  name: string;
  code?: string;
  isActive: boolean;
  manager: UserResponse | null;
  createdAt: string;
  updatedAt: string | null;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// Common response wrapper (if API returns data in different format)
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

