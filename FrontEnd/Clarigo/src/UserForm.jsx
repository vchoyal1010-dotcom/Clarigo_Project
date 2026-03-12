

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function UserForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Active");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);   // NEW

  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name;

  useEffect(() => {

    const verifyToken = async () => {

      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return navigate("/login");
      }

      try {

        const res = await axios.get(
          "http://localhost:6001/login/form",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Token verified:", res.data);

      } catch (error) {

        console.log(error.response?.data);
        alert("Token invalid or expired");
        navigate("/login");

      }

    };

    verifyToken();

  }, [navigate]);


  // logout function
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };


  // EDIT FUNCTION (NEW)
  const handleEdit = (user) => {
    setEditId(user._id);

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUserName(user.userName);
    setEmail(user.email);
    setPhone(user.phone);
    setStatus(user.status);
  };


  // form submit function
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {

       // phone validation
  if (phone.length !== 10) {
    alert("Phone number must be exactly 10 digits");
    return;
  }
      // UPDATE USER
      if (editId) {

        await axios.put(
          `http://localhost:6001/user/update/${editId}`,
          {
            firstName,
            lastName,
            userName,
            email,
            phone,
            status
          }
        );

        alert("User updated successfully");
        setEditId(null);

      } else {

        const res = await axios.post(
          "http://localhost:6001/user/save",
          {
            firstName,
            lastName,
            userName,
            email,
            phone,
            status
          }
        );

        alert("Form submitted successfully");
        console.log(res.data);
      }

      handleShowUsers();

    } catch (error) {

      console.log(error.response?.data);
      alert("Error submitting form");

    }
  };


const handleShowUsers = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return navigate("/login");
    }

    const res = await axios.get("http://localhost:6001/user/show", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data.user);
    console.log("Fetched users:", res.data);

  } catch (error) {
    console.log(error.response?.data);
    alert("Error fetching users");
  }
};

  return (
    <>
    <div className="container">
      <center>

      <div className="header">
        <span>Hello {name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>

        <h2>User Details Form</h2>

        <form onSubmit={handleFormSubmit}>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

         <input
            type="tel"
             placeholder="Phone"
              value={phone}
                maxLength="10"
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

 {editId ? (
  <button type="submit" className="subutton">Update</button>
) : (
  <button type="submit" className="subutton">Submit</button>
)}

          <button type="button" onClick={handleShowUsers}>Show</button>
        </form>
         
      </center>
          
</div>
               <div className="tablediv">      
                  <table border="1">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>User Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {users?.map((user) => (
      <tr key={user._id}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.userName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.status}</td>

        <td>
          <button onClick={() => handleEdit(user)}>Edit</button>
        </td>

      </tr>
    ))}
  </tbody>
    </table>
        </div>

   </>
  );
}

export default UserForm;