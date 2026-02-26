// import Register from "./Registered";
// import "./App.css";
// function App() {
//   return (
//     <>
//       <Register />
//     </>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";
import Register from "./Registered";
import Login from "./Login";
import UserForm from "./UserForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route path="/form" element={<UserForm />} />
    </Routes>
  );
}

export default App;