import React, { createContext,    useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Detaines from "./pages/Detaines";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import ErrorPage from "./pages/ErrorPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layout/MainLayout";
import Card from "./pages/Card";

const CardContext = createContext();
const ThemeContext = createContext();

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [card, setCard] = useState([]);
  const [theme, setTheme] = useState("light");

  let params = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (
        !(
          location.pathname == "/" ||
          location.pathname.includes("register") ||
          location.pathname.includes("about") ||
          location.pathname.includes("products") ||
          location.pathname.includes("card")
        )
      )
        navigate("/login");
    }
  }, [navigate]);

  function PrivateRout({ isAuth, children }) {
    if (!isAuth) {
      navigate("login");
    }
    return children;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CardContext.Provider value={{ card, setCard }}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/products"
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/products/:id"
            element={
              <MainLayout>
                <Detaines />
              </MainLayout>
            }
          ></Route>

          <Route
            path="/card"
            element={
              <MainLayout>
                <Card />
              </MainLayout>
            }
          ></Route>

          <Route
            path="/orders"
            element={
              <PrivateRout isAuth={!!token}>
                <MainLayout>
                  <Orders></Orders>
                </MainLayout>
              </PrivateRout>
            }
          ></Route>

          <Route
            path="/checkout"
            element={
              <PrivateRout isAuth={!!token}>
                <MainLayout>
                  <Checkout />
                </MainLayout>
              </PrivateRout>
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </CardContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
