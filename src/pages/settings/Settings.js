import styles from "./Settings.module.css";
import { Button, InputRow, Message } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { currentUser, logOut, setNewEmail, setNewPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [emailInput, setEmailInput] = useState(currentUser?.email);
  const [passwordInput, setPasswordInput] = useState("");
  const history = useNavigate();

  const handleLogOut = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await logOut();
      history("/home");
    } catch (err) {
      setError(err);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      if (emailInput === currentUser.email && !passwordInput)
        throw new Error("Nothing has changed");
      else if (!emailInput) throw new Error("Email can't be blank");
      Promise.all([setNewEmail(emailInput), setNewPassword(passwordInput)])
        .then((response) => setMessage("Profile data is successfully updated"))
        .catch((err) => setError(err.code));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  return (
    <div className={styles["root"]}>
      {error && <Message text={error} type="error" />}
      {message && <Message text={message} type="success" />}
      <form className={styles["form"]} action="">
        <InputRow
          htmlFor="email"
          value={emailInput}
          onChange={handleEmailChange}
          type="text"
          id="email"
          labelText="email"
        />
        {/* <InputRow
          htmlFor="password"
          type="password"
          id="password"
          labelText="password"
        /> */}
        <InputRow
          htmlFor="newPassword"
          value={passwordInput}
          onChange={handlePasswordChange}
          type="password"
          id="newPassword"
          labelText="new password"
        />
        <div className={styles["btn-wrapper"]}>
          <Button color="rose" text="update" onClick={handleUpdate} />
          <Button color="gray" text="logout" onClick={handleLogOut} />
        </div>
      </form>
    </div>
  );
}

export { Settings };
