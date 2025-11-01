import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import Button from "../components/ui/button/Button";
import { PlusIcon, TrashBinIcon } from "../icons";
import { Modal } from "../components/ui/modal";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import Select from "../components/form/Select";
import DatePicker from "../components/form/date-picker.tsx";

interface Asset {
  id: string;
  name: string;
  category: string;
  department: string;
  purchaseDate: string;
  originalValue: number;
  depreciationRate: number;
  status: "in_stock" | "assigned" | "maintenance";
  assignedTo?: string;
  assignedDate?: string;
}

// Mock data
const initialAssets: Asset[] = [
  {
    id: "AST001",
    name: "Laptop Dell XPS 15",
    category: "Thiết bị điện tử",
    department: "IT",
    purchaseDate: "2024-01-15",
    originalValue: 25000000,
    depreciationRate: 20,
    status: "assigned",
    assignedTo: "Nguyễn Văn A",
    assignedDate: "2024-02-01",
  },
  {
    id: "AST002",
    name: "Máy in HP LaserJet",
    category: "Thiết bị văn phòng",
    department: "Kế toán",
    purchaseDate: "2024-02-10",
    originalValue: 8000000,
    depreciationRate: 15,
    status: "in_stock",
  },
  {
    id: "AST003",
    name: "Bàn làm việc cao cấp",
    category: "Nội thất",
    department: "Nhân sự",
    purchaseDate: "2024-01-20",
    originalValue: 5000000,
    depreciationRate: 10,
    status: "maintenance",
  },
  {
    id: "AST004",
    name: "Máy chiếu Epson",
    category: "Thiết bị trình chiếu",
    department: "IT",
    purchaseDate: "2024-01-05",
    originalValue: 15000000,
    depreciationRate: 18,
    status: "assigned",
    assignedTo: "Trần Thị B",
    assignedDate: "2024-02-15",
  },
];

const departments = [
  { value: "IT", label: "IT" },
  { value: "Kế toán", label: "Kế toán" },
  { value: "Nhân sự", label: "Nhân sự" },
  { value: "Kinh doanh", label: "Kinh doanh" },
];

const categories = [
  { value: "Thiết bị điện tử", label: "Thiết bị điện tử" },
  { value: "Thiết bị văn phòng", label: "Thiết bị văn phòng" },
  { value: "Nội thất", label: "Nội thất" },
  { value: "Thiết bị trình chiếu", label: "Thiết bị trình chiếu" },
];

const mockUsers = [
  { value: "user1", label: "Nguyễn Văn A" },
  { value: "user2", label: "Trần Thị B" },
  { value: "user3", label: "Lê Văn C" },
  { value: "user4", label: "Phạm Thị D" },
];

export default function AssetManagement() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    department: "",
    purchaseDate: "",
    originalValue: "",
    depreciationRate: "",
  });

  const [assignData, setAssignData] = useState({
    assignedTo: "",
    assignedDate: "",
  });

  // Fetch assets
  const fetchAssets = async () => {
    setLoading(true);
    setError("");
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const storedData = localStorage.getItem("assets");
      if (storedData) {
        setAssets(JSON.parse(storedData) as Asset[]);
      } else {
        setAssets(initialAssets);
        localStorage.setItem("assets", JSON.stringify(initialAssets));
      }
    } catch {
      setError("Không thể tải dữ liệu tài sản");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleAddAsset = async () => {
    if (!formData.name || !formData.category || !formData.department || !formData.purchaseDate || !formData.originalValue || !formData.depreciationRate) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newAsset: Asset = {
      id: `AST${String(assets.length + 1).padStart(3, "0")}`,
      name: formData.name,
      category: formData.category,
      department: formData.department,
      purchaseDate: formData.purchaseDate,
      originalValue: Number(formData.originalValue),
      depreciationRate: Number(formData.depreciationRate),
      status: "in_stock",
    };

    const updatedAssets = [...assets, newAsset];
    setAssets(updatedAssets);
    localStorage.setItem("assets", JSON.stringify(updatedAssets));
    setShowAddModal(false);
    resetForm();
  };

  const handleAssignAsset = async () => {
    if (!assignData.assignedTo || !assignData.assignedDate) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!selectedAsset) return;

    const updatedAssets = assets.map((asset) =>
      asset.id === selectedAsset.id
        ? {
            ...asset,
            status: "assigned" as const,
            assignedTo: assignData.assignedTo,
            assignedDate: assignData.assignedDate,
          }
        : asset
    );

    setAssets(updatedAssets);
    localStorage.setItem("assets", JSON.stringify(updatedAssets));
    setShowAssignModal(false);
    setSelectedAsset(null);
    resetAssignForm();
  };

  const handleDeleteAsset = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài sản này?")) {
      const updatedAssets = assets.filter((asset) => asset.id !== id);
      setAssets(updatedAssets);
      localStorage.setItem("assets", JSON.stringify(updatedAssets));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      department: "",
      purchaseDate: "",
      originalValue: "",
      depreciationRate: "",
    });
  };

  const resetAssignForm = () => {
    setAssignData({
      assignedTo: "",
      assignedDate: "",
    });
  };

  const openAssignModal = (asset: Asset) => {
    if (asset.status !== "in_stock") {
      setError("Chỉ có thể gán các tài sản đang trong kho");
      return;
    }
    setSelectedAsset(asset);
    setShowAssignModal(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <>
      <PageMeta
        title="Quản lý Tài sản | Dream Code"
        description="Quản lý tài sản trong hệ thống"
      />
      <PageBreadcrumb pageTitle="Quản lý Tài sản" />
      
      <div className="space-y-6">
        <ComponentCard title="Danh sách Tài sản">
          <div className="mb-4 flex justify-end">
            <Button
              size="sm"
              onClick={() => setShowAddModal(true)}
              startIcon={<PlusIcon className="size-4" />}
            >
              Thêm tài sản mới
            </Button>
          </div>

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
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Mã tài sản
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Tên tài sản
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Danh mục
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Phòng ban
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Ngày mua
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Nguyên giá
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Khấu hao (%)
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
                    {assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                          {asset.id}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                          {asset.name}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {asset.category}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {asset.department}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {asset.purchaseDate}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {formatCurrency(asset.originalValue)}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                          {asset.depreciationRate}%
                        </TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          <Badge
                            size="sm"
                            color={
                              asset.status === "in_stock"
                                ? "success"
                                : asset.status === "assigned"
                                ? "warning"
                                : "error"
                            }
                          >
                            {asset.status === "in_stock"
                              ? "Trong kho"
                              : asset.status === "assigned"
                              ? "Đã gán"
                              : "Bảo trì"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {asset.status === "in_stock" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openAssignModal(asset)}
                              >
                                Gán
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteAsset(asset.id)}
                            >
                              <TrashBinIcon className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>

      {/* Add Asset Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        className="max-w-[600px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Thêm tài sản mới
            </h4>
          </div>
          <div className="space-y-4 px-2 pt-4">
          <div>
            <Label>Tên tài sản <span className="text-error-500">*</span></Label>
            <Input
              type="text"
              placeholder="Nhập tên tài sản"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Danh mục <span className="text-error-500">*</span></Label>
            <Select
              options={categories}
              placeholder="Chọn danh mục"
              onChange={(value) => setFormData({ ...formData, category: value })}
            />
          </div>
          <div>
            <Label>Phòng ban <span className="text-error-500">*</span></Label>
            <Select
              options={departments}
              placeholder="Chọn phòng ban"
              onChange={(value) => setFormData({ ...formData, department: value })}
            />
          </div>
          <div>
            <DatePicker
              id="purchase-date"
              placeholder="Chọn ngày mua"
              onChange={(dates) => {
                if (dates && dates.length > 0) {
                  setFormData({ ...formData, purchaseDate: dates[0].toISOString().split("T")[0] });
                }
              }}
            />
          </div>
          <div>
            <Label>Nguyên giá (VND) <span className="text-error-500">*</span></Label>
            <Input
              type="number"
              placeholder="Nhập nguyên giá"
              value={formData.originalValue}
              onChange={(e) => setFormData({ ...formData, originalValue: e.target.value })}
            />
          </div>
          <div>
            <Label>Tỷ lệ khấu hao (%/năm) <span className="text-error-500">*</span></Label>
            <Input
              type="number"
              placeholder="Nhập tỷ lệ khấu hao"
              value={formData.depreciationRate}
              onChange={(e) => setFormData({ ...formData, depreciationRate: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
            >
              Hủy
            </Button>
            <Button onClick={handleAddAsset}>Thêm</Button>
          </div>
          </div>
        </div>
      </Modal>

      {/* Assign Asset Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedAsset(null);
          resetAssignForm();
        }}
        className="max-w-[500px] m-4"
      >
        {selectedAsset && (
          <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Gán tài sản cho người dùng
              </h4>
            </div>
            <div className="space-y-4 px-2 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tài sản: <span className="font-semibold">{selectedAsset.name}</span>
            </p>
            <div>
              <Label>Người dùng <span className="text-error-500">*</span></Label>
              <Select
                options={mockUsers}
                placeholder="Chọn người dùng"
                onChange={(value) => setAssignData({ ...assignData, assignedTo: value })}
              />
            </div>
            <div>
              <DatePicker
                id="assign-date"
                placeholder="Chọn ngày gán"
                onChange={(dates) => {
                  if (dates && dates.length > 0) {
                    setAssignData({ ...assignData, assignedDate: dates[0].toISOString().split("T")[0] });
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedAsset(null);
                  resetAssignForm();
                }}
              >
                Hủy
              </Button>
              <Button onClick={handleAssignAsset}>Gán</Button>
            </div>
          </div>
          </div>
        )}
      </Modal>
    </>
  );
}

