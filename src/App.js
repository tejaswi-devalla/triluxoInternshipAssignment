import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Register from "./components/Register";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
