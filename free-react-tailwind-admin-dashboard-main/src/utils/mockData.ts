// Mock data for fallback when API calls fail
import { UserResponse } from "../types/admin.types";
import { SupplierResponse } from "../types/supplier.types";
import { AssetResponse } from "../types/asset.types";
import { DepartmentResponse } from "../types/admin.types";

// Mock Users
export const mockUsers: UserResponse[] = [
  {
    id: 1,
    userName: "admin",
    avatarKey: "avatar_001.png",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: null,
    roles: [
      {
        id: 1,
        name: "ADMIN",
        description: "Administrator role",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: null,
        permissions: [],
      },
    ],
    department: {
      id: 1,
      name: "IT Department",
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: null,
    },
    managedDepartment: null,
  },
  {
    id: 2,
    userName: "user1",
    avatarKey: "avatar_002.png",
    isActive: true,
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: null,
    roles: [
      {
        id: 2,
        name: "USER",
        description: "Standard user role",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: null,
        permissions: [],
      },
    ],
    department: {
      id: 2,
      name: "Sales Department",
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: null,
    },
    managedDepartment: null,
  },
];

// Mock Suppliers
export const mockSuppliers: SupplierResponse[] = [
  {
    id: 1,
    name: "Công ty TNHH Thiết bị Văn phòng ABC",
    taxCode: "1234567890",
    description: "Nhà cung cấp thiết bị văn phòng hàng đầu",
    email: "info@abc.vn",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    isActive: true,
    createdAt: "2024-01-10T00:00:00.000Z",
    updatedAt: null,
  },
  {
    id: 2,
    name: "Công ty Cổ phần Máy tính XYZ",
    taxCode: "0987654321",
    description: "Chuyên cung cấp máy tính và thiết bị IT",
    email: "contact@xyz.com",
    address: "456 Đường XYZ, Quận 3, TP. HCM",
    isActive: true,
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: null,
  },
];

// Mock Assets
export const mockAssets: AssetResponse[] = [
  {
    id: 1,
    name: "Laptop Dell XPS 15",
    location: "Office Room 301",
    description: "High-performance laptop for development",
    status: "ASSIGNED",
    value: 25000000,
    purchaseDate: "2024-01-15T00:00:00.000Z",
    departmentId: 1,
    categoryId: 1,
    supplierId: 1,
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: null,
  },
  {
    id: 2,
    name: "Máy in HP LaserJet",
    location: "Office Room 201",
    description: "Office printer",
    status: "IN_STOCK",
    value: 8000000,
    purchaseDate: "2024-02-10T00:00:00.000Z",
    departmentId: 2,
    categoryId: 2,
    supplierId: 1,
    createdAt: "2024-02-10T00:00:00.000Z",
    updatedAt: null,
  },
];

// Mock Departments
export const mockDepartments: DepartmentResponse[] = [
  {
    id: 1,
    name: "IT Department",
    code: "IT",
    isActive: true,
    manager: mockUsers[0],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: null,
  },
  {
    id: 2,
    name: "Sales Department",
    code: "SALES",
    isActive: true,
    manager: mockUsers[1],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: null,
  },
  {
    id: 9,
    name: "Financial Department",
    code: "FIN",
    isActive: true,
    manager: mockUsers[0],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: null,
  },
];

