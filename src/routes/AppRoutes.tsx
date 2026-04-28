import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Login from "../pages/Login";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Patients = lazy(() => import("../pages/Patients"));
const Analytics = lazy(() => import("../pages/Analytics"));

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";

const LoadingFallback = () => <div className="flex items-center justify-center h-screen">Loading...</div>;

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Patients />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Analytics />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
