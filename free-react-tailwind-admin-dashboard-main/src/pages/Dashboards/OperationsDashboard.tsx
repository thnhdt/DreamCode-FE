import { useEffect, useMemo, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

type WarrantyRow = { name: string; serial: string; warrantyEnd: string };
type TicketRow = { id: string; assetName: string; reason: string; createdAt: string; status: "open" | "in_progress" | "closed" };

export default function OperationsDashboard() {
  const [warranty, setWarranty] = useState<WarrantyRow[]>([]);
  const [counts, setCounts] = useState<{ in_stock: number; maintenance: number } | null>(null);
  const [tickets, setTickets] = useState<TicketRow[]>([]);

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 200));
      setWarranty([
        { name: "Laptop ThinkPad X1", serial: "SN-X1-2021-444", warrantyEnd: new Date(Date.now() + 10*24*3600*1000).toISOString().slice(0,10) },
        { name: "Màn hình Dell 24\"", serial: "SN-DEL24-2020-222", warrantyEnd: new Date(Date.now() + 25*24*3600*1000).toISOString().slice(0,10) },
      ]);
      setCounts({ in_stock: 18, maintenance: 7 });
      setTickets([
        { id: "T-1001", assetName: "Laptop Dell XPS 13", reason: "Không khởi động", createdAt: "2025-11-01", status: "open" },
        { id: "T-1002", assetName: "Chuột Logitech MX", reason: "Kết nối chập chờn", createdAt: "2025-11-03", status: "in_progress" },
      ]);
    };
    load();
  }, []);

  const soonWarranty = useMemo(() => warranty, [warranty]);

  return (
    <>
      <PageMeta title="Dashboard vận hành | Dream Code" description="Tổng quan vận hành cho quản lý tài sản" />
      <PageBreadcrumb pageTitle="Dashboard vận hành" />
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ComponentCard title="Sắp hết hạn bảo hành (30 ngày)">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tài sản</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Serial</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Hạn BH</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {soonWarranty.map((r, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">{r.name}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{r.serial}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{r.warrantyEnd}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Số lượng theo trạng thái">
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 p-5 dark:border-white/[0.05]">
                <p className="text-gray-500 dark:text-gray-400 text-theme-xs">Trong kho</p>
                <p className="mt-1 text-3xl font-semibold text-gray-800 dark:text-white/90">{counts?.in_stock ?? '-'}</p>
              </div>
              <div className="rounded-xl border border-gray-200 p-5 dark:border-white/[0.05]">
                <p className="text-gray-500 dark:text-gray-400 text-theme-xs">Đang sửa chữa</p>
                <p className="mt-1 text-3xl font-semibold text-gray-800 dark:text-white/90">{counts?.maintenance ?? '-'}</p>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Ticket báo hỏng (gần đây)">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Mã</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tài sản</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Lý do</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Ngày tạo</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Trạng thái</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {tickets.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">{t.id}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">{t.assetName}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{t.reason}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{t.createdAt}</TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          <Badge size="sm" color={t.status === "open" ? "warning" : t.status === "in_progress" ? "info" : "success"}>
                            {t.status === "open" ? "Mở" : t.status === "in_progress" ? "Đang xử lý" : "Đã đóng"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}


