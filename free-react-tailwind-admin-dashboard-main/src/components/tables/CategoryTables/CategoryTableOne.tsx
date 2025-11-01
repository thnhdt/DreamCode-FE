import { useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface Order {
  id: number;
  typeName: string;
  typeCode: string;
}

// Define the table data using the interface
const typeList: Order[] = [
  {
    id: 1,
    typeName: "Laptop / Máy tính xách tay",
    typeCode: "LAPTOP",
  },
  {
    id: 2,
    typeName: "Máy tính để bàn",
    typeCode: "DESKTOP",
  },
  {
    id: 3,
    typeName: "Màn hình / Monitor",
    typeCode: "MONITOR",
  },
  {
    id: 4,
    typeName: "Máy in",
    typeCode: "PRINTER",
  },
  {
    id: 5,
    typeName: "Thiết bị mạng (Router / Switch)",
    typeCode: "NETWORK",
  },
  {
    id: 6,
    typeName: "Điện thoại bàn / Tổng đài VoIP",
    typeCode: "PHONE",
  },
  {
    id: 7,
    typeName: "Bàn làm việc",
    typeCode: "DESK",
  },
  {
    id: 8,
    typeName: "Ghế văn phòng",
    typeCode: "CHAIR",
  },
  {
    id: 9,
    typeName: "Tủ / Kệ hồ sơ",
    typeCode: "STORAGE",
  },
  {
    id: 10,
    typeName: "Xe công tác / Phương tiện di chuyển",
    typeCode: "VEHICLE",
  },
];

export default function BasicTableOne({ isOpen, closeModal }: any) {
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    handleDeleteCloseModal();
  };

  const handleOpenDeleteModal = () => {
    setDeleteIsOpen(true);
  };

  const handleDeleteCloseModal = () => {
    setDeleteIsOpen(false);
  };

  return (
    <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-xl overflow-hidden">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-white/[0.05] border-b">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Type name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Type code
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {typeList.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {order.typeName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  {order.typeCode}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                  <div
                    className="w-fit hover:text-red-500 cursor-pointer"
                    onClick={handleOpenDeleteModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="25"
                      height="25"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                    </svg>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <div className="relative bg-white dark:bg-gray-900 p-4 lg:p-11 rounded-3xl w-full max-w-[700px] overflow-y-auto no-scrollbar">
          <div className="px-2 pr-14">
            <h4 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-2xl">
              New Category Type
            </h4>
            <p className="mb-6 lg:mb-7 text-gray-500 dark:text-gray-400 text-sm">
              Add new category type information and necessary details here.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 pb-3 h-[450px] overflow-y-auto custom-scrollbar">
              <div>
                <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    <Label>Type name</Label>
                    <Input type="text" />
                  </div>

                  <div>
                    <Label>Type code</Label>
                    <Input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex lg:justify-end items-center gap-3 mt-6 px-2">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* popup confirm delete */}
      <div
        className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${deleteIsOpen ? "block" : "hidden"
          }`}
      >
        <div className="bg-white dark:bg-gray-900 mx-4 p-4 lg:p-11 rounded-3xl w-full max-w-[500px] overflow-y-auto no-scrollbar">
          <div className="px-2 pr-14">
            <h4 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-2xl">
              Confirm Delete
            </h4>
            <p className="mb-6 lg:mb-7 text-gray-500 dark:text-gray-400 text-sm">
              Are you sure you want to delete this category type? This action
              cannot be undone.
            </p>
          </div>

          <div className="flex lg:justify-end items-center gap-3 mt-6 px-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleDeleteCloseModal}
            >
              Cancel
            </Button>
            <Button size="sm" variant="destructive" onClick={handleSave}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
