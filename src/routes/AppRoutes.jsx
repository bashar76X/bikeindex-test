import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Wrapper from "../wrapper/Wrapper";
import BikeDetails from "../pages/BikeDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Wrapper />} path="/">
          <Route index element={<Home />} />
          <Route path="bike/:id" element={<BikeDetails />} />
          <Route path="test" element={<div>Hello from test</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
