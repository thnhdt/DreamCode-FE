import { useEffect, useMemo, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

type OverviewData = {
  statusCounts: { in_use: number; maintenance: number; in_stock: number };
  deptTotals: { department: string; totalValue: number }[];
  totals: { count: number; remainingValue: number };
};

export default function OverviewDashboard() {
  const [data, setData] = useState<OverviewData | null>(null);

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 200));
      setData({
        statusCounts: { in_use: 32, maintenance: 5, in_stock: 12 },
        deptTotals: [
          { department: "Kinh doanh", totalValue: 120_000_000 },
          { department: "Kỹ thuật", totalValue: 350_000_000 },
          { department: "Nhân sự", totalValue: 80_000_000 },
        ],
        totals: { count: 49, remainingValue: 480_000_000 },
      });
    };
    load();
  }, []);

  const pieData = useMemo(() => {
    if (!data) return [] as { label: string; value: number; color: string }[];
    return [
      { label: "Đang sử dụng", value: data.statusCounts.in_use, color: "#22c55e" },
      { label: "Bảo trì", value: data.statusCounts.maintenance, color: "#f59e0b" },
      { label: "Trong kho", value: data.statusCounts.in_stock, color: "#64748b" },
    ];
  }, [data]);

  const vnd = (v: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(v);

  return (
    <>
      <PageMeta title="Dashboard tổng quan | Dream Code" description="Tổng quan tài sản" />
      <PageBreadcrumb pageTitle="Dashboard tổng quan" />
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ComponentCard title="Tỷ lệ tài sản theo trạng thái">
            <div className="flex items-center justify-center">
              {/* Simple pie chart with CSS (mock) */}
              <div className="relative size-40 rounded-full">
                <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${pieData.map(p => `${p.color} 0 ${(p.value/(pieData.reduce((s,x)=>s+x.value,0)||1))*360}deg`).join(', ')})` }} />
                <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-900" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-theme-xs text-gray-500 dark:text-gray-400">
              {pieData.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span>{p.label}: {p.value}</span>
                </div>
              ))}
            </div>
          </ComponentCard>

          <ComponentCard title="Tổng giá trị theo phòng ban">
            <div className="h-48 flex items-end gap-4 px-4">
              {data?.deptTotals.map((d) => (
                <div key={d.department} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-brand-500/20 dark:bg-brand-500/30" style={{ height: `${(d.totalValue / (Math.max(...(data?.deptTotals.map(x=>x.totalValue)||[1])))) * 100}%` }}>
                    <div className="w-full h-full bg-brand-500" />
                  </div>
                  <div className="mt-2 text-center text-theme-xs text-gray-500 dark:text-gray-400">{d.department}</div>
                </div>
              ))}
            </div>
          </ComponentCard>

          <ComponentCard title="Số liệu tổng">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-theme-xs">Tổng số lượng</p>
                <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">{data?.totals.count ?? "-"}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-theme-xs">Tổng giá trị còn lại</p>
                <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">{data ? vnd(data.totals.remainingValue) : "-"}</p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}


