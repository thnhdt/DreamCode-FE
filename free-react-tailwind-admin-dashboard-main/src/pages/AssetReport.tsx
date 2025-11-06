import { useEffect, useMemo, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Select from "../components/form/Select";
import Button from "../components/ui/button/Button";
import Alert from "../components/ui/alert/Alert";

type ReportRow = {
  id: string;
  department: string;
  category: string;
  name: string;
  value: number;
  status: "in_use" | "maintenance" | "in_stock";
};

export default function AssetReport() {
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [filters, setFilters] = useState<{ dept: string; category: string }>({ dept: "", category: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 200));
      setRows([
        { id: "R-1", department: "Kinh doanh", category: "Laptop", name: "MacBook Air 13", value: 25000000, status: "in_use" },
        { id: "R-2", department: "Kỹ thuật", category: "Màn hình", name: "Dell U2419", value: 6000000, status: "in_use" },
        { id: "R-3", department: "Kỹ thuật", category: "Laptop", name: "ThinkPad X1", value: 32000000, status: "maintenance" },
        { id: "R-4", department: "Nhân sự", category: "Phụ kiện", name: "Chuột Logitech MX", value: 1500000, status: "in_stock" },
      ]);
    };
    load();
  }, []);

  const departments = Array.from(new Set(rows.map((r) => r.department))).map((d) => ({ value: d, label: d }));
  const categories = Array.from(new Set(rows.map((r) => r.category))).map((c) => ({ value: c, label: c }));

  const filtered = useMemo(() => rows.filter((r) => (!filters.dept || r.department === filters.dept) && (!filters.category || r.category === filters.category)), [rows, filters]);

  const vnd = (v: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(v);

  const handleExport = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <>
      <PageMeta title="Báo cáo tài sản | Dream Code" description="Bộ lọc và xuất báo cáo" />
      <PageBreadcrumb pageTitle="Báo cáo tài sản" />
      <div className="space-y-6">
        {showSuccess && (
          <Alert variant="success" title="Báo cáo đã được tạo thành công" message="Bạn có thể tải về trong mục Tải xuống." showLink={false} />
        )}
        <ComponentCard title="Bộ lọc">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Select options={[{ value: "", label: "Tất cả phòng ban" }, ...departments]} placeholder="Chọn phòng ban" onChange={(val) => setFilters((f) => ({ ...f, dept: val }))} defaultValue={filters.dept} />
            <Select options={[{ value: "", label: "Tất cả loại" }, ...categories]} placeholder="Chọn loại tài sản" onChange={(val) => setFilters((f) => ({ ...f, category: val }))} defaultValue={filters.category} />
            <div className="flex items-center">
              <Button onClick={handleExport}>Xuất Excel</Button>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Dữ liệu báo cáo">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Phòng ban</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Loại</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tên</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Giá trị</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Trạng thái</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">{r.department}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{r.category}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">{r.name}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{vnd(r.value)}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{r.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}


