import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import Button from "../components/ui/button/Button";
import { Modal } from "../components/ui/modal";
import Select from "../components/form/Select";
import Input from "../components/form/input/InputField";

type User = { id: string; name: string; email: string; department: string; role: string };

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState<{ name: string; email: string; department: string; role: string }>({ name: "", email: "", department: "", role: "USER" });

  useEffect(() => {
    setUsers([
      { id: "U-1", name: "Nguyễn Văn A", email: "a@example.com", department: "Kinh doanh", role: "USER" },
      { id: "U-2", name: "Trần Thị B", email: "b@example.com", department: "Kỹ thuật", role: "ASSET_MANAGER" },
      { id: "U-3", name: "Phạm C", email: "c@example.com", department: "Nhân sự", role: "ADMIN" },
    ]);
  }, []);

  const openAdd = () => { setEditUser(null); setForm({ name: "", email: "", department: "", role: "USER" }); setIsOpen(true); };
  const openEdit = (u: User) => { setEditUser(u); setForm({ name: u.name, email: u.email, department: u.department, role: u.role }); setIsOpen(true); };
  const onDelete = (id: string) => setUsers((prev) => prev.filter((u) => u.id !== id));
  const onSave = () => {
    if (editUser) {
      setUsers((prev) => prev.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)));
    } else {
      const id = `U-${Math.floor(Math.random() * 10000)}`;
      setUsers((prev) => [...prev, { id, ...form }]);
    }
    setIsOpen(false);
  };

  const roleOptions = ["ADMIN", "USER", "ASSET_MANAGER", "DEPT_MANAGER"].map((r) => ({ value: r, label: r }));

  return (
    <>
      <PageMeta title="Quản lý người dùng | Dream Code" description="Thêm, sửa, xóa người dùng (mock)" />
      <PageBreadcrumb pageTitle="Quản lý người dùng" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách người dùng">
          <div className="mb-4"><Button onClick={openAdd}>Thêm người dùng</Button></div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tên</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Phòng ban</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Vai trò</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Hành động</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 font-medium">{u.name}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{u.email}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{u.department}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">{u.role}</TableCell>
                      <TableCell className="px-5 py-4">
                        <div className="flex gap-3">
                          <Button size="sm" variant="outline" onClick={() => openEdit(u)}>Sửa</Button>
                          <Button size="sm" variant="destructive" onClick={() => onDelete(u.id)}>Xóa</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ComponentCard>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-[620px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-9">
          <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">{editUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</h4>
          <div className="space-y-5">
            <div>
              <Input type="text" placeholder="Tên" value={form.name} onChange={(e: any) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <Input type="email" placeholder="Email" value={form.email} onChange={(e: any) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <Input type="text" placeholder="Phòng ban" value={form.department} onChange={(e: any) => setForm((f) => ({ ...f, department: e.target.value }))} />
            </div>
            <div>
              <Select options={roleOptions} placeholder="Chọn vai trò" onChange={(val) => setForm((f) => ({ ...f, role: val }))} defaultValue={form.role} />
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>Hủy</Button>
              <Button size="sm" onClick={onSave}>Lưu</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}


