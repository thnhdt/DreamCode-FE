import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Radio from "../input/Radio";

interface RadioOption {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioButtonsProps {
  title?: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  className?: string;
}

export default function RadioButtons({
  title = "Radio Buttons",
  options,
  onChange,
  className = "flex flex-wrap items-center gap-8",
}: RadioButtonsProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };
  return (
    <ComponentCard title={title}>
      <div className={className + "flex flex-wrap items-center gap-8"}>
        {options.map((option) => (
          <Radio
            key={option.id}
            id={option.id}
            name={option.id}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </div>
    </ComponentCard>
  );
}
