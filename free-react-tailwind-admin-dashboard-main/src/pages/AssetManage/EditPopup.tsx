import React, { useState } from "react";
import EditModalTab from "../../components/common/EditModalTab";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/form/input/Checkbox";
import Input from "../../components/form/input/InputField";

const options = [
  { value: "option1", label: "Nguyễn Văn A" },
  { value: "option2", label: "Trần Thị B" },
  { value: "option3", label: "Lê Văn C" },
];

export default function EditPopup({
  editIsOpen,
  closeEditModal,
  handleEdit,
}: any) {
  const [selected, setSelected] = useState<"assign" | "evict" | "liquidation">(
    "assign"
  );

  const [isCheckedEviction, setIsCheckedEviction] = useState(false);
  const [isCheckedLiquidation, setIsCheckedLiquidation] = useState(false);

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div
      className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${
        editIsOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 mx-4 mt-16 p-4 lg:p-11 px-2 rounded-3xl w-full max-w-[500px] overflow-y-auto no-scrollbar">
        <h4 className="mb-10 font-semibold text-gray-800 dark:text-white/90 text-2xl">
          Chỉnh sửa thông tin tài sản
        </h4>

        {React.createElement(EditModalTab as any, { selected, setSelected })}

        <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2 mt-6">
          {selected === "assign" && (
            <>
              <div>
                <Label>Người dùng</Label>
                <Select
                  options={options}
                  defaultValue={options[1].value}
                  placeholder="------------"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
              </div>
              <div>
                <Label>Ngày gán</Label>
                <DatePicker id="assignment-date" placeholder="Chọn ngày gán" />
              </div>
            </>
          )}
          {selected === "evict" && (
            <>
              <div>
                <Checkbox
                  checked={isCheckedEviction}
                  onChange={setIsCheckedEviction}
                  label="Xác nhận thu hồi tài sản"
                />
              </div>
              <div></div>
              <div>
                <Label>Lý do thu hồi</Label>
                <Input
                  className="dark:bg-dark-900"
                  placeholder="Nhập lý do thu hồi"
                />
              </div>
              <div>
                <Label>Ngày thu hồi</Label>
                <DatePicker
                  id="assignment-date"
                  placeholder="Chọn ngày thu hồi"
                />
              </div>
            </>
          )}

          {selected === "liquidation" && (
            <>
              <div>
                <Checkbox
                  checked={isCheckedLiquidation}
                  onChange={setIsCheckedLiquidation}
                  label="Xác nhận thanh lý tài sản"
                />
              </div>
              <div></div>
              <div>
                <Label>Lý do thanh lý</Label>
                <Input
                  className="dark:bg-dark-900"
                  placeholder="Nhập lý do thanh lý"
                />
              </div>
              <div>
                <Label>Ngày thanh lý</Label>
                <DatePicker
                  id="assignment-date"
                  placeholder="Chọn ngày thanh lý"
                />
              </div>
              <div>
                <Label>Giá trị thu hồi (nếu có)</Label>
                <Input
                  id="recovery-value"
                  placeholder="Nhập giá trị thu hồi"
                  className="dark:bg-dark-900"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex lg:justify-end items-center gap-3 mt-16 px-2">
          <Button size="sm" variant="outline" onClick={closeEditModal}>
            Đóng
          </Button>
          <Button size="sm" variant="primary" onClick={handleEdit}>
            Chỉnh sửa
          </Button>
        </div>
      </div>
    </div>
  );
}
