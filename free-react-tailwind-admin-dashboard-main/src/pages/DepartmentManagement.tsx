import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import Button from "../components/ui/button/Button";

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

// Mock data
const initialDepartments: Department[] = [
  {
    id: "DEPT001",
    name: "Kế toán",
    description: "Phòng ban chịu trách nhiệm về tài chính, kế toán",
    manager: "Nguyễn Văn A",
    employeeCount: 15,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "DEPT002",
    name: "IT",
    description: "Phòng ban Công nghệ thông tin",
    manager: "Trần Thị B",
    employeeCount: 25,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "DEPT003",
    name: "Nhân sự",
    description: "Phòng ban quản lý nhân sự",
    manager: "Lê Văn C",
    employeeCount: 8,
    status: "active",
    createdAt: "2024-02-01",
  },
  {
    id: "DEPT004",
    name: "Kinh doanh",
    description: "Phòng ban kinh doanh và bán hàng",
    manager: "Phạm Thị D",
    employeeCount: 20,
    status: "inactive",
    createdAt: "2023-12-20",
  },
  {
    id: "DEPT005",
    name: "Sản xuất",
    description: "Phòng ban sản xuất và vận hành",
    manager: "Hoàng Văn E",
    employeeCount: 45,
    status: "active",
    createdAt: "2024-01-05",
  },
];

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock API call
  const fetchDepartments = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Get data from localStorage or use initial data
      const storedData = localStorage.getItem("departments");
      if (storedData) {
        setDepartments(JSON.parse(storedData) as Department[]);
      } else {
        setDepartments(initialDepartments);
        localStorage.setItem("departments", JSON.stringify(initialDepartments));
      }
    } catch (err) {
      setError("Không thể tải dữ liệu phòng ban");
      console.error("Error fetching departments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const updatedDepartments = departments.map((dept) =>
        dept.id === id
          ? { ...dept, status: (dept.status === "active" ? "inactive" : "active") as "active" | "inactive" }
          : dept
      );
      setDepartments(updatedDepartments);
      localStorage.setItem("departments", JSON.stringify(updatedDepartments));
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch {
      setError("Không thể cập nhật trạng thái");
    }
  };

  return (
    <>
      <PageMeta
        title="Quản lý Phòng ban | Dream Code"
        description="Quản lý các phòng ban trong hệ thống"
      />
      <PageBreadcrumb pageTitle="Quản lý Phòng ban" />
      
      <div className="space-y-6">
        <ComponentCard title="Danh sách Phòng ban">
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Mã phòng ban
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Tên phòng ban
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Mô tả
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Trưởng phòng
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Số nhân viên
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Trạng thái
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {departments.map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                          {dept.id}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                          {dept.name}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {dept.description}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {dept.manager}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {dept.employeeCount}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          <Badge
                            size="sm"
                            color={dept.status === "active" ? "success" : "error"}
                          >
                            {dept.status === "active" ? "Hoạt động" : "Không hoạt động"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-5 py-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(dept.id)}
                          >
                            {dept.status === "active" ? "Vô hiệu hóa" : "Kích hoạt"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tổng số phòng ban: <span className="font-semibold text-gray-800 dark:text-white/90">{departments.length}</span>
                </p>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}

