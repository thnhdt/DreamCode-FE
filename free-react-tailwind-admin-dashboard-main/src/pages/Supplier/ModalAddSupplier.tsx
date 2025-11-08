import { useState } from "react";
// import { createSupplierApi } from "../../api/adminApi";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";

export default function ModalAddSupplier({ addIsOpen, closeAddModal }: any) {
  const [formData, setFormData] = useState({});



  const handleAdd = async () => {
    // Handle save logic here
    console.log("formdata", formData);
    const newformData = {
      ...formData,
      isActive: true,
    };
    // const res = await createSupplierApi(newformData);
    console.log("create supplier", res);
    closeAddModal();
  };

  const handleSelectNameChange = () => {
    const supplierName = document.getElementById(
      "supplierName"
    ) as HTMLInputElement;
    console.log("name", supplierName.value);

    setFormData({
      ...formData,
      name: supplierName.value,
    });
  };

  const handleSelectTaxCodeChange = () => {
    const taxCode = document.getElementById("taxCode") as HTMLInputElement;
    console.log("taxCode", taxCode.value);

    setFormData({
      ...formData,
      taxCode: taxCode.value,
    });
  };
  const handleSelectEmailChange = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    console.log("email", email.value);
    setFormData({
      ...formData,
      email: email.value,
    });
  };
  const handleSelectAddressChange = () => {
    const address = document.getElementById("address") as HTMLInputElement;
    console.log("address", address.value);
    setFormData({
      ...formData,
      address: address.value,
    });
  }

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
        <form className="flex flex-col">
          <div className="px-2 pb-3 h-[450px] overflow-y-auto custom-scrollbar">
            <div>
              <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2">
                <div>
                  <Label>Tên nhà cung cấp</Label>
                  <Input id="supplierName" type="text" onChange={handleSelectNameChange} />
                </div>
                <div>
                  <Label>Mã số thuế</Label>
                  <Input id="taxCode" type="text" onChange={handleSelectTaxCodeChange} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input id="email" type="text" onChange={handleSelectEmailChange} />
                </div>
                <div>
                  <Label>Địa chỉ</Label>
                  <Input id="address" type="text" onChange={handleSelectAddressChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:justify-end items-center gap-3 mt-6 px-2">
            <Button size="sm" variant="outline" onClick={closeAddModal}>
              Đóng
            </Button>
            <Button size="sm" onClick={handleAdd}>
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
