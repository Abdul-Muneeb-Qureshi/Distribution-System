import React, { useState } from "react";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/employee/Users";
import Products from "./pages/riders/Riders";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";

import Signup from "./pages/signup/Signup";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/dashboard/dashboard";

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Layout = () => {
    return (
      <div className="main">
        {isLoggedIn ? (
          <>
            <Navbar />
            <div className="container">
              <div className="menuContainer">
                <Menu />
              </div>
              <div className="contentContainer">
                <QueryClientProvider client={queryClient}>
                  <Outlet />
                </QueryClientProvider>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>
      // <div>
      //   <Login />
      // </div>
      // <div className="main">
      //   <Navbar />
      //   <div className="container">
      //     <div className="menuContainer">
      //       <Menu />
      //     </div>
      //     <div className="contentContainer">
      //       <QueryClientProvider client={queryClient}>
      //         <Outlet />
      //       </QueryClientProvider>
      //     </div>
      //   </div>
      //   <Footer />
      // </div>
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
      // element: <Layout />,
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
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
