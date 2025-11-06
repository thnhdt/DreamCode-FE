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

import ModalAddAsset from "./ModalAddAsset";
import EditPopup from "./EditPopup";
import ModalConfirmDelete from "../../components/ui/modal/ModalConfirmDelete";

export interface Asset {
  id: number;
  assetName: string;
  assetCode: string;
  type: string;
  status: "Đang sử dụng" | "Sẵn sàng" | "Hỏng" | "Thanh lý";
  user: string;
  department: string;
}

export const assetList: Asset[] = [
  {
    id: 1,
    assetName: "Laptop Dell XPS 15",
    assetCode: "AS-001",
    type: "Thiết bị CNTT",
    status: "Đang sử dụng",
    user: "Nguyễn Văn A",
    department: "Phòng IT",
  },
  {
    id: 2,
    assetName: "Máy in HP LaserJet Pro",
    assetCode: "AS-002",
    type: "Thiết bị văn phòng",
    status: "Sẵn sàng",
    user: "-",
    department: "Kho",
  },
  {
    id: 3,
    assetName: "Màn hình Samsung 27 inch",
    assetCode: "AS-003",
    type: "Thiết bị CNTT",
    status: "Đang sử dụng",
    user: "Lê Thị B",
    department: "Phòng Marketing",
  },
  {
    id: 4,
    assetName: "Bàn làm việc gỗ",
    assetCode: "AS-004",
    type: "Nội thất",
    status: "Sẵn sàng",
    user: "-",
    department: "Kho",
  },
  {
    id: 5,
    assetName: "Ghế xoay văn phòng",
    assetCode: "AS-005",
    type: "Nội thất",
    status: "Đang sử dụng",
    user: "Trần Văn C",
    department: "Phòng Kinh Doanh",
  },
  {
    id: 6,
    assetName: "MacBook Pro 14 M1",
    assetCode: "AS-006",
    type: "Thiết bị CNTT",
    status: "Đang sử dụng",
    user: "Phạm Văn D",
    department: "Phòng IT",
  },
  {
    id: 7,
    assetName: "Điện thoại IP Cisco",
    assetCode: "AS-007",
    type: "Thiết bị mạng",
    status: "Hỏng",
    user: "-",
    department: "Kho",
  },
  {
    id: 8,
    assetName: "Router WiFi TP-Link",
    assetCode: "AS-008",
    type: "Thiết bị mạng",
    status: "Sẵn sàng",
    user: "-",
    department: "Kho",
  },
  {
    id: 9,
    assetName: "Máy chiếu Sony VPL",
    assetCode: "AS-009",
    type: "Thiết bị văn phòng",
    status: "Đang sử dụng",
    user: "Đặng Thị E",
    department: "Phòng Đào Tạo",
  },
  {
    id: 10,
    assetName: "Ổ cứng SSD 1TB Samsung",
    assetCode: "AS-010",
    type: "Thiết bị CNTT",
    status: "Thanh lý",
    user: "-",
    department: "Kho",
  },
];

export default function AssetTableOne({ addIsOpen, closeAddModal }: any) {
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
      <div className="flex justify-end items-center gap-3 mb-2 pt-4 pr-4">
        <div className="hidden lg:block">
          <form>
            <div className="relative">
              <span className="top-1/2 left-4 absolute -translate-y-1/2 pointer-events-none">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                // ref={inputRef}
                type="text"
                placeholder="Search or type command..."
                className="bg-transparent dark:bg-dark-900 dark:bg-white/[0.03] shadow-theme-xs py-2.5 pr-14 pl-12 border border-gray-200 focus:border-brand-300 dark:border-gray-800 dark:focus:border-brand-800 rounded-lg focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 w-full xl:w-[430px] h-11 text-gray-800 dark:placeholder:text-white/30 dark:text-white/90 placeholder:text-gray-400 text-sm"
              />
            </div>
          </form>
        </div>
        <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-white/[0.03] shadow-theme-xs px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 text-theme-sm hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400">
          <svg
            className="fill-white dark:fill-gray-800 stroke-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29004 5.90393H17.7067"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.7075 14.0961H2.29085"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
              fill=""
              stroke=""
              strokeWidth="1.5"
            />
            <path
              d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
              fill=""
              stroke=""
              strokeWidth="1.5"
            />
          </svg>
          Filter
        </button>
        <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-white/[0.03] shadow-theme-xs px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 text-theme-sm hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400">
          See all
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-white/[0.05] border-b">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Tên tài sản
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Mã tài sản
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Loại
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Trạng thái
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Người dùng
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Phòng ban
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
            {assetList.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.assetName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.assetCode}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.type}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.status}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.user}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.department}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-3 w-fit cursor-pointer">
                    <FiEdit
                      onClick={openEditModal}
                      size={30}
                      className="hover:bg-blue-50 p-1 rounded-full hover:text-[#6082B6]"
                    />
                    <MdDelete
                      //   onClick={openDeleteModal}
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

      <ModalAddAsset addIsOpen={addIsOpen} closeAddModal={closeAddModal} />

      <EditPopup
        editIsOpen={editIsOpen}
        closeEditModal={closeEditModal}
        handleEdit={handleEdit}
      />

      <ModalConfirmDelete
        title="phòng ban"
        deleteIsOpen={deleteIsOpen}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}
