import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Message } from "src/components";
import { useAuth } from "src/contexts/AuthContext";
import { Close } from "src/icons";

import styles from "./Modal.module.css";

function Modal({ setIsModalOn, isNewUser }) {
  const { signIn, signUp, sendPassword } = useAuth();

  const history = useNavigate();

  const [resetPassword, setResetPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleClose = () => {
    setIsModalOn(false);
  };

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

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";

    return () => (body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    function onClose(event) {
      if (event.key === "Escape") handleClose && handleClose();
    }

    document.addEventListener("keydown", onClose);

    return () => document.removeEventListener("keydown", onClose);
  }, [handleClose]);

  return (
    <div className={styles["root"]}>
      <div className={styles["container"]}>
        <button className={styles["close-btn"]} onClick={handleClose}>
          <Close color="#7C7C7C" />
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
