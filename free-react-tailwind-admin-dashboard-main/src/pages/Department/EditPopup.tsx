import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";



export default function EditPopup({
  editIsOpen,
  closeEditModal,
  handleEdit,
  departmentChosen,
  listDeptManager
}: any) {
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  console.log(departmentChosen);
  console.log(listDeptManager);



  return (
    <div
      className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${editIsOpen ? "block" : "hidden"
        }`}
    >
      <div className="bg-white dark:bg-gray-900 mx-4 p-4 lg:p-11 px-2 rounded-3xl w-full max-w-[500px] overflow-y-auto no-scrollbar">
        <h4 className="mb-10 font-semibold text-gray-800 dark:text-white/90 text-2xl">
          Chỉnh sửa phòng ban
        </h4>
        <div className="">
          <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2">
            <div>
              <Label>Tên phòng ban</Label>
              <Input type="text" value={departmentChosen?.name} />
            </div>
            <div>
              <Label>Mã số phòng ban</Label>
              <Input type="text" value={departmentChosen?.code} />
            </div>
            <div>
              <Label>Trưởng phòng</Label>
              <Select
                options={listDeptManager}
                placeholder="------------"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
          </div>
        </div>

        <div className="flex lg:justify-end items-center gap-3 mt-12 px-2">
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
