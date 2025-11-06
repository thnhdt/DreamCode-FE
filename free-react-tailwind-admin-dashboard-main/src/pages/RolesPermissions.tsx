import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";

type PermissionMap = Record<string, boolean>;
type Role = { name: string; permissions: PermissionMap };

const PERMS = [
  "asset.view",
  "asset.edit",
  "asset.assign",
  "report.export",
  "user.manage",
];

export default function RolesPermissions() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("roles_perms");
    if (saved) {
      setRoles(JSON.parse(saved));
    } else {
      setRoles([
        { name: "ADMIN", permissions: { "asset.view": true, "asset.edit": true, "asset.assign": true, "report.export": true, "user.manage": true } },
        { name: "ASSET_MANAGER", permissions: { "asset.view": true, "asset.edit": true, "asset.assign": true, "report.export": true, "user.manage": false } },
        { name: "USER", permissions: { "asset.view": true, "asset.edit": false, "asset.assign": false, "report.export": false, "user.manage": false } },
      ]);
    }
  }, []);

  const toggle = (roleIdx: number, perm: string) => {
    setRoles((prev) => {
      const cloned = prev.map((r) => ({ name: r.name, permissions: { ...r.permissions } }));
      cloned[roleIdx].permissions[perm] = !cloned[roleIdx].permissions[perm];
      localStorage.setItem("roles_perms", JSON.stringify(cloned));
      return cloned;
    });
  };

  return (
    <>
      <PageMeta title="Quyền và Vai trò | Dream Code" description="Cấu hình quyền (mock)" />
      <PageBreadcrumb pageTitle="Quyền và Vai trò" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách vai trò">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                  <tr>
                    <th className="px-5 py-3 text-theme-xs text-gray-500 dark:text-gray-400">Vai trò</th>
                    {PERMS.map((p) => (
                      <th key={p} className="px-5 py-3 text-theme-xs text-gray-500 dark:text-gray-400">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {roles.map((r, idx) => (
                    <tr key={r.name}>
                      <td className="px-5 py-4 font-medium text-gray-800 dark:text-white/90">{r.name}</td>
                      {PERMS.map((p) => (
                        <td key={p} className="px-5 py-4">
                          <input type="checkbox" checked={!!r.permissions[p]} onChange={() => toggle(idx, p)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}


