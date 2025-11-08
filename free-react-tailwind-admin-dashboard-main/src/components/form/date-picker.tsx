import { useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "../../icons";
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}: PropsType) {
  useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",

      enableTime: true,
      enableSeconds: true,
      time_24hr: true,

      // Hiển thị trên input: 2025-11-08 07:15:00
      dateFormat: "Y-m-d H:i:S",

      // Format khi export: 2025-11-08T07:15:00
      altInput: false,
      altFormat: "Y-m-d\\TH:i:S",

      defaultDate,
      onChange,
    });

    return () => {
      if (!Array.isArray(flatPickr)) flatPickr.destroy();
    };
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          className="bg-transparent dark:bg-gray-900 shadow-theme-xs px-4 py-2.5 border border-gray-300 focus:border-brand-300 dark:border-gray-700 dark:focus:border-brand-800 rounded-lg focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 w-full h-11 text-gray-800 dark:placeholder:text-white/30 dark:text-white/90 placeholder:text-gray-400 text-sm appearance-none"
        />

        <span className="top-1/2 right-3 absolute text-gray-500 dark:text-gray-400 -translate-y-1/2 pointer-events-none">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
