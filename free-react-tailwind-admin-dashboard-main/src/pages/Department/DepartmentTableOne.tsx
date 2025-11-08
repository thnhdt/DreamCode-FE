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

import ModalAddDepartment from "./ModalAddDepartment";
import EditPopup from "./EditPopup";
import ModalConfirmDelete from "../../components/ui/modal/ModalConfirmDelete";

import { deleteDepartmentApi, getListDeptManagerApi } from "../../api/adminApi";
import { getDepartments } from "../../services/admin";
import { DepartmentResponse, PaginatedResponse } from "../../types/admin.types";

interface DepartmentTableOneProps {
  addIsOpen: boolean;
  closeAddModal: () => void;
}

export default function DepartmentTableOne({ addIsOpen, closeAddModal }: DepartmentTableOneProps) {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [departmentChosen, setDepartmentChosen] = useState<DepartmentResponse | null>(null);
  const [listDeptManager, setListDeptManager] = useState<{ value: number; label: string }[]>([]);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!departmentChosen) return;
    const data = { id: departmentChosen.id, isActive: false };
    try {
      await deleteDepartmentApi(data);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    } finally {
      closeDeleteModal();
    }
  };

  const openDeleteModal = () => setDeleteIsOpen(true);
  const closeDeleteModal = () => setDeleteIsOpen(false);

  const handleEdit = () => setEditIsOpen(false);
  const openEditModal = () => setEditIsOpen(true);
  const closeEditModal = () => setEditIsOpen(false);

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getDepartments();
      const departmentsList = Array.isArray(data)
        ? data
        : (data as PaginatedResponse<DepartmentResponse>).data || [];
      setDepartments(departmentsList);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Không thể tải danh sách phòng ban");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchManagers = async () => {
      const res = await getListDeptManagerApi();
      const formatData = res.data.map((manager: any) => ({
        value: manager.id,
        label: manager.userName,
      }));
      setListDeptManager(formatData);
    };
    fetchManagers();
  }, []);

  return (
    <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-xl overflow-hidden">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-white/[0.05] border-b">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start">
                Tên phòng ban
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start">
                Mã số phòng ban
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start">
                Trưởng phòng
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start">
                Hành động
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {departments.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start">
                  {item.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start">
                  {item.code || item.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start">
                  {item.manager?.userName || "Chưa có"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  <div className="flex items-center gap-3 w-fit">
                    <button
                      onClick={() => {
                        setDepartmentChosen(item);
                        openEditModal();
                      }}
                      className="cursor-pointer hover:bg-blue-50 p-1 rounded-full hover:text-[#6082B6] transition-colors"
                      type="button"
                      aria-label="Edit department"
                    >
                      <FiEdit size={24} />
                    </button>

                    <button
                      onClick={() => {
                        setDepartmentChosen(item);
                        openDeleteModal();
                      }}
                      className="cursor-pointer hover:bg-red-100 p-1 rounded-full hover:text-red-500 transition-colors"
                      type="button"
                      aria-label="Delete department"
                    >
                      <MdDelete size={24} />
                    </button>
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

        {departments.length === 0 && !isLoading && (
          <div className="flex justify-center items-center bg-white h-32">
            <p className="text-gray-500 text-theme-sm">Không có dữ liệu</p>
          </div>
        )}
      </div>

      <ModalAddDepartment
        addIsOpen={addIsOpen}
        closeAddModal={closeAddModal}
        listDeptManager={listDeptManager}
        setListDeptManager={setListDeptManager}
      />

      <EditPopup
        editIsOpen={editIsOpen}
        closeEditModal={closeEditModal}
        handleEdit={handleEdit}
        departmentChosen={departmentChosen}
        listDeptManager={listDeptManager}
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
