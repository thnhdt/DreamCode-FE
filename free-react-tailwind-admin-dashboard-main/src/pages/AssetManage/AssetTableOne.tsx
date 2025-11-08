import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { IoIosInformationCircle } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";

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
import FilterPopup from "./FilterPopup.tsx";
import HistoryModal from "./HistoryModal.tsx";
import {
  assignAssetApi,
  deleteAssetApi,
  getListAssetApi,
} from "../../api/adminApi.ts";

export default function AssetTableOne({ addIsOpen, closeAddModal }: any) {
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [historyIsOpen, setHistoryIsOpen] = useState<boolean>(false);
  const [assets, setAssets] = useState<any>([]);
  const [filteredAssets, setFilteredAssets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    const data = assets.filter(
      (asset: any) =>
        asset.name?.includes(query) ||
        asset.id?.toString().includes(query) ||
        asset.status?.includes(query) ||
        asset.category?.name?.includes(query) ||
        asset.department?.name?.includes(query)
    );

    setFilteredAssets(data);
  };

  const handleDownloadExcel = () => {
    // 1) Tạo worksheet từ JSON
    const ws = XLSX.utils.json_to_sheet(assets);

    // 2) Tạo workbook và gắn sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tài sản");

    XLSX.writeFile(wb, "tai_san.xlsx");
  };

  const handleDelete = async () => {
    // Handle delete logic here
    console.log("Deleting item...");
    const res = await deleteAssetApi(selectedAsset);
    console.log("Delete response:", res);
    fetchListAsset();
    closeDeleteModal();
  };

  const openDeleteModal = () => {
    setDeleteIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteIsOpen(false);
  };

  const handleEdit = async (formData: any) => {
    // Handle edit logic here
    const res = await assignAssetApi(formData);

    setEditIsOpen(false);
  };

  const openEditModal = () => {
    setEditIsOpen(true);
  };

  const closeEditModal = () => {
    setEditIsOpen(false);
  };

  const handleFilter = (filteredChoices: any) => {
    console.log("Filtered choices:", filteredChoices);

    const filteredAssets = assets.filter(
      (asset: any) =>
        asset.status.includes(filteredChoices.trangThaiTaiSan) &&
        asset.type.includes(filteredChoices.loaiTaiSan || "") &&
        asset.department.includes(filteredChoices.phongBan || "")
    );

    setFilteredAssets(filteredAssets);

    setFilterIsOpen(false);
  };

  const openFilterModal = () => {
    setFilterIsOpen(true);
  };

  const closeFilterModal = () => {
    setFilterIsOpen(false);
  };

  const openHistoryModal = () => {
    setHistoryIsOpen(true);
  };

  const closeHistoryModal = () => {
    setHistoryIsOpen(false);
  };

  const fetchListAsset = async () => {
    try {
      // Call the API to get the list of assets
      const response = await getListAssetApi();
      setIsLoading(false);

      setAssets(response.data.content);
      setFilteredAssets(response.data.content);
    } catch (error) {
      console.error("Error fetching asset list:", error);
    }
  };

  useEffect(() => {
    fetchListAsset();
  }, []);

  return (
    <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-xl overflow-hidden">
      <div className="flex justify-end items-center gap-3 mb-2 pt-4 pr-4">
        <div className="hidden lg:block">
          <form>
            <div className="relative">
              <span className="top-1/2 left-4 absolute -translate-y-1/2 pointer-events-none">
                <CiSearch size={22} className="text-gray-600" />
              </span>
              <input
                ref={inputRef}
                type="text"
                onChange={handleSearch}
                placeholder="Search or type command..."
                className="bg-transparent dark:bg-dark-900 dark:bg-white/[0.03] shadow-theme-xs py-2.5 pr-14 pl-12 border border-gray-200 focus:border-brand-300 dark:border-gray-800 dark:focus:border-brand-800 rounded-lg focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 w-full xl:w-[430px] h-11 text-gray-800 dark:placeholder:text-white/30 dark:text-white/90 placeholder:text-gray-400 text-sm"
              />
            </div>
          </form>
        </div>
        {/* <button
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-white/[0.03] shadow-theme-xs px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 text-theme-sm hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400"
          onClick={openFilterModal}
        >
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
        </button> */}
        <button
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-white/[0.03] shadow-theme-xs px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 text-theme-sm hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400"
          onClick={() => {
            setFilteredAssets(assets);
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        >
          Tất cả
        </button>

        <button
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-white/[0.03] shadow-theme-xs px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 text-theme-sm hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400"
          onClick={handleDownloadExcel}
        >
          <FaDownload size={16} />
          Tải xuống
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
            {filteredAssets.map((asset: any) => (
              <TableRow key={asset.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.category?.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.status}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.user}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {asset.department?.name}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <FiEdit
                      onClick={() => {
                        setSelectedAsset(asset);
                        openEditModal();
                      }}
                      size={30}
                      className="hover:bg-blue-50 p-1 rounded-full hover:text-[#6082B6]"
                    />
                    <MdDelete
                      onClick={() => {
                        setSelectedAsset(asset);
                        openDeleteModal();
                      }}
                      size={30}
                      className="hover:bg-red-100 p-1 rounded-full hover:text-red-500"
                    />

                    <IoIosInformationCircle
                      onClick={() => {
                        setSelectedAsset(asset);
                        openHistoryModal();
                      }}
                      size={30}
                      className="hover:bg-blue-50 p-1 rounded-full hover:text-[#6082B6]"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="flex justify-center items-center bg-white h-32">
            <div className="border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin" />
          </div>
        )}
      </div>

      <ModalAddAsset
        addIsOpen={addIsOpen}
        closeAddModal={closeAddModal}
        fetchListAsset={fetchListAsset}
      />

      <EditPopup
        editIsOpen={editIsOpen}
        closeEditModal={closeEditModal}
        handleEdit={handleEdit}
        selectedAsset={selectedAsset}
      />

      <FilterPopup
        filterIsOpen={filterIsOpen}
        closeFilterModal={closeFilterModal}
        handleFilter={handleFilter}
      />

      <HistoryModal
        historyIsOpen={historyIsOpen}
        closeHistoryModal={closeHistoryModal}
      />

      <ModalConfirmDelete
        title="tài sản"
        deleteIsOpen={deleteIsOpen}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}
