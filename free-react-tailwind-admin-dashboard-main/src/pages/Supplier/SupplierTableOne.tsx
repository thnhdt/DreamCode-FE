import { useState } from "react";

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

interface Order {
  id: number;
  typeName: string;
  typeCode: string;
}

// Define the table data using the interface
const typeList: Order[] = [
  {
    id: 1,
    typeName: "Laptop / Máy tính xách tay",
    typeCode: "LAPTOP",
  },
  {
    id: 2,
    typeName: "Máy tính để bàn",
    typeCode: "DESKTOP",
  },
  {
    id: 3,
    typeName: "Màn hình / Monitor",
    typeCode: "MONITOR",
  },
  {
    id: 4,
    typeName: "Máy in",
    typeCode: "PRINTER",
  },
  {
    id: 5,
    typeName: "Thiết bị mạng (Router / Switch)",
    typeCode: "NETWORK",
  },
  {
    id: 6,
    typeName: "Điện thoại bàn / Tổng đài VoIP",
    typeCode: "PHONE",
  },
  {
    id: 7,
    typeName: "Bàn làm việc",
    typeCode: "DESK",
  },
  {
    id: 8,
    typeName: "Ghế văn phòng",
    typeCode: "CHAIR",
  },
  {
    id: 9,
    typeName: "Tủ / Kệ hồ sơ",
    typeCode: "STORAGE",
  },
  {
    id: 10,
    typeName: "Xe công tác / Phương tiện di chuyển",
    typeCode: "VEHICLE",
  },
];

export default function DepartmentTableOne({ addIsOpen, closeAddModal }: any) {
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting item...");
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
                SĐT
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
            {typeList.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {order.typeName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {order.typeCode}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {order.typeCode}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {order.typeCode}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-3 w-fit cursor-pointer">
                    <FiEdit
                      onClick={openEditModal}
                      size={30}
                      className="hover:bg-blue-50 p-1 rounded-full hover:text-[#6082B6]"
                    />
                    <MdDelete
                      onClick={openDeleteModal}
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
