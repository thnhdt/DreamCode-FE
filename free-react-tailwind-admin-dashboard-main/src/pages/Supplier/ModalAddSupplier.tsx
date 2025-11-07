import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";

export default function ModalAddSupplier({ addIsOpen, closeAddModal }: any) {
  const handleAdd = () => {
    // Handle save logic here
    console.log("Saving new supplier...");
    closeAddModal();
  };

  return (
    <Modal
      isOpen={addIsOpen}
      onClose={closeAddModal}
      className="m-4 max-w-[700px]"
    >
      <div className="relative bg-white dark:bg-gray-900 p-4 lg:p-11 rounded-3xl w-full max-w-[700px] overflow-y-auto no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Thêm nhà cung cấp mới
          </h4>
        </div>
        <form className="flex flex-col">
          <div className="px-2 pb-3 h-[450px] overflow-y-auto custom-scrollbar">
            <div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Tên nhà cung cấp</Label>
                  <Input type="text" />
                </div>
                <div>
                  <Label>Mã số thuế</Label>
                  <Input type="text" />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input type="text" />
                </div>
                <div>
                  <Label>Địa chỉ</Label>
                  <Input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
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
