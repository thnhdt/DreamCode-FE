import { useEffect, useState } from "react";
import DatePicker from "../../components/form/date-picker";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { createAssetApi, getListCategoryApi, getListSupplierApi } from "../../api/adminApi";



export default function ModalAddAsset({ addIsOpen, closeAddModal }: any) {
    const [formData, setFormData] = useState({});
    const [listCategory, setListCategory] = useState<any>([]);
    const [suppliers, setSuppliers] = useState<any>([]);

    console.log("list", listCategory);
    console.log("suppliers", suppliers);

    const handleAdd = async () => {
        // Handle save logic here
        console.log("Saving new asset...");
        console.log("form", formData);

        const formatData = {
            ...formData,
            location: 'HCM',
            description: 'jksjsdf',
            departmentId: 8,
        }

        const res = await createAssetApi(formatData);
        console.log("create asset", res);

        closeAddModal();
    };

    const handleSelectName = () => {
        const assetName = document.getElementById(
            "assetName"
        ) as HTMLInputElement;

        setFormData({
            ...formData,
            name: assetName.value,
        });
    };

    const handleSelectCategory = (e: any) => {
        setFormData({
            ...formData,
            categoryId: e,
        });
    }

    const handleSelectSupplier = (e: any) => {
        setFormData({
            ...formData,
            supplierId: e,
        });
    }

    const handleSelectValue = () => {
        const assetValue = document.getElementById(
            "assetValue"
        ) as HTMLInputElement;

        setFormData({
            ...formData,
            value: assetValue.value,
        });
    }

    const handleSelectPurchaseDate = (date: any) => {
        setFormData({
            ...formData,
            purchaseDate: date[0],
        });
    }


    const handleSelectDepreciationTime = () => {
        const depreciationTime = document.getElementById(
            "tgKhauHao"
        ) as HTMLInputElement;
        setFormData({
            ...formData,
            usefulLifeMonths: depreciationTime.value,
        });
    }


    const fetchCategory = async () => {
        // Fetch data logic here
        const res = await getListCategoryApi();
        const formatData = res.data.content.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setListCategory(formatData);
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    console.log(listCategory);


    const fetchListSupplier = async () => {
        try {
            const response = await getListSupplierApi();
            console.log("List Supplier:", response.data);
            const formatData = response.data.map((item: any) => ({
                value: item.id,
                label: item.name,
            }));
            setSuppliers(formatData);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    useEffect(() => {

        fetchListSupplier();
    }, [])

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
                                    <Input id="assetName" type="text" onChange={handleSelectName} />
                                </div>
                                <div>
                                    <Label>Loại tài sản</Label>
                                    <Select
                                        options={listCategory}
                                        placeholder="------------"
                                        onChange={handleSelectCategory}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <div>
                                    <Label>Nhà cung cấp</Label>
                                    <Select
                                        options={suppliers}
                                        placeholder="------------"
                                        onChange={handleSelectSupplier}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <div>
                                    <Label>Giá trị</Label>
                                    <Input id="assetValue" type="text" onChange={handleSelectValue} />
                                </div>
                                <div>
                                    <Label>Ngày mua</Label>
                                    <DatePicker
                                        id="purchase-date"
                                        placeholder="Chọn ngày mua"
                                        onChange={handleSelectPurchaseDate}
                                    />
                                </div>

                                <div>
                                    <Label>Thời gian khấu hao </Label>
                                    <Input id="tgKhauHao" type="number" placeholder="Tháng" onChange={handleSelectDepreciationTime} />
                                </div>
                                {/* <div>
                                    <Label>Mã serial</Label>
                                    <Input type="text" onChange={handleSelectSerialNumber} />
                                </div> */}
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
