import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Button, FilterRange, SelectInput } from "src/components";
import { setFilter, fetchUsersListFromFirestore } from "src/redux/matchSlice";
import { fetchUserInfoFromFirestore } from "src/redux/profileSlice";
import { selectUserInfo } from "src/redux/selects";

import styles from "./Filter.module.css";

function Filter({ setFilterMode }) {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo);

  const [distance, setDistance] = useState([5]);
  const [age, setAge] = useState([0, 20]);
  const [gender, setGender] = useState([]);
  const [breed, setBreed] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setFilter({ distance, gender, breed, age }));
    dispatch(fetchUserInfoFromFirestore(userInfo.userId));
    dispatch(fetchUsersListFromFirestore());
    setFilterMode(false);
  };

  const handleClick = (event) => {
    gender.includes(event.target.value)
      ? setGender(gender.filter((item) => item !== event.target.value))
      : setGender([...gender, event.target.value]);
  };

  return (
    <div className={styles["root"]}>
      <h4 className={styles["header"]}>Let’s find new friends</h4>
      <form className={styles["form"]}>
        {/* <FilterRange
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
        /> */}
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
        <SelectInput isForProfile={false} breed={breed} setBreed={setBreed} />
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
          min="0  "
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
