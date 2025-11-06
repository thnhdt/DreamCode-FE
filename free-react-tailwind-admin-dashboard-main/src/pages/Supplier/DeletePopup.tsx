import Button from "../../components/ui/button/Button";

export default function DeletePopup({
  deleteIsOpen,
  handleDelete,
  closeDeleteModal,
}: any) {
  return (
    <div
      className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${
        deleteIsOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 mx-4 p-4 lg:p-11 rounded-3xl w-full max-w-[500px] overflow-y-auto no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Xác nhận xóa loại danh mục
          </h4>
          <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
            Bạn có chắc chắn muốn xóa loại danh mục này không? Hành động này
            không thể hoàn tác.
          </p>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
