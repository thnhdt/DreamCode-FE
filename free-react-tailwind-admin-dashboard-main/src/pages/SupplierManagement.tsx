import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import Button from "../components/ui/button/Button";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxCode: string;
  status: "active" | "inactive";
  createdAt: string;
}

// Mock data
const initialSuppliers: Supplier[] = [
  {
    id: "SUP001",
    name: "Công ty TNHH Thiết bị Văn phòng ABC",
    contactPerson: "Nguyễn Văn X",
    email: "info@abc.vn",
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    taxCode: "1234567890",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "SUP002",
    name: "Công ty Cổ phần Máy tính XYZ",
    contactPerson: "Trần Thị Y",
    email: "contact@xyz.com",
    phone: "0987654321",
    address: "456 Đường XYZ, Quận 3, TP. HCM",
    taxCode: "0987654321",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "SUP003",
    name: "Công ty TNHH Đồ gia dụng DEF",
    contactPerson: "Lê Văn Z",
    email: "sales@def.vn",
    phone: "0111222333",
    address: "789 Đường DEF, Quận 5, TP. HCM",
    taxCode: "1122334455",
    status: "inactive",
    createdAt: "2023-12-20",
  },
  {
    id: "SUP004",
    name: "Công ty TNHH Thiết bị An ninh GHI",
    contactPerson: "Phạm Thị W",
    email: "info@ghi.com",
    phone: "0147258369",
    address: "321 Đường GHI, Quận 7, TP. HCM",
    taxCode: "5566778899",
    status: "active",
    createdAt: "2024-02-01",
  },
  {
    id: "SUP005",
    name: "Công ty Cổ phần Nội thất JKL",
    contactPerson: "Hoàng Văn V",
    email: "contact@jkl.vn",
    phone: "0198765432",
    address: "654 Đường JKL, Quận 2, TP. HCM",
    taxCode: "9988776655",
    status: "active",
    createdAt: "2024-01-25",
  },
  {
    id: "SUP006",
    name: "Công ty TNHH Điện tử MNO",
    contactPerson: "Võ Thị U",
    email: "sales@mno.vn",
    phone: "0163285974",
    address: "987 Đường MNO, Quận 9, TP. HCM",
    taxCode: "3366445588",
    status: "inactive",
    createdAt: "2024-01-30",
  },
];

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock API call
  const fetchSuppliers = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Get data from localStorage or use initial data
      const storedData = localStorage.getItem("suppliers");
      if (storedData) {
        setSuppliers(JSON.parse(storedData) as Supplier[]);
      } else {
        setSuppliers(initialSuppliers);
        localStorage.setItem("suppliers", JSON.stringify(initialSuppliers));
      }
    } catch (err) {
      setError("Không thể tải dữ liệu nhà cung cấp");
      console.error("Error fetching suppliers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const updatedSuppliers = suppliers.map((supplier) =>
        supplier.id === id
          ? { ...supplier, status: (supplier.status === "active" ? "inactive" : "active") as "active" | "inactive" }
          : supplier
      );
      setSuppliers(updatedSuppliers);
      localStorage.setItem("suppliers", JSON.stringify(updatedSuppliers));
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (err) {
      setError("Không thể cập nhật trạng thái");
    }
  };

  return (
    <>
      <PageMeta
        title="Quản lý Nhà cung cấp | Dream Code"
        description="Quản lý danh sách nhà cung cấp trong hệ thống"
      />
      <PageBreadcrumb pageTitle="Quản lý Nhà cung cấp" />
      
      <div className="space-y-6">
        <ComponentCard title="Danh sách Nhà cung cấp">
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
                        Mã nhà cung cấp
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Tên công ty
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Người liên hệ
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Email
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Số điện thoại
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
                    {suppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                          {supplier.id}
                        </TableCell>
                        <TableCell className="px-5 py-4">
                          <div className="max-w-xs">
                            <span className="text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                              {supplier.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {supplier.contactPerson}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {supplier.email}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {supplier.phone}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          <Badge
                            size="sm"
                            color={supplier.status === "active" ? "success" : "error"}
                          >
                            {supplier.status === "active" ? "Hoạt động" : "Không hoạt động"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-5 py-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(supplier.id)}
                          >
                            {supplier.status === "active" ? "Vô hiệu hóa" : "Kích hoạt"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tổng số nhà cung cấp: <span className="font-semibold text-gray-800 dark:text-white/90">{suppliers.length}</span>
                </p>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}

