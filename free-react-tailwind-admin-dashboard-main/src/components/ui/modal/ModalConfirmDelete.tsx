import Button from "../button/Button";

export default function ModalConfirmDelete({
  title,
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
          <h4 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-2xl">
            Xác nhận xóa {title}
          </h4>
          <p className="mb-6 lg:mb-7 text-gray-500 dark:text-gray-400 text-sm">
            Bạn có chắc chắn muốn xóa {title} không? Hành động này không thể
            hoàn tác.
          </p>
        </div>

        <div className="flex lg:justify-end items-center gap-3 mt-6 px-2">
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
