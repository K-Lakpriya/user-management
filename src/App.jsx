import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/Users/UsersPage.jsx";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/Login/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/"} element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path={"users"} element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
