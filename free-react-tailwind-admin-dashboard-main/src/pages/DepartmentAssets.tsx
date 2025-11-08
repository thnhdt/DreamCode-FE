import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import { getDepartmentAssets } from "../services/departmentAssetService";
import { AssetResponse } from "../types/asset.types";
import { PaginatedResponse } from "../types/admin.types";

export default function DepartmentAssets() {
  const [assets, setAssets] = useState<AssetResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getDepartmentAssets();
        // Handle paginated response
        const assetsList = (data as PaginatedResponse<AssetResponse>).data || [];
        setAssets(assetsList);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Không thể tải dữ liệu tài sản";
        setError(errorMessage);
        console.error("Error fetching department assets:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return { color: "success" as const, label: "Đang sử dụng" };
      case "MAINTENANCE":
        return { color: "warning" as const, label: "Bảo trì" };
      case "LOST":
        return { color: "error" as const, label: "Mất" };
      case "IN_STOCK":
        return { color: "success" as const, label: "Trong kho" };
      case "RETIRED":
        return { color: "error" as const, label: "Đã thanh lý" };
      default:
        return { color: "success" as const, label: status };
    }
  };

  return (
    <>
      <PageMeta title="Tài sản phòng ban | Dream Code" description="Danh sách tài sản của nhân viên trong phòng ban" />
      <PageBreadcrumb pageTitle="Tài sản phòng ban" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách tài sản">
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
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tên tài sản</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Vị trí</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Mô tả</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Giá trị</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Trạng thái</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {assets.length === 0 ? (
                      <TableRow>
                        <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                          Không có dữ liệu
                        </TableCell>
                      </TableRow>
                    ) : (
                      assets.map((asset) => {
                        const badge = getStatusBadge(asset.status);
                        return (
                          <TableRow key={asset.id}>
                            <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">{asset.name}</TableCell>
                            <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{asset.location || "N/A"}</TableCell>
                            <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{asset.description || "N/A"}</TableCell>
                            <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                              {asset.value ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(asset.value) : "N/A"}
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <Badge size="sm" color={badge.color}>
                                {badge.label}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]">
                <p className="text-sm text-gray-500 dark:text-gray-400">Tổng: <span className="font-semibold text-gray-800 dark:text-white/90">{assets.length}</span> tài sản</p>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}


