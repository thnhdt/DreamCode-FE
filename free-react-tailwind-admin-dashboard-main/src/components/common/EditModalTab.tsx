const EditModalTab: React.FC = ({ selected, setSelected }: any) => {
  const getButtonClass = (option: "assign" | "evict" | "liquidation") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg">
      <button
        onClick={() => setSelected("assign")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "assign"
        )}`}
      >
        Gán
      </button>

      <button
        onClick={() => setSelected("evict")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "evict"
        )}`}
      >
        Thu hồi
      </button>

      <button
        onClick={() => setSelected("liquidation")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          "liquidation"
        )}`}
      >
        Thanh lý
      </button>
    </div>
  );
};

export default EditModalTab;
