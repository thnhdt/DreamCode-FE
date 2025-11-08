import { useEffect, useState } from "react";

import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import ModalAddSupplier from "./ModalAddSupplier";
import EditPopup from "./EditPopup";
import ModalConfirmDelete from "../../components/ui/modal/ModalConfirmDelete";
// import { deleteSupplierApi, getListSupplierApi } from "../../api/adminApi";



export default function DepartmentTableOne({ addIsOpen, closeAddModal }: any) {
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [supplierChosen, setSupplierChosen] = useState<any>(null);


  const handleDelete = async () => {
    // Handle delete logic here
    console.log("Deleting item...");
    const data = {
      id: supplierChosen?.id,
      isActive: false,
    }

    // const res = await deleteSupplierApi(data);
    console.log("delete", res);
    fetchListSupplier();
    closeDeleteModal();
  };

  const openDeleteModal = () => {
    setDeleteIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteIsOpen(false);
  };

  const handleEdit = () => {
    // Handle edit logic here
    console.log("Editing item...");
    setEditIsOpen(false);
  };

  const openEditModal = () => {
    setEditIsOpen(true);
  };

  const closeEditModal = () => {
    setEditIsOpen(false);
  };

  const fetchListSupplier = async () => {
    try {
      const response = await getListSupplierApi();
      console.log("List Supplier:", response.data);
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {

    fetchListSupplier();
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
                Tên nhà cung cấp
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Mã số thuế
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Địa chỉ
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
            {suppliers.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {item.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {item.taxCode}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {item.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {item.address}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-3 w-fit cursor-pointer">
                    <FiEdit
                      onClick={openEditModal}
                      size={30}
                      className="hover:bg-blue-50 p-1 rounded-full hover:text-[#6082B6]"
                    />
                    <MdDelete
                      onClick={() => {
                        openDeleteModal();
                        setSupplierChosen(item);
                      }}
                      size={30}
                      className="hover:bg-red-100 p-1 rounded-full hover:text-red-500"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ModalAddSupplier addIsOpen={addIsOpen} closeAddModal={closeAddModal} />

      <EditPopup
        editIsOpen={editIsOpen}
        closeEditModal={closeEditModal}
        handleEdit={handleEdit}
      />

      <ModalConfirmDelete
        title="nhà cung cấp"
        deleteIsOpen={deleteIsOpen}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}
