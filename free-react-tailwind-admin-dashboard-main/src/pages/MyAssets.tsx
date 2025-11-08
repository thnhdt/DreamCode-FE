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
import { getMyAssets, reportAccident } from "../services/userService";
import { AssetResponse } from "../types/asset.types";
import { PaginatedResponse } from "../types/admin.types";

export default function MyAssets() {
  const [myAssets, setMyAssets] = useState<AssetResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { isOpen, openModal, closeModal } = useModal(false);
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Fetch my assets from API
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMyAssets();
        // Handle paginated response
        const assetsList = (data as PaginatedResponse<AssetResponse>).data || [];
        setMyAssets(assetsList);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Không thể tải dữ liệu tài sản";
        setError(errorMessage);
        console.error("Error fetching my assets:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const assetOptions = myAssets.map((a) => ({ value: a.id.toString(), label: a.name }));

  const handleOpenReport = (assetId?: number) => {
    if (assetId) setSelectedAssetId(assetId);
    openModal();
  };

  const handleSubmitReport = async () => {
    if (!selectedAssetId || !title.trim() || !description.trim()) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      await reportAccident({
        assetId: selectedAssetId,
        title: title.trim(),
        description: description.trim(),
      });
      
      closeModal();
      setTitle("");
      setDescription("");
      setSelectedAssetId(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Không thể báo cáo sự cố";
      setError(errorMessage);
      console.error("Error reporting accident:", err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return { color: "success" as const, label: "Đang sử dụng" };
      case "MAINTENANCE":
        return { color: "warning" as const, label: "Bảo trì" };
      case "LOST":
        return { color: "error" as const, label: "Mất" };
      default:
        return { color: "success" as const, label: "Đang sử dụng" };
    }
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
                        Vị trí
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
                            {asset.location || "N/A"}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start">
                            {(() => {
                              const badge = getStatusBadge(asset.status);
                              return <Badge size="sm" color={badge.color}>{badge.label}</Badge>;
                            })()}
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
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Chọn tài sản
              </label>
              <Select
                options={assetOptions}
                placeholder="Chọn tài sản"
                onChange={(val) => setSelectedAssetId(val ? parseInt(val) : null)}
                defaultValue={selectedAssetId?.toString()}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                placeholder="Nhập tiêu đề sự cố"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Mô tả <span className="text-red-500">*</span>
              </label>
              <TextArea
                rows={5}
                placeholder="Mô tả chi tiết sự cố gặp phải"
                value={description}
                onChange={(val) => setDescription(val)}
              />
            </div>
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg dark:bg-red-900/20">
                {error}
              </div>
            )}
            <div className="flex items-center gap-3 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal} type="button">Đóng</Button>
              <Button size="sm" type="submit" disabled={!selectedAssetId || !title.trim() || !description.trim()}>Gửi</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

