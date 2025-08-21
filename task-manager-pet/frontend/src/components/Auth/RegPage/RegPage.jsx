import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RegPage.module.scss";

import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { useState } from "react";
import { AppInput } from "../../UI/AppInput/AppInput";
import { toast } from "react-toastify";

export default function RegPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email required";
    if (!emailRegex.test(value)) return "Enter correct email";
    return "";
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\+?\d{9,15}$/;
    if (!value) return "Phone is required";
    if (!phoneRegex.test(value))
      return 'Phone must be with 9–15 digits, it is possible with "+"';
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password min 6";
    return "";
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const phErr = validatePhone(phone);
  const emErr = validateEmail(email);
  const pwErr = validatePassword(password);

  setPhoneError(phErr);
  setEmailError(emErr);
  setPasswordError(pwErr);

  if (phErr || emErr || pwErr) return;

  try {
    const res = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error);
      return;
    }

    toast.success("Created Profile")
    navigate("/login");
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.logo}>
          <img src="./logo.svg" alt="logo" />
          <h3>Task Tracker</h3>
        </div>
        <div className={styles.formData}>
          
          {/* Your name */}
          <AppInput
            id="nameInput"
            type={"text"}
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            Your Name
          </AppInput>

          {/* Phone */}
          <AppInput
            id="phone"
            type="tel"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={(e) => setPhoneError(validatePhone(e.target.value))}
            error={phoneError}
          >
            Phone Number
          </AppInput>

          {/* Email */}
          <AppInput
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmailError(validateEmail(e.target.value))}
            error={emailError}
          >
            Email address
          </AppInput>

          {/* Password */}
          <AppInput
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPasswordError(validatePassword(e.target.value))}
            error={passwordError}
          >
            Password
          </AppInput>

          {/* Checkbox */}
          <div className="form-check mb-4">
            <input
              id="termsCheck"
              type="checkbox"
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="termsCheck">
              Agree to terms
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center" style={{ fontSize: "15px" }}>
        Already have an account?
        <Button
          onClick={() => navigate("/login")}
          style={{ color: "#4d42e9", fontWeight: "600", marginLeft: "5px" }}
        >
          Sign In
        </Button>
      </p>
    </div>
  );
}
