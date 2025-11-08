import { useEffect, useState } from "react";
import { getListDeptManagerApi, postListDepartmentApi } from "../../api/adminApi";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";



export default function ModalAddDepartment({ addIsOpen, closeAddModal }: any) {
  const [listDeptManager, setListDeptManager] = useState([]);
  const [formData, setFormData] = useState({})

  const handleAdd = async () => {
    // Handle save logic here
    console.log("Saving new department...");


    console.log("formdata", formData);


    const res = await postListDepartmentApi(formData);
    console.log("create department", res);


    closeAddModal();
  };

  const handleSelectNameChange = () => {
    const departmentName = document.getElementById("deparmentName") as HTMLInputElement;
    console.log("name", departmentName.value);

    setFormData({
      ...formData,
      name: departmentName.value,
    });
  }

  const handleSelectDepparCodeChange = () => {
    const departmentCode = document.getElementById("departmentCode") as HTMLInputElement;
    setFormData({
      ...formData,
      code: departmentCode.value,
    });
  }

  const handleSelectDeptManagerChange = (e: any) => {

    setFormData({
      ...formData,
      managerId: e,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListDeptManagerApi();
      const formatData = res.data.map((manager: any) => ({
        value: manager.id,
        label: manager.userName,
      }));
      setListDeptManager(formatData);

    };
    fetchData();
  }, [])

  console.log(listDeptManager);


  return (
    <Modal
      isOpen={addIsOpen}
      onClose={closeAddModal}
      className="m-4 max-w-[700px]"
    >
      <div className="relative bg-white dark:bg-gray-900 p-4 lg:p-11 rounded-3xl w-full max-w-[700px] overflow-y-auto no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-6 font-semibold text-gray-800 dark:text-white/90 text-2xl">
            Thêm phòng ban mới
          </h4>
        </div>
        <form className="flex flex-col">
          <div className="px-2 pb-3 h-[450px] overflow-y-auto custom-scrollbar">
            <div>
              <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2">
                <div>
                  <Label>Tên phòng ban</Label>
                  <Input id="deparmentName" type="text" onChange={handleSelectNameChange} />
                </div>
                <div>
                  <Label>Mã số phòng ban</Label>
                  <Input id="departmentCode" type="text" onChange={handleSelectDepparCodeChange} />
                </div>
                <div>
                  <Label>Trưởng phòng</Label>
                  <Select
                    options={listDeptManager}
                    placeholder="------------"
                    onChange={handleSelectDeptManagerChange}
                    className="dark:bg-dark-900"
                  />
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
