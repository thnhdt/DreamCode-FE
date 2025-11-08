import { useState } from "react";
import { createSupplier } from "../../services/admin";
import { CreateSupplierRequest } from "../../types/supplier.types";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";

interface ModalAddSupplierProps {
  addIsOpen: boolean;
  closeAddModal: () => void;
  fetchListSupplier: () => void;
}

export default function ModalAddSupplier({ addIsOpen, closeAddModal, fetchListSupplier }: ModalAddSupplierProps) {
  const [formData, setFormData] = useState<CreateSupplierRequest>({
    name: "",
    taxCode: "",
    email: "",
    address: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    // Validate form
    if (!formData.name || !formData.taxCode || !formData.email || !formData.address) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createSupplier(formData);

      // Reset form
      setFormData({
        name: "",
        taxCode: "",
        email: "",
        address: "",
        isActive: true,
      });

      closeAddModal();
      fetchListSupplier();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Không thể tạo nhà cung cấp";
      setError(errorMessage);
      console.error("Error creating supplier:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateSupplierRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  return (
    <Modal
      isOpen={addIsOpen}
      onClose={closeAddModal}
      className="m-4 max-w-[700px]"
    >
      <div className="relative bg-white dark:bg-gray-900 p-4 lg:p-11 rounded-3xl w-full max-w-[700px] overflow-y-auto no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-6 font-semibold text-gray-800 dark:text-white/90 text-2xl">
            Thêm nhà cung cấp mới
          </h4>
        </div>
        <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
          <div className="px-2 pb-3 h-[450px] overflow-y-auto custom-scrollbar">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 mb-4 p-3 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2">
                <div>
                  <Label>Tên nhà cung cấp *</Label>
                  <Input
                    id="supplierName"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange("name")}
                    required
                  />
                </div>
                <div>
                  <Label>Mã số thuế *</Label>
                  <Input
                    id="taxCode"
                    type="text"
                    value={formData.taxCode}
                    onChange={handleInputChange("taxCode")}
                    required
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    required
                  />
                </div>
                <div>
                  <Label>Địa chỉ *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange("address")}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:justify-end items-center gap-3 mt-6 px-2">
            <Button
              size="sm"
              variant="outline"
              onClick={closeAddModal}
              disabled={loading}
              type="button"
            >
              Đóng
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}