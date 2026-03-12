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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Registered";
import Login from "./Login";
import UserForm from "./UserForm";

function App() {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      
      <Route path="/login" element={<Login />} />

        <Route path="/form" element={<UserForm />} />
    </Routes>
    // </BrowserRouter>
  );
}

export default App;