import { useState, useEffect } from "react";
import { SupplierResponse, UpdateSupplierRequest } from "../../types/supplier.types";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

interface EditPopupProps {
  editIsOpen: boolean;
  closeEditModal: () => void;
  handleEdit: (data: UpdateSupplierRequest) => void;
  supplier: SupplierResponse | null;
}

export default function EditPopup({
  editIsOpen,
  closeEditModal,
  handleEdit,
  supplier,
}: EditPopupProps) {
  const [formData, setFormData] = useState<UpdateSupplierRequest>({
    name: "",
    taxCode: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        taxCode: supplier.taxCode,
        email: supplier.email,
        address: supplier.address,
      });
    }
  }, [supplier]);

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.taxCode || !formData.email || !formData.address) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    handleEdit(formData);
    setError("");
  };

  const handleInputChange = (field: keyof UpdateSupplierRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  if (!editIsOpen) return null;

  return (
    <div className="fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 mx-4 p-4 lg:p-11 px-2 rounded-3xl w-full max-w-[500px] overflow-y-auto no-scrollbar">
        <h4 className="mb-10 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Chỉnh sửa nhà cung cấp
        </h4>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>Tên nhà cung cấp *</Label>
              <Input 
                type="text" 
                value={formData.name || ""}
                onChange={handleInputChange("name")}
                required
              />
            </div>
            <div>
              <Label>Mã số thuế *</Label>
              <Input 
                type="text" 
                value={formData.taxCode || ""}
                onChange={handleInputChange("taxCode")}
                required
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input 
                type="email" 
                value={formData.email || ""}
                onChange={handleInputChange("email")}
                required
              />
            </div>
            <div>
              <Label>Địa chỉ *</Label>
              <Input 
                type="text" 
                value={formData.address || ""}
                onChange={handleInputChange("address")}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-12 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeEditModal}>
            Đóng
          </Button>
          <Button size="sm" variant="primary" onClick={handleSubmit}>
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
}