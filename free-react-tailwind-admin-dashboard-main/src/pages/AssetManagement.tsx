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
import { getAssets, createAsset, assignAsset } from "../services/assetService";
import { getDepartments, getActiveDepartments } from "../services/admin";
import { getUsers } from "../services/admin";
import { AssetResponse } from "../types/asset.types";
import { DepartmentResponse, UserResponse, PaginatedResponse } from "../types/admin.types";

export default function AssetManagement() {
  const [assets, setAssets] = useState<AssetResponse[]>([]);
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetResponse | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    categoryId: "",
    departmentId: "",
    supplierId: "",
    purchaseDate: "",
    value: "",
  });

  const [assignData, setAssignData] = useState({
    userIds: [] as number[],
    notes: "",
  });

  // Fetch assets, departments, and users
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      
      try {
        // Fetch assets
        const assetsData = await getAssets();
        const assetsList = Array.isArray(assetsData) 
          ? assetsData 
          : (assetsData as PaginatedResponse<AssetResponse>).data || [];
        setAssets(assetsList);

        // Fetch departments
        const deptsData = await getActiveDepartments();
        const deptsList = Array.isArray(deptsData)
          ? deptsData
          : (deptsData as PaginatedResponse<DepartmentResponse>).data || [];
        setDepartments(deptsList);

        // Fetch users
        const usersData = await getUsers();
        const usersList = Array.isArray(usersData)
          ? usersData
          : (usersData as PaginatedResponse<UserResponse>).data || [];
        setUsers(usersList);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Không thể tải dữ liệu";
        setError(errorMessage);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddAsset = async () => {
    if (!formData.name || !formData.value || !formData.departmentId) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      const newAsset = await createAsset({
        name: formData.name,
        location: formData.location || undefined,
        description: formData.description || undefined,
        status: "IN_STOCK",
        value: Number(formData.value),
        departmentId: formData.departmentId ? Number(formData.departmentId) : undefined,
        categoryId: formData.categoryId ? Number(formData.categoryId) : undefined,
        supplierId: formData.supplierId ? Number(formData.supplierId) : undefined,
        purchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate).toISOString() : undefined,
      });

      setAssets([...assets, newAsset]);
      setShowAddModal(false);
      resetForm();
      setError("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Không thể tạo tài sản";
      setError(errorMessage);
      console.error("Error creating asset:", err);
    }
  };

  const handleAssignAsset = async () => {
    if (!selectedAsset || assignData.userIds.length === 0) {
      setError("Vui lòng chọn ít nhất một người dùng");
      return;
    }

    try {
      await assignAsset({
        assetId: selectedAsset.id,
        userIds: assignData.userIds,
        notes: assignData.notes || undefined,
      });

      // Refresh assets list
      const assetsData = await getAssets();
      const assetsList = Array.isArray(assetsData) 
        ? assetsData 
        : (assetsData as PaginatedResponse<AssetResponse>).data || [];
      setAssets(assetsList);

      setShowAssignModal(false);
      setSelectedAsset(null);
      resetAssignForm();
      setError("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Không thể gán tài sản";
      setError(errorMessage);
      console.error("Error assigning asset:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      description: "",
      categoryId: "",
      departmentId: "",
      supplierId: "",
      purchaseDate: "",
      value: "",
    });
  };

  const resetAssignForm = () => {
    setAssignData({
      userIds: [],
      notes: "",
    });
  };

  const openAssignModal = (asset: AssetResponse) => {
    if (asset.status !== "IN_STOCK") {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "IN_STOCK":
        return { color: "success" as const, label: "Trong kho" };
      case "ASSIGNED":
        return { color: "warning" as const, label: "Đã gán" };
      case "MAINTENANCE":
        return { color: "error" as const, label: "Bảo trì" };
      case "RETIRED":
        return { color: "error" as const, label: "Đã thanh lý" };
      case "LOST":
        return { color: "error" as const, label: "Mất" };
      default:
        return { color: "success" as const, label: status };
    }
  };

  const departmentOptions = departments.map((dept) => ({
    value: dept.id.toString(),
    label: dept.name,
  }));

  const userOptions = users.map((user) => ({
    value: user.id.toString(),
    label: user.userName,
  }));

  // Mock categories - should be fetched from API if available
  const categoryOptions = [
    { value: "1", label: "Thiết bị điện tử" },
    { value: "2", label: "Thiết bị văn phòng" },
    { value: "3", label: "Nội thất" },
  ];

  return (
    <>
      <PageMeta
        title="Quản lý Tài sản | Dream Code"
        description="Quản lý tài sản trong hệ thống"
      />
      <PageBreadcrumb pageTitle="Quản lý Tài sản" />
      
      <div className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg dark:bg-red-900/20">
            {error}
          </div>
        )}
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
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        ID
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Tên tài sản
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Vị trí
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Ngày mua
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Giá trị
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
                            <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                              {asset.id}
                            </TableCell>
                            <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                              {asset.name}
                            </TableCell>
                            <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                              {asset.location || "N/A"}
                            </TableCell>
                            <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                              {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString("vi-VN") : "N/A"}
                            </TableCell>
                            <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                              {formatCurrency(asset.value)}
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <Badge size="sm" color={badge.color}>
                                {badge.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                {asset.status === "IN_STOCK" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openAssignModal(asset)}
                                  >
                                    Gán
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
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
          setError("");
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
              <Label>Vị trí</Label>
              <Input
                type="text"
                placeholder="Nhập vị trí"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <Label>Mô tả</Label>
              <Input
                type="text"
                placeholder="Nhập mô tả"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Phòng ban <span className="text-error-500">*</span></Label>
              <Select
                options={departmentOptions}
                placeholder="Chọn phòng ban"
                onChange={(value) => setFormData({ ...formData, departmentId: value })}
              />
            </div>
            <div>
              <Label>Danh mục</Label>
              <Select
                options={categoryOptions}
                placeholder="Chọn danh mục"
                onChange={(value) => setFormData({ ...formData, categoryId: value })}
              />
            </div>
            <div>
              <Label>Ngày mua</Label>
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
              <Label>Giá trị (VND) <span className="text-error-500">*</span></Label>
              <Input
                type="number"
                placeholder="Nhập giá trị"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                  setError("");
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
          setError("");
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
                  options={userOptions}
                  placeholder="Chọn người dùng"
                  onChange={(value) => {
                    if (value) {
                      setAssignData({ 
                        ...assignData, 
                        userIds: [Number(value)]
                      });
                    }
                  }}
                />
              </div>
              <div>
                <Label>Ghi chú</Label>
                <Input
                  type="text"
                  placeholder="Nhập ghi chú (tùy chọn)"
                  value={assignData.notes}
                  onChange={(e) => setAssignData({ ...assignData, notes: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedAsset(null);
                    resetAssignForm();
                    setError("");
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
