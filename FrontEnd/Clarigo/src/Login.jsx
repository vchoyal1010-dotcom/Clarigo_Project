import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { Link } from "react-router-dom";
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

      //store data in session storage
      const token =res.data.token;
      console.log(res.data);
      const name = res.data.user.userName;

      sessionStorage.setItem("token",token);
      alert("Login successful");
      navigate("/form", { state: { name } });



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
      <p>
  Don't have an account? <Link to="/">Register</Link>
</p>
    </div>
  );
}

export default Login;