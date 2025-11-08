import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import SupplierTableOne from "./SupplierTableOne";
import { useModal } from "../../hooks/useModal";

export default function Supplier() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | Quản lý tài sản - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for Quản lý tài sản - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Quản lý nhà cung cấp" />

      <div className="space-y-6">
        <ComponentCard title="Danh sách nhà cung cấp">
          <div className="flex items-end -mt-18 w-full">
            <button
              onClick={openModal}
              className="lg:inline-flex flex justify-center items-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-white/[0.03] shadow-theme-xs ml-auto px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-full lg:w-auto font-medium text-gray-700 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400 text-sm"
            >
              New
            </button>
          </div>
          <SupplierTableOne addIsOpen={isOpen} closeAddModal={closeModal} />
        </ComponentCard>
      </div>
    </>
  );
}
