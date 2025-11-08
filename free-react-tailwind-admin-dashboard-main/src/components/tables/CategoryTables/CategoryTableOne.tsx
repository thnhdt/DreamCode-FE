import { useEffect, useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";

import { MdDelete } from "react-icons/md";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { createCategoryApi, deleteCategoryApi, getListCategoryApi } from "../../../api/adminApi";




export default function CategoryTableOne({ isOpen, closeModal }: any) {
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
  const [listCategory, setListCategory] = useState<any>([]);
  const [formdata, setFormData] = useState({});
  const [categoryChosen, setCategoryChosen] = useState<any>(null);

  const handleCreate = async () => {
    // Handle save logic here
    console.log("Saving changes...");
    const res = await createCategoryApi(formdata);

    console.log("create category", res);
    closeModal();

  };

  const handleSelectName = () => {
    const name = document.getElementById("categoryName") as HTMLInputElement;
    const categoryName = name.value;
    console.log("name", categoryName);
    setFormData({ ...formdata, name: categoryName });
  };

  const handleSelectCode = () => {
    const code = document.getElementById("categoryCode") as HTMLInputElement;
    const categoryCode = code.value;
    console.log("code", categoryCode);
    setFormData({ ...formdata, code: categoryCode });
  };

  const handleDelete = async () => {
    // Handle save logic here
    console.log("Delete changes...");
    const res = await deleteCategoryApi(categoryChosen);

    fetchData();
    closeDeleteModal();


    if (res.status !== 200) {
      alert("Xóa loại tài sản thất bại");
    }
  };

  const openDeleteModal = () => {
    setDeleteIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteIsOpen(false);
  };

  const fetchData = async () => {
    // Fetch data logic here
    const res = await getListCategoryApi();
    console.log("Category List:", res.data.content);
    setListCategory(res.data.content);
  }

  useEffect(() => {

    fetchData();
  }, [])


  return (
    <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-xl overflow-hidden">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-white/[0.05] border-b">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Tên loại
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Mã loại
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {listCategory?.map((category: any) => (
              <TableRow key={category.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {category.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {category.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  <div
                    className="hover:bg-red-100 ml-3 p-1 rounded-full w-fit hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setCategoryChosen(category);
                      openDeleteModal();
                    }}
                  >
                    <MdDelete size={24} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <div className="relative bg-white dark:bg-gray-900 p-4 lg:p-11 rounded-3xl w-full max-w-[700px] overflow-y-auto no-scrollbar">
          <div className="px-2 pr-14">
            <h4 className="mb-6 font-semibold text-gray-800 dark:text-white/90 text-2xl">
              Thêm loại tài sản mới
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="px-2 pb-3 h-[450px] overflow-y-auto custom-scrollbar">
              <div>
                <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    <Label>Tên loại</Label>
                    <Input id="categoryName" type="text" onChange={handleSelectName} />
                  </div>

                  <div>
                    <Label>Mã loại</Label>
                    <Input id="categoryCode" type="text" onChange={handleSelectCode} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex lg:justify-end items-center gap-3 mt-6 px-2">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Đóng
              </Button>
              <Button size="sm" onClick={handleCreate}>
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* popup confirm delete */}
      <div
        className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${deleteIsOpen ? "block" : "hidden"
          }`}
      >
        <div className="bg-white dark:bg-gray-900 mx-4 p-4 lg:p-11 rounded-3xl w-full max-w-[500px] overflow-y-auto no-scrollbar">
          <div className="px-2 pr-14">
            <h4 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-2xl">
              Xác nhận xóa loại tài sản
            </h4>
            <p className="mb-6 lg:mb-7 text-gray-500 dark:text-gray-400 text-sm">
              Bạn có chắc chắn muốn xóa loại tài sản này? Hành động này không
              thể hoàn tác.
            </p>
          </div>

          <div className="flex lg:justify-end items-center gap-3 mt-6 px-2">
            <Button size="sm" variant="outline" onClick={closeDeleteModal}>
              Đóng
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
