import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CategoryTableOne from "../../components/tables/CategoryTables/CategoryTableOne";
import { useModal } from "../../hooks/useModal";

export default function Category() {
    const { isOpen, openModal, closeModal } = useModal();

    return <>
        <PageMeta
            title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
            description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
        />
        <PageBreadcrumb pageTitle="Category" />

        <div className="space-y-6">
            <ComponentCard title="List Category">
                <div className="flex items-end -mt-18 w-full">
                    <button
                        onClick={openModal}
                        className="lg:inline-flex flex justify-center items-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-white/[0.03] shadow-theme-xs ml-auto px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full w-full lg:w-auto font-medium text-gray-700 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400 text-sm"
                    >
                        New
                    </button>
                </div>
                <CategoryTableOne isOpen={isOpen} closeModal={closeModal} />
            </ComponentCard>
        </div>
    </>;
}
