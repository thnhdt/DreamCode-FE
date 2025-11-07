import { useState } from "react";

import Button from "../../components/ui/button/Button";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const history = [
  { id: 1, action: "Gán tài sản", date: "2023-01-15", user: "Nguyễn Văn A" },
  { id: 2, action: "Thu hồi tài sản", date: "2023-02-20", user: "Trần Thị B" },
  { id: 3, action: "Thanh lý tài sản", date: "2023-03-10", user: "Lê Văn C" },
];

export default function HistoryModal({
  historyIsOpen,
  closeHistoryModal,
}: any) {
  return (
    <div
      className={`fixed inset-0 ml-[290px] flex justify-center items-center bg-black/40 bg-opacity-50 ${
        historyIsOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 mx-4 mt-16 p-4 lg:p-11 px-2 rounded-3xl min-w-[600px] max-w-[1200px] overflow-y-auto no-scrollbar">
        <h4 className="mb-10 font-semibold text-gray-800 dark:text-white/90 text-2xl">
          Lịch sử thay đổi tài sản
        </h4>

        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-white/[0.05] border-b">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
                >
                  Hành động
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
                >
                  Ngày xảy ra
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
                >
                  Người thực hiện
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                    {item.action}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                    {item.date}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-start">
                    {item.user}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex lg:justify-end items-center gap-3 mt-16 px-2">
          <Button size="sm" variant="outline" onClick={closeHistoryModal}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}
