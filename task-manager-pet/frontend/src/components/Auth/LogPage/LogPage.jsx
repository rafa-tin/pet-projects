import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./LogPage.module.scss";
import { toast } from "react-toastify";

import { AppInput } from "../../UI/AppInput/AppInput";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";

export default function LogPage({ setToken }) {
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value) ) {
      return "";
    }
    return "Write correct email";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateLogin(loginValue);
    if (validationError) {
      setLoginError(validationError);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginValue,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userPhone", data.user.phone);
      setToken(data.token);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoginError("Something went wrong");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <img src="./logo.svg" alt="logo" />
          <h3>Task Tracker</h3>
        </div>

        <div className={styles.formData}>
          <AppInput
            id="loginInput"
            type="text"
            placeholder="Enter email"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            error={loginError}
          >
            Email or Phone
          </AppInput>

          <AppInput
            id="exampleInputPassword1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          >
            Password
          </AppInput>

          <Button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "10px auto", width: "90%" }}
          >
            Submit
          </Button>
        </div>
      </form>
      <p className="text-center" style={{ fontSize: "15px" }}>
        Don't have an account?{" "}
        <Button
          onClick={() => navigate("/register")}
          style={{ color: "#4d42e9", fontWeight: "600" }}
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
}
