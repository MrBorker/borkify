import styles from "./Filter.module.css";
import { breeds } from "../../config";
import { Button, FilterRange } from "../";
import { useState } from "react";
import Select from "react-select";
import { setFilter, fetchUsersListFromFirestore } from "../../redux/matchSlice";
import { useDispatch, useSelector } from "react-redux";

function Filter({ setFilterMode }) {
  const [distance, setDistance] = useState([5]);
  const [age, setAge] = useState([3, 5]);
  const [gender, setGender] = useState([]);
  const [breed, setBreed] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(setFilter({ distance, gender, breed, age }));
    await dispatch(fetchUsersListFromFirestore());
    setFilterMode(false);
  };

  const handleClick = (event) => {
    gender.includes(event.target.value)
      ? setGender(gender.filter((item) => item !== event.target.value))
      : setGender([...gender, event.target.value]);
  };

  console.log(gender);

  return (
    <div className={styles["root"]}>
      <h4 className={styles["header"]}>Let’s find new friends</h4>
      <form className={styles["form"]}>
        <FilterRange
          values={distance}
          setValues={setDistance}
          colors={[
            getComputedStyle(document.documentElement).getPropertyValue(
              "--color-rose-800"
            ),
            getComputedStyle(document.documentElement).getPropertyValue(
              "--color-rose-700"
            ),
          ]}
          max="20"
          min="0"
          step="0.1"
          unit="km"
        />
        <div className={styles["gender"]}>
          <button
            className={`
              ${styles["gender-btn"]} ${
              styles[`${gender.includes("Female") && "active"}`]
            }`}
            type="button"
            onClick={handleClick}
            value="Female"
          >
            Female
          </button>
          <button
            className={`
            ${styles["gender-btn"]} ${
              styles[`${gender.includes("Male") && "active"}`]
            }`}
            type="button"
            onClick={handleClick}
            value="Male"
          >
            Male
          </button>
        </div>
        <Select
          options={breeds}
          isMulti="true"
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
              color: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--color-rose-800"),
              fontWeight: 600,
              fontSize: "24px",
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              color: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--color-rose-800"),
              fontWeight: 600,
              fontSize: "24px",
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              color: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--color-rose-800"),
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
              color: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--color-rose-800"),
              fontWeight: 600,
              fontSize: "24px",
            }),
            multiValueRemove: (baseStyles, state) => ({
              ...baseStyles,
              color: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--color-rose-800"),
              fontWeight: 600,
              fontSize: "24px",
            }),
          }}
        />
        <FilterRange
          values={age}
          setValues={setAge}
          colors={[
            getComputedStyle(document.documentElement).getPropertyValue(
              "--color-rose-700"
            ),
            getComputedStyle(document.documentElement).getPropertyValue(
              "--color-rose-800"
            ),
            getComputedStyle(document.documentElement).getPropertyValue(
              "--color-rose-700"
            ),
          ]}
          max="20"
          min="0"
          step="1"
          unit="y"
        />
      </form>
      <Button
        text="start"
        color="rose"
        type="submit"
        onClick={handleSubmit}
      ></Button>
    </div>
  );
}

export { Filter };
