import DatePicker from "../../components/form/date-picker";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";

const options = [
    { value: "option1", label: "Nguyễn Văn A" },
    { value: "option2", label: "Trần Thị B" },
    { value: "option3", label: "Lê Văn C" },
];

export default function ModalAddAsset({ addIsOpen, closeAddModal }: any) {
    const handleAdd = () => {
        // Handle save logic here
        console.log("Saving new asset...");
        closeAddModal();
    };
    const handleSelectChange = (value: string) => {
        console.log("Selected value:", value);
    };
    return (
        <Modal
            isOpen={addIsOpen}
            onClose={closeAddModal}
            className="m-4 max-w-[700px]"
        >
            <div className="relative bg-white dark:bg-gray-900 p-4 lg:p-11 rounded-3xl w-full max-w-[700px] overflow-y-auto no-scrollbar">
                <div className="px-2 pr-14">
                    <h4 className="mb-6 font-semibold text-gray-800 dark:text-white/90 text-2xl">
                        Thêm tài sản mới
                    </h4>
                </div>
                <form className="flex flex-col">
                    <div className="px-2 pb-3 h-[450px] overflow-y-auto custom-scrollbar">
                        <div>
                            <div className="gap-x-6 gap-y-5 grid grid-cols-1 lg:grid-cols-2">
                                <div>
                                    <Label>Tên tài sản</Label>
                                    <Input type="text" />
                                </div>
                                <div>
                                    <Label>Loại tài sản</Label>
                                    <Select
                                        options={options}
                                        placeholder="------------"
                                        onChange={handleSelectChange}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <div>
                                    <Label>Nhà cung cấp</Label>
                                    <Input type="text" />
                                </div>
                                <div>
                                    <Label>Ngày mua</Label>
                                    <DatePicker
                                        id="purchase-date"
                                        placeholder="Chọn ngày mua"
                                    />
                                </div>

                                <div>
                                    <Label>Thời gian khấu hao </Label>
                                    <Input type="number" placeholder="Tháng" />
                                </div>
                                <div>
                                    <Label>Thời gian bảo hành</Label>
                                    <Input type="number" placeholder="Tháng" />
                                </div>
                                <div>
                                    <Label>Mã serial</Label>
                                    <Input type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:justify-end items-center gap-3 mt-6 px-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={closeAddModal}
                        >
                            Đóng
                        </Button>
                        <Button size="sm" onClick={handleAdd}>
                            Thêm
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
