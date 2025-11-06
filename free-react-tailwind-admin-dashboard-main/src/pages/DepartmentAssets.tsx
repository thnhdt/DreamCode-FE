import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";

interface DeptAssetRow {
  employee: string;
  asset: string;
  serial: string;
  type: string;
  status: "in_use" | "maintenance" | "lost";
}

export default function DepartmentAssets() {
  const [rows, setRows] = useState<DeptAssetRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));
      const mock: DeptAssetRow[] = [
        { employee: "Nguyễn Văn A", asset: "Laptop MacBook Pro 14", serial: "SN-MBP14-2022-888", type: "Laptop", status: "in_use" },
        { employee: "Nguyễn Văn A", asset: "Bàn phím Keychron K2", serial: "SN-KCK2-2021-111", type: "Phụ kiện", status: "in_use" },
        { employee: "Trần Thị B", asset: "Màn hình Dell 24\"", serial: "SN-DEL24-2020-222", type: "Màn hình", status: "maintenance" },
        { employee: "Trần Thị B", asset: "Chuột Logitech M590", serial: "SN-LGM590-2023-333", type: "Phụ kiện", status: "in_use" },
        { employee: "Phạm C", asset: "Laptop ThinkPad X1", serial: "SN-X1-2021-444", type: "Laptop", status: "lost" },
      ];
      setRows(mock);
      setLoading(false);
    };
    load();
  }, []);

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
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nhân viên</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tài sản</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Serial</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Loại tài sản</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Trạng thái</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {rows.map((r, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">{r.employee}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">{r.asset}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{r.serial}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{r.type}</TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          <Badge size="sm" color={r.status === "in_use" ? "success" : r.status === "maintenance" ? "warning" : "error"}>
                            {r.status === "in_use" ? "Đang sử dụng" : r.status === "maintenance" ? "Bảo trì" : "Mất"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]">
                <p className="text-sm text-gray-500 dark:text-gray-400">Tổng: <span className="font-semibold text-gray-800 dark:text-white/90">{rows.length}</span> tài sản</p>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}


