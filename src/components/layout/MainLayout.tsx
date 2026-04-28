import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import {
  Dashboard,
  People,
  BarChart,
  Logout,
  LocalHospital,
} from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menu = [
    { label: "Dashboard", icon: <Dashboard fontSize="small" />, path: "/dashboard" },
    { label: "Patients", icon: <People fontSize="small" />, path: "/patients" },
    { label: "Analytics", icon: <BarChart fontSize="small" />, path: "/analytics" },
  ];

  const currentPage =
    menu.find((item) => item.path === location.pathname)?.label || "Dashboard";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitial = () => {
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 border-r border-slate-200 bg-white md:flex md:flex-col">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <LocalHospital fontSize="small" />
              </div>

              <div>
                <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  CarePulse
                </Typography>
                <Typography variant="caption" className="text-slate-500">
                  Healthcare Admin
                </Typography>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-5">
            <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Main Menu
            </div>

            <div className="space-y-1.5">
              {menu.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span className={isActive ? "font-semibold" : "font-medium"}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between gap-6 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <Typography sx={{ fontWeight: 700 }}>
                  {currentPage}
                </Typography>
                <Typography variant="caption" className="text-slate-500">
                  Manage your healthcare operations efficiently
                </Typography>
              </div>

              <div className="flex flex-row items-baseline gap-3">
                            <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-2xl px-1 py-1 text-red-600 transition hover:bg-red-50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <Logout fontSize="small" />
                  </span>
                  <span className="text-sm font-semibold">Logout</span>
                </button>
                <div className="flex min-w-[300px] max-w-[360px] items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">
                  <Avatar className="!h-12 !w-12 !bg-blue-600 !text-base !font-semibold">
                    {getInitial()}
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user?.email || "User"}
                    </p>
                    <p className="text-sm text-slate-500">
                      Authenticated session
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile brand bar */}
          <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex items-center justify-between">
              <div>
                <Typography sx={{ fontWeight: 700 }}>CarePulse</Typography>
                <Typography variant="caption" className="text-slate-500">
                  {currentPage}
                </Typography>
              </div>

              <Avatar className="!h-10 !w-10 !bg-blue-600">
                {getInitial()}
              </Avatar>
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}