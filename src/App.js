import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    {/* we wrap everything in NoteState so that props inside noteState can be used all the other components inside it irrespective their heirarchy */}
      <NoteState>
          <BrowserRouter>
            <Navbar />
            <Alert message = "Alert button"/>
        <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>
          </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
