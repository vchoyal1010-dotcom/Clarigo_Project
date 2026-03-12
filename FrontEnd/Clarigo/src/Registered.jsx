import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:6001/login/registered",
        formData
      );
            
      alert("User Registered Successfully!");

      console.log(response.data);

      setFormData({
        userName: "",
        email: "",
        password: "",
      });
      navigate("/login");


    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="container">
        
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Enter Username"
          value={formData.userName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
        <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;