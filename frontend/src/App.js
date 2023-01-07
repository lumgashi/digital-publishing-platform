import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Bookmark from "./pages/Bookmark";
import UserProfile from "./pages/UserProfile";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<Bookmark />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
