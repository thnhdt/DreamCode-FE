import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function New() {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
  
  return (
    <div>
      <PageMeta
        title="React.js New Dashboard | Dream Code"
        description="This is React.js New Dashboard page for Dream Code"
      />
      <PageBreadcrumb pageTitle="New Page" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Chào mừng {user?.name || "Admin"} đến với trang chính
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Quản lý tài sản
          </p>
          
          {user && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-left">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">User Info:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> {user.email}
              </p>
              {user.role && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Role:</strong> {user.role}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

