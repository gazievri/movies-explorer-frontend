import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Закрывает роуты signuз и signin если пользователь авторизован
const OpenRoutes = ({ isLoggedIn }) => {
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default OpenRoutes;