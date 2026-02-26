import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;

    if (loginValue.includes("@")) {
      data = {
        email: loginValue,
        password: password
      };
    } else {
      data = {
        userName: loginValue,
        password: password
      };
    }

    try {

      const res = await axios.post(
        "http://localhost:6001/login/logink",
        data
      );
    navigate("/form");
      alert("Login successful");
      console.log(res.data);

    } catch (error) {

      console.log(error.response.data);
      alert("Invalid Credentials");

    }
  };

  return (
    <div className="container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Email or Username"
          onChange={(e)=>setLoginValue(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default Login;