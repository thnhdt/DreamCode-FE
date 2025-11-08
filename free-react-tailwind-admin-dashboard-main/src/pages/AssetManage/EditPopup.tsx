import React, { use, useEffect, useState } from "react";
import EditModalTab from "../../components/common/EditModalTab";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/form/input/Checkbox";
import Input from "../../components/form/input/InputField";
import { getUsers } from "../../services";

export default function EditPopup({
  editIsOpen,
  closeEditModal,
  handleEdit,
  selectedAsset,
}: any) {
  const [selected, setSelected] = useState<
    "assign" | "evict" | "liquidation"
  >("assign");

  console.log("seledct", selectedAsset);


  const [isCheckedEviction, setIsCheckedEviction] = useState(false);
  const [isCheckedLiquidation, setIsCheckedLiquidation] = useState(false);

  const [listUser, setListUser] = useState([]);
  const [formData, setFormData] = useState({});
  const [revokeData, setRevokeData] = useState({});

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, userIds: [Number(value)] });
  };


  const handleSelectRevokeDate = () => {
    const value = (document.getElementById("assignment-date") as HTMLInputElement).value;

    if (!value.trim().length) return;

    const date = new Date(value); // ✅ convert string -> Date object

    const iso = date.toISOString().slice(0, 19); // ✅ "2025-11-08T07:15:00"

    console.log(iso);

    setRevokeData({ ...revokeData, revokedTime: iso });
  }

  const handleGetReasonRevoke = () => {
    const value = (document.getElementById("reason") as HTMLInputElement)
      .value;
    setRevokeData({ ...revokeData, reason: value });
  }



  useEffect(() => {
    const fetchdata = async () => {
      const res = await getUsers();
      const formattedUsers = res?.map((user: any) => ({
        value: user.id,
        label: user.userName,
      }));
      setListUser(formattedUsers);
    };
    fetchdata();
  }, []);

  console.log(listUser);

  return (
    <div
      className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${editIsOpen ? "block" : "hidden"
        }`}
    >
      <div className="bg-white dark:bg-gray-900 mx-4 mt-16 p-4 lg:p-11 px-2 rounded-3xl w-full max-w-[500px] overflow-y-auto no-scrollbar">
        <h4 className="mb-10 font-semibold text-gray-800 dark:text-white/90 text-2xl">
          Chỉnh sửa thông tin tài sản
        </h4>

        {React.createElement(EditModalTab as any, {
          selected,
          setSelected,
        })}

        <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2 mt-6">
          {selected === "assign" && (
            <>
              <div>
                <Label>Người dùng</Label>
                <Select
                  options={listUser}
                  placeholder="------------"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
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
                  id="reason"
                  className="dark:bg-dark-900"
                  placeholder="Nhập lý do thu hồi"
                  onChange={handleGetReasonRevoke}
                />
              </div>
              <div>
                <Label>Ngày thu hồi</Label>
                <DatePicker
                  id="assignment-date"
                  placeholder="Chọn ngày thu hồi"
                  onChange={handleSelectRevokeDate}
                />
              </div>
            </>
          )}

          {selected === "liquidation" && (
            <div>
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
            </div>
          )}
        </div>

        <div className="flex lg:justify-end items-center gap-3 mt-16 px-2">
          <Button
            size="sm"
            variant="outline"
            onClick={closeEditModal}
          >
            Đóng
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              const formatData = {
                ...formData,
                assetId: selectedAsset.id,
              };
              if (selected === "assign") {
                handleEdit("assign", formatData);
              } else if (selected === "evict") {
                if (!isCheckedEviction) {
                  alert("Vui lòng xác nhận thu hồi tài sản");
                  return;
                }
                handleEdit("revoke", {
                  ...revokeData,
                  assetId: selectedAsset.id,
                });
              }
            }}
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>
    </div>
  );
}
