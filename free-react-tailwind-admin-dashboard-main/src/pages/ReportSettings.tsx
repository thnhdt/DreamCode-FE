import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import Alert from "../components/ui/alert/Alert";

export default function ReportSettings() {
  const [enabled, setEnabled] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("report_email_monthly") === "true";
    setEnabled(saved);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("report_email_monthly", String(next));
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <>
      <PageMeta title="Cài đặt báo cáo | Dream Code" description="Cài đặt gửi báo cáo email" />
      <PageBreadcrumb pageTitle="Cài đặt báo cáo" />
      <div className="space-y-6">
        {show && (
          <Alert variant="success" title="Đã cập nhật cài đặt" message="Báo cáo sẽ được gửi hàng tháng." showLink={false} />
        )}
        <ComponentCard title="Email báo cáo">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={enabled} onChange={toggle} className="size-4" />
            <span className="text-gray-700 dark:text-white/90">Gửi báo cáo tổng hợp qua email hàng tháng</span>
          </label>
        </ComponentCard>
      </div>
    </>
  );
}


