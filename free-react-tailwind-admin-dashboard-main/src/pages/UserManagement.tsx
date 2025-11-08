import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Button from "../components/ui/button/Button";
import { Modal } from "../components/ui/modal";
import Select from "../components/form/Select";
import Input from "../components/form/input/InputField";
import { getUsers, createUser, updateUser } from "../services/admin/userService";
import { getActiveDepartments } from "../services/admin/departmentService";
import { UserResponse, DepartmentResponse, PaginatedResponse } from "../types/admin.types";

export default function UserManagement() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState<UserResponse | null>(null);
  const [form, setForm] = useState<{
    userName: string;
    password: string;
    avatarKey: string;
    departmentId: string;
    role: string;
    isActive: boolean;
  }>({
    userName: "",
    password: "",
    avatarKey: "avatar_default.png",
    departmentId: "",
    role: "USER",
    isActive: true,
  });

  // Fetch users and departments
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch users
        const usersData = await getUsers();
        const usersList = Array.isArray(usersData)
          ? usersData
          : (usersData as PaginatedResponse<UserResponse>).data || [];
        setUsers(usersList);
        setFilteredUsers(usersList);

        // Fetch departments
        const deptsData = await getActiveDepartments();
        console.log("hehe", deptsData);
        const deptsList = Array.isArray(deptsData)
          ? deptsData
          : (deptsData as PaginatedResponse<DepartmentResponse>).data || [];
        setDepartments(deptsList);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Không thể tải dữ liệu";
        setError(errorMessage);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter users when department selection changes
  useEffect(() => {
    if (!selectedDepartment || selectedDepartment === "all") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) => user.department?.id?.toString() === selectedDepartment
      );
      setFilteredUsers(filtered);
    }
  }, [selectedDepartment, users]);

  const openAdd = () => {
    setEditUser(null);
    setForm({
      userName: "",
      password: "",
      avatarKey: "avatar_default.png",
      departmentId: "",
      role: "USER",
      isActive: true,
    });
    setIsOpen(true);
  };

  const openEdit = (u: UserResponse) => {
    setEditUser(u);
    setForm({
      userName: u.userName,
      password: "",
      avatarKey: u.avatarKey,
      departmentId: u.department?.id?.toString() || "",
      role: u.roles?.[0]?.name || "USER",
      isActive: u.isActive,
    });
    setIsOpen(true);
  };

  const onSave = async () => {
    if (!form.userName.trim()) {
      setError("Tên người dùng không được để trống");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (editUser) {
        // Update user
        const updateData = {
          avatarKey: form.avatarKey,
          isActive: form.isActive,
          roles: [form.role],
          ...(form.departmentId && { departmentId: parseInt(form.departmentId) }),
          ...(form.password && { password: form.password }),
        };
        const updatedUser = await updateUser(editUser.id, updateData);
        setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      } else {
        // Create user
        if (!form.password.trim()) {
          setError("Mật khẩu không được để trống");
          setLoading(false);
          return;
        }
        if (!form.departmentId) {
          setError("Vui lòng chọn phòng ban");
          setLoading(false);
          return;
        }

        const newUser = await createUser({
          userName: form.userName,
          password: form.password,
          avatarKey: form.avatarKey,
          isActive: form.isActive,
          roles: [form.role],
          departmentId: parseInt(form.departmentId),
        });
        setUsers((prev) => [...prev, newUser]);
      }
      setIsOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Không thể lưu người dùng";
      setError(errorMessage);
      console.error("Error saving user:", err);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = ["ADMIN", "USER", "ASSET_MANAGER"].map((r) => ({
    value: r,
    label: r,
  }));

  const departmentOptions = departments.map((d) => ({
    value: d.id.toString(),
    label: d.name,
  }));

  const departmentFilterOptions = [
    { value: "all", label: "Tất cả phòng ban" },
    ...departmentOptions,
  ];

  return (
    <>
      <PageMeta title="Quản lý người dùng | Dream Code" description="Thêm, sửa người dùng" />
      <PageBreadcrumb pageTitle="Quản lý người dùng" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách người dùng">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button onClick={openAdd} disabled={loading}>
                Thêm người dùng
              </Button>

              {/* Department Filter */}
              <div className="w-full sm:w-64">
                <Select
                  options={departmentFilterOptions}
                  placeholder="Lọc theo phòng ban"
                  onChange={(val) => setSelectedDepartment(val)}
                  defaultValue="all"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
          </div>

          {/* Show filter info */}
          {selectedDepartment && selectedDepartment !== "all" && (
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Đang hiển thị: {filteredUsers.length} người dùng trong phòng{" "}
                <span className="font-semibold">
                  {departments.find((d) => d.id.toString() === selectedDepartment)?.name}
                </span>
              </span>
              <button
                onClick={() => setSelectedDepartment("all")}
                className="text-sm text-brand-500 hover:text-brand-600 underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}

          {loading && !users.length ? (
            <div className="text-center py-8 text-gray-500">Đang tải...</div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Tên người dùng
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Phòng ban
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Vai trò
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Trạng thái
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="px-5 py-8 text-center text-gray-500">
                          {selectedDepartment && selectedDepartment !== "all"
                            ? "Không có người dùng nào trong phòng ban này"
                            : "Không có dữ liệu"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">
                            {u.userName}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                            {u.department?.name || "Chưa có"}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                            {u.roles?.map((r) => r.name).join(", ") || "USER"}
                          </TableCell>
                          <TableCell className="px-5 py-4">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${u.isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                            >
                              {u.isActive ? "Hoạt động" : "Không hoạt động"}
                            </span>
                          </TableCell>
                          <TableCell className="px-5 py-4">
                            <div className="flex gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEdit(u)}
                                disabled={loading}
                              >
                                Sửa
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-[620px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-9">
          <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {editUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
          </h4>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Tên người dùng <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập tên người dùng"
                value={form.userName}
                onChange={(e) => setForm((f) => ({ ...f, userName: e.target.value }))}
                disabled={loading}
              />
            </div>

            {!editUser && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  disabled={loading}
                />
              </div>
            )}

            {editUser && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mật khẩu mới (để trống nếu không đổi)
                </label>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Phòng ban <span className="text-red-500">*</span>
              </label>
              <div className={loading ? "opacity-50 pointer-events-none" : ""}>
                <Select
                  key={`dept-${form.departmentId}-${editUser?.id || 'new'}`} // Thêm key để force re-render
                  options={departmentOptions}
                  placeholder="Chọn phòng ban"
                  onChange={(val) => setForm((f) => ({ ...f, departmentId: val }))}
                  defaultValue={form.departmentId}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Vai trò <span className="text-red-500">*</span>
              </label>
              <div className={loading ? "opacity-50 pointer-events-none" : ""}>
                <Select
                  options={roleOptions}
                  placeholder="Chọn vai trò"
                  onChange={(val) => setForm((f) => ({ ...f, role: val }))}
                  value={form.role} // Thêm value thay vì defaultValue
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  disabled={loading}
                  className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hoạt động
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  setError("");
                }}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button size="sm" onClick={onSave} disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}