import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";

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

export default function MyAssets() {
  const [myAssets, setMyAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock API call
  const fetchMyAssets = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Get user info from localStorage
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setError("Không tìm thấy thông tin người dùng");
        return;
      }

      const user = JSON.parse(userStr);
      
      // Get all assets from localStorage
      const storedAssets = localStorage.getItem("assets");
      if (!storedAssets) {
        setMyAssets([]);
        return;
      }

      const allAssets = JSON.parse(storedAssets) as Asset[];
      
      // Filter assets assigned to current user
      const userAssets = allAssets.filter(
        (asset) =>
          asset.assignedTo && asset.status === "assigned" && asset.assignedTo.toLowerCase().includes(user.name?.toLowerCase() || user.email?.toLowerCase())
      );

      setMyAssets(userAssets);
    } catch (err) {
      setError("Không thể tải dữ liệu tài sản");
      console.error("Error fetching my assets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAssets();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Calculate current value with depreciation
  const calculateCurrentValue = (originalValue: number, purchaseDate: string, depreciationRate: number) => {
    const now = new Date();
    const purchase = new Date(purchaseDate);
    const yearsDiff = (now.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24 * 365);
    const depreciation = (yearsDiff * depreciationRate) / 100;
    const currentValue = originalValue * (1 - Math.min(depreciation, 1));
    return Math.max(currentValue, 0);
  };

  return (
    <>
      <PageMeta
        title="Tài sản của tôi | Dream Code"
        description="Xem danh sách tài sản được gán cho tôi"
      />
      <PageBreadcrumb pageTitle="Tài sản của tôi" />
      
      <div className="space-y-6">
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
                        Nguyên giá
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Giá trị hiện tại
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Ngày được gán
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Trạng thái
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {myAssets.map((asset) => {
                      const currentValue = calculateCurrentValue(
                        asset.originalValue,
                        asset.purchaseDate,
                        asset.depreciationRate
                      );
                      return (
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
                            {formatCurrency(asset.originalValue)}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                            {formatCurrency(currentValue)}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                            {asset.assignedDate}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start">
                            <Badge size="sm" color="success">
                              Đang sử dụng
                            </Badge>
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
    </>
  );
}

