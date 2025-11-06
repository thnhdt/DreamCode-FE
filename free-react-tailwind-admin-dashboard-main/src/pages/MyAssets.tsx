import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import Button from "../components/ui/button/Button";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import Select from "../components/form/Select";
import TextArea from "../components/form/input/TextArea";
import Alert from "../components/ui/alert/Alert";

interface Asset {
  id: string;
  name: string;
  serial: string;
  status: "in_use" | "maintenance" | "lost";
}

export default function MyAssets() {
  const [myAssets, setMyAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { isOpen, openModal, closeModal } = useModal(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  // Mock: seed some assets for the current user
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        await new Promise((r) => setTimeout(r, 300));
        const mock: Asset[] = [
          { id: "AS-001", name: "Laptop Dell XPS 13", serial: "SN-DX13-2023-001", status: "in_use" },
          { id: "AS-002", name: "Chuột Logitech MX", serial: "SN-LGMX-2022-145", status: "in_use" },
          { id: "AS-003", name: "Màn hình LG 27\"", serial: "SN-LG27-2021-332", status: "maintenance" },
        ];
        setMyAssets(mock);
      } catch {
        setError("Không thể tải dữ liệu tài sản");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const assetOptions = myAssets.map((a) => ({ value: a.id, label: a.name }));

  const handleOpenReport = (assetId?: string) => {
    if (assetId) setSelectedAssetId(assetId);
    openModal();
  };

  const handleSubmitReport = () => {
    // mock create ticket
    setTimeout(() => {
      closeModal();
      setReason("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    }, 250);
  };

  return (
    <>
      <PageMeta
        title="Tài sản của tôi | Dream Code"
        description="Xem danh sách tài sản được gán cho tôi"
      />
      <PageBreadcrumb pageTitle="Tài sản của tôi" />
      
      <div className="space-y-6">
        {showSuccess && (
          <Alert
            variant="success"
            title="Đã tạo ticket thành công"
            message="Chúng tôi sẽ xử lý sớm nhất."
            showLink={false}
          />
        )}
        <ComponentCard title="Danh sách Tài sản được gán">
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : myAssets.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Bạn chưa được gán tài sản nào
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Tên tài sản
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Số serial
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Trạng thái
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {myAssets.map((asset) => {
                      return (
                        <TableRow key={asset.id}>
                          <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                            {asset.name}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                            {asset.serial}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start">
                            <Badge size="sm" color={asset.status === "in_use" ? "success" : asset.status === "maintenance" ? "warning" : "error"}>
                              {asset.status === "in_use" ? "Đang sử dụng" : asset.status === "maintenance" ? "Bảo trì" : "Mất"}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-5 py-4">
                            <Button size="sm" variant="outline" onClick={() => handleOpenReport(asset.id)}>
                              Báo cáo sự cố
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tổng số tài sản: <span className="font-semibold text-gray-800 dark:text-white/90">{myAssets.length}</span>
                </p>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>

      {/* Report Issue Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-9">
          <div className="px-1 pr-10">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Báo cáo sự cố tài sản</h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">Vui lòng chọn tài sản và mô tả sự cố.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitReport(); }} className="flex flex-col gap-5 px-1">
            <div>
              <Select
                options={assetOptions}
                placeholder="Chọn tài sản"
                onChange={(val) => setSelectedAssetId(val)}
                defaultValue={selectedAssetId}
              />
            </div>
            <div>
              <TextArea
                rows={5}
                placeholder="Mô tả lý do / sự cố gặp phải"
                value={reason}
                onChange={(val) => setReason(val)}
              />
            </div>
            <div className="flex items-center gap-3 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal} type="button">Đóng</Button>
              <Button size="sm" type="submit" disabled={!selectedAssetId || !reason.trim()}>Gửi</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

