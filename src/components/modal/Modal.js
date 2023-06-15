import styles from "./Modal.module.css";
import { Button, Message } from "../";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Modal({ setIsModalOn, isNewUser }) {
  const handleClose = () => {
    setIsModalOn(0);
  };

  const { signIn, signUp, sendPassword } = useAuth();
  const history = useNavigate();
  const [resetPassword, setResetPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      isNewUser
        ? await signUp(emailRef.current.value, passwordRef.current.value)
        : await signIn(emailRef.current.value, passwordRef.current.value);
      history("/admin");
    } catch (err) {
      setError(err.code);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await sendPassword(emailRef.current.value);
      setMessage("The message was sent. Check your email!");
    } catch (err) {
      setError(err.code);
    }
  };

  const showResetPassword = () => {
    setResetPassword(true);
    setError("");
  };

  return (
    <div className={styles["root"]}>
      <div className={styles["container"]}>
        <button className={styles["close-btn"]} onClick={handleClose}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.855 1.38253L13 11.2375L3.145 1.38253C2.90797 1.16563 2.5964 1.04854 2.27519 1.05565C1.95397 1.06277 1.64789 1.19355 1.4207 1.42073C1.19352 1.64792 1.06274 1.954 1.05563 2.27521C1.04851 2.59643 1.1656 2.908 1.3825 3.14503L11.2325 13L1.38 22.8525C1.25963 22.9672 1.16341 23.1049 1.09699 23.2573C1.03057 23.4097 0.995292 23.5739 0.993233 23.7402C0.991174 23.9064 1.02237 24.0714 1.085 24.2255C1.14762 24.3795 1.24041 24.5194 1.3579 24.6371C1.47539 24.7548 1.61521 24.8477 1.76916 24.9106C1.9231 24.9734 2.08805 25.0049 2.25432 25.003C2.42058 25.0012 2.58481 24.9662 2.73733 24.9C2.88986 24.8338 3.02762 24.7377 3.1425 24.6175L13 14.765L22.855 24.62C23.092 24.8369 23.4036 24.954 23.7248 24.9469C24.046 24.9398 24.3521 24.809 24.5793 24.5818C24.8065 24.3546 24.9373 24.0486 24.9444 23.7273C24.9515 23.4061 24.8344 23.0946 24.6175 22.8575L14.7625 13.0025L24.6175 3.14503C24.7379 3.03032 24.8341 2.8927 24.9005 2.74026C24.9669 2.58783 25.0022 2.42366 25.0043 2.25739C25.0063 2.09113 24.9751 1.92614 24.9125 1.7721C24.8499 1.61807 24.7571 1.47811 24.6396 1.36046C24.5221 1.2428 24.3823 1.14981 24.2283 1.08697C24.0744 1.02413 23.9094 0.992697 23.7432 0.994521C23.5769 0.996344 23.4127 1.03139 23.2602 1.09759C23.1076 1.16379 22.9699 1.25982 22.855 1.38003V1.38253Z"
              fill="#7C7C7C"
            />
          </svg>
        </button>
        <h2 className={styles["title"]}>
          {isNewUser
            ? "Create an account"
            : resetPassword
            ? "Reset password"
            : "Sign in"}
        </h2>
        {error && <Message text={error} type="error" />}
        {message && <div className={styles["message"]}>{message}</div>}
        {!message && (
          <form action="" className={styles["form"]} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              ref={emailRef}
              className={styles["input"]}
              required
            />
            {!resetPassword && (
              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                className={`${styles["input"]} ${styles["password"]}`}
                required
              />
            )}
            {resetPassword ? (
              <Button color="mint" text="send" onClick={handleResetPassword} />
            ) : (
              <Button color="mint" text="go!" />
            )}
          </form>
        )}
        {!isNewUser && !resetPassword && (
          <button
            className={styles["forget-password-btn"]}
            onClick={showResetPassword}
          >
            Forgot password?
          </button>
        )}
      </div>
    </div>
  );
}

export { Modal };
