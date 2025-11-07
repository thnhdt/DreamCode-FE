import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function EditPopup({
  editIsOpen,
  closeEditModal,
  handleEdit,
}: any) {
  return (
    <div
      className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${
        editIsOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 mx-4 p-4 lg:p-11 px-2 rounded-3xl w-full max-w-[500px] overflow-y-auto no-scrollbar">
        <h4 className="mb-10 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Chỉnh sửa nhà cung cấp
        </h4>
        <div className="">
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

        <div className="flex items-center gap-3 px-2 mt-12 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeEditModal}>
            Đóng
          </Button>
          <Button size="sm" variant="primary" onClick={handleEdit}>
            Chỉnh sửa
          </Button>
        </div>
      </div>
    </div>
  );
}
