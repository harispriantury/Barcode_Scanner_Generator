import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/global/CustomButton";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (form.username === "username" && form.password === "password") {
      sessionStorage.setItem("isAuthenticated", true);
      navigate("/dashboard");
    } else {
      sessionStorage.setItem("isAuthenticated", false);
    }
  };
  return (
    <div>
      Login
      <div>
        <label htmlFor="username">Username : </label>
        <input
          id="username"
          name="username"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
          value={form.username}
        />
        <label htmlFor="passwor">Password : </label>
        <input
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
          value={form.password}
        />

        <CustomButton text="login" handleClick={() => handleSubmit()} />
      </div>
    </div>
  );
};

export default Login;
