import Select from "react-select";

import { breeds } from "src/config";

export const SelectInput = ({ isForProfile, breed, setBreed }) => {
  return isForProfile ? (
    <Select
      options={breeds}
      onChange={({ value }) => setBreed(value)}
      placeholder={breed || "Select a breed"}
      hideSelectedOptions="true"
      styles={{
        container: (baseStyles, state) => ({ ...baseStyles, width: "100%" }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          "&:hover": {
            borderColor: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--color-rose-200"),
          },
          width: "100%",
          border: "none",
          borderBottom: `solid 3px ${getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-rose-200")}`,
          padding: "4px 13px",
          backgroundColor: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-rose-100"),
          borderRadius: "0px",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-gray-400"
          ),
          fontWeight: 600,
          fontSize: "20px",
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-gray-400"
          ),
          fontWeight: 600,
          fontSize: "20px",
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-gray-400"
          ),
          fontWeight: 600,
          fontSize: "20px",
          border: `2px solid ${getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-rose-800")}`,
          boxShadow: "none",
          padding: "13px",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "transparent",
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-gray-400"
          ),
          fontWeight: 600,
          fontSize: "20px",
        }),
      }}
    />
  ) : (
    <Select
      options={breeds}
      isMulti="true"
      onChange={(value) =>
        value.map(({ value }) => setBreed([...breed, value]))
      }
      placeholder="All breeds"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: "100%",
          border: `2px solid ${getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-rose-800")}`,
          borderRadius: "20px",
          padding: "4px 13px",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-rose-800"
          ),
          fontWeight: 600,
          fontSize: "24px",
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-rose-800"
          ),
          fontWeight: 600,
          fontSize: "24px",
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-rose-800"
          ),
          fontWeight: 600,
          fontSize: "24px",
          border: `2px solid ${getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-rose-800")}`,
          borderRadius: "20px",
          boxShadow: "none",
          padding: "13px",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "transparent",
        }),
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "transparent",
        }),
        multiValueLabel: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-rose-800"
          ),
          fontWeight: 600,
          fontSize: "24px",
        }),
        multiValueRemove: (baseStyles, state) => ({
          ...baseStyles,
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--color-rose-800"
          ),
          fontWeight: 600,
          fontSize: "24px",
        }),
      }}
    />
  );
};
