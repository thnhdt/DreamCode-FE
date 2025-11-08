import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import Button from "../components/ui/button/Button";
import { getSuppliers, updateSupplier } from "../services/admin";
import { SupplierResponse } from "../types/supplier.types";
import { PaginatedResponse } from "../types/admin.types";

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch suppliers from API
  const fetchSuppliers = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await getSuppliers();
      // Handle both array and paginated response
      const suppliersList = Array.isArray(data) 
        ? data 
        : (data as PaginatedResponse<SupplierResponse>).data || [];
      setSuppliers(suppliersList);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Không thể tải dữ liệu nhà cung cấp";
      setError(errorMessage);
      console.error("Error fetching suppliers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleToggleStatus = async (id: number) => {
    try {
      const supplier = suppliers.find((s) => s.id === id);
      if (!supplier) return;

      const updatedSupplier = await updateSupplier(id, {
        isActive: !supplier.isActive,
      });

      // Update local state
      setSuppliers(suppliers.map((s) => (s.id === id ? updatedSupplier : s)));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Không thể cập nhật trạng thái";
      setError(errorMessage);
      console.error("Error updating supplier:", err);
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
              <Button
                size="sm"
                variant="outline"
                onClick={fetchSuppliers}
                className="mt-4"
              >
                Thử lại
              </Button>
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
                        Mã số thuế
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
                        Địa chỉ
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
                    {suppliers.length === 0 && !loading ? (
                      <TableRow>
                        <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                          Không có dữ liệu
                        </TableCell>
                      </TableRow>
                    ) : (
                      suppliers.map((supplier) => (
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
                            {supplier.taxCode}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                            {supplier.email}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                            <div className="max-w-xs truncate" title={supplier.address}>
                              {supplier.address}
                            </div>
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start">
                            <Badge
                              size="sm"
                              color={supplier.isActive ? "success" : "error"}
                            >
                              {supplier.isActive ? "Hoạt động" : "Không hoạt động"}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-5 py-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleStatus(supplier.id)}
                            >
                              {supplier.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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

