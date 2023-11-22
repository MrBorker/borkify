import styles from "./InputRow.module.css";
import { useState } from "react";

function InputRow({ htmlFor, value, type, id, labelText, onChange }) {
  const [showPassword, setShowPassword] = useState(type);
  const handleShowPassword = () => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  return (
    <fieldset className={styles["row"]}>
      <label htmlFor={htmlFor}>{labelText}</label>
      {type !== "textarea" ? (
        <input type={showPassword} value={value} onChange={onChange} id={id} />
      ) : (
        <textarea type={type} value={value} onChange={onChange} id={id} />
      )}
      {type === "password" && (
        <button onClick={handleShowPassword} type="button">
          {showPassword === "password" ? (
            <svg
              className={styles["password-icon"]}
              xmlns="http://www.w3.org/2000/svg"
              width={27}
              height={26}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#f85961"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 12s4-8 11-8 11 8 11 8M1 12s4 8 11 8 11-8 11-8"
              />
              <circle
                cx={12}
                cy={12}
                r={3}
                stroke="#f85961"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          ) : (
            <svg
              className={styles["password-icon"]}
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#f85961"
                fillRule="evenodd"
                d="M15.92 12.799a4 4 0 0 0-4.719-4.719l4.72 4.719ZM8.667 9.788a4 4 0 0 0 5.545 5.545l-1.474-1.474a2 2 0 0 1-2.598-2.598L8.668 9.789Z"
                clipRule="evenodd"
              />
              <path
                fill="#f85961"
                fillRule="evenodd"
                d="m16.52 17.64-1.47-1.469c-.972.51-2.002.829-3.05.829-1.526 0-3.014-.678-4.34-1.632-1.32-.95-2.396-2.112-3.076-2.938-.1-.121-.174-.212-.236-.291a2.047 2.047 0 0 1-.1-.139c.02-.031.051-.075.1-.139.062-.08.136-.17.236-.291.665-.808 1.71-1.938 2.99-2.875l-1.43-1.43C4.797 8.297 3.723 9.47 3.04 10.3l-.073.088c-.314.375-.737.883-.737 1.613s.423 1.238.737 1.613l.073.088c.74.899 1.94 2.203 3.451 3.29C7.994 18.073 9.891 19 12 19c1.67 0 3.206-.581 4.52-1.36ZM8.806 5.686C9.79 5.269 10.864 5 12 5c2.11 0 4.006.927 5.509 2.009 1.51 1.087 2.711 2.391 3.45 3.29l.074.088c.314.375.737.883.737 1.613s-.423 1.238-.737 1.613l-.073.088a20.491 20.491 0 0 1-2.015 2.123l-1.416-1.416a18.45 18.45 0 0 0 2.123-2.27 2.07 2.07 0 0 0 .1-.138 2.07 2.07 0 0 0-.1-.139 13.85 13.85 0 0 0-.236-.291c-.68-.826-1.756-1.989-3.075-2.938C15.014 7.678 13.526 7 12 7c-.551 0-1.097.088-1.632.246l-1.561-1.56Z"
                clipRule="evenodd"
              />
              <path stroke="#f85961" strokeWidth={2} d="m5 2 16 16" />
            </svg>
          )}
        </button>
      )}
    </fieldset>
  );
}

export { InputRow };
