import  { useState } from "react";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/employee/Users";
import Products from "./pages/riders/Riders";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import Dashboard from "./pages/dashboard/dashboard";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Layout = () => {
    return (
      <div className="main">
        {isLoggedIn ? (
          <>
            <Dashboard />
          </>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? (
        <Dashboard />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ),
      
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Login
          onLogin={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
