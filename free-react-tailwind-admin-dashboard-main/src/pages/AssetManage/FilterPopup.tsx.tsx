import { useState } from "react";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import RadioButtons from "../../components/form/form-elements/RadioButtons";

const radioOptions = [
  { id: "radio-1", value: "tatCa", label: "Tất cả" },
  { id: "radio-2", value: "Đang sử dụng", label: "Đang sử dụng" },
  { id: "radio-3", value: "Kho", label: "Trong kho" },
  { id: "radio-4", value: "Hỏng", label: "Đang hỏng" },
  { id: "radio-5", value: "Thanh lý", label: "Đã thanh lý" },
];

const selectOptions01 = [
  { value: "tatCa", label: "Tất cả" },
  { value: "Nội thất", label: "Nội thất" },
  { value: "cntt", label: "Công nghệ thông tin" },
  { value: "văn phòng", label: "Văn phòng" },
];

const selectOptions02 = [
  { value: "tatCa", label: "Tất cả" },
  { value: "iT", label: "IT" },
  { value: "marketing", label: "Marketing" },
  { value: "kho", label: "Kho" },
];

interface FilterState {
  trangThaiTaiSan?: string;
  loaiTaiSan?: string;
  phongBan?: string;
}

export default function FilterPopup({
  filterIsOpen,
  closeFilterModal,
  handleFilter,
}: any) {
  const [resultFilter, setResultFilter] = useState<FilterState>({});

  const handleStatusChange = (value: string) => {
    setResultFilter({ ...resultFilter, trangThaiTaiSan: value });
  };

  const handleAssetTypeChange = (value: string) => {
    if (value === "tatCa") {
      return;
    }
    setResultFilter({ ...resultFilter, loaiTaiSan: value });
  };

  const handleDepartmentChange = (value: string) => {
    if (value === "tatCa") {
      return;
    }
    setResultFilter({ ...resultFilter, phongBan: value });
  };

  return (
    <div
      className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${
        filterIsOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 mx-4 mt-16 p-4 lg:p-11 px-2 rounded-3xl w-full max-w-[600px] overflow-y-auto no-scrollbar">
        <h4 className="mb-10 font-semibold text-gray-800 dark:text-white/90 text-2xl">
          Bộ lọc tài sản
        </h4>

        <div className="gap-x-6 gap-y-5 grid grid-cols-1 mt-6">
          <RadioButtons
            title="Trạng thái tài sản"
            options={radioOptions}
            onChange={handleStatusChange}
          />
        </div>

        <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2 mt-6">
          <div>
            <Label>Loại tài sản</Label>
            <Select
              options={selectOptions01}
              placeholder="------------"
              onChange={handleAssetTypeChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label>Phòng ban</Label>
            <Select
              options={selectOptions02}
              placeholder="------------"
              onChange={handleDepartmentChange}
              className="dark:bg-dark-900"
            />
          </div>
        </div>

        <div className="flex lg:justify-end items-center gap-3 mt-16 px-2">
          <Button size="sm" variant="outline" onClick={closeFilterModal}>
            Đóng
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              handleFilter(resultFilter);
            }}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
