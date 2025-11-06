import { useEffect, useMemo, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";

type DepAsset = {
  id: string;
  name: string;
  originalValue: number; // VND
  purchaseDate: string; // ISO date
  usefulLifeYears: number; // straight-line
};

export default function Depreciation() {
  const [assets, setAssets] = useState<DepAsset[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 250));
      setAssets([
        { id: "D-001", name: "Laptop Dell XPS 13", originalValue: 30000000, purchaseDate: "2023-01-15", usefulLifeYears: 4 },
        { id: "D-002", name: "Màn hình LG 27\"", originalValue: 7000000, purchaseDate: "2022-06-01", usefulLifeYears: 5 },
        { id: "D-003", name: "Máy in HP", originalValue: 5000000, purchaseDate: "2021-11-20", usefulLifeYears: 3 },
      ]);
      setLoading(false);
    };
    load();
  }, []);

  const rows = useMemo(() => {
    const now = new Date();
    return assets.map((a) => {
      const purchase = new Date(a.purchaseDate);
      const totalMonths = a.usefulLifeYears * 12;
      const monthsUsed = Math.max(0, Math.floor((now.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24 * 30))); // approx months
      const monthlyDep = a.originalValue / totalMonths;
      const accumulated = Math.min(a.originalValue, Math.max(0, monthsUsed) * monthlyDep);
      const remaining = Math.max(0, a.originalValue - accumulated);
      return {
        ...a,
        monthlyDep,
        accumulated,
        remaining,
      };
    });
  }, [assets]);

  const vnd = (v: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(v);

  return (
    <>
      <PageMeta title="Khấu hao tài sản | Dream Code" description="Tự động khấu hao theo phương pháp đường thẳng" />
      <PageBreadcrumb pageTitle="Khấu hao tài sản" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách khấu hao">
          {loading ? (
            <div className="py-12 text-center"><p className="text-gray-500 dark:text-gray-400">Đang tải dữ liệu...</p></div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tên</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nguyên giá</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Thời gian khấu hao</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Khấu hao lũy kế</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Giá trị còn lại</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {rows.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">{r.name}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{vnd(r.originalValue)}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{r.usefulLifeYears} năm</TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{vnd(r.accumulated)}</TableCell>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">{vnd(r.remaining)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}


