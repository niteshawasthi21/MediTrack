import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, Typography, IconButton, Tooltip } from "@mui/material";
import {
  Dashboard,
  People,
  BarChart,
  Logout,
  LocalHospital,
  ChevronRight,
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
    {
      label: "Dashboard",
      icon: <Dashboard fontSize="small" />,
      path: "/dashboard",
      description: "Overview and highlights",
    },
    {
      label: "Patients",
      icon: <People fontSize="small" />,
      path: "/patients",
      description: "Records and case management",
    },
    {
      label: "Analytics",
      icon: <BarChart fontSize="small" />,
      path: "/analytics",
      description: "Reports and patient insights",
    },
  ];

  const currentPage =
    menu.find((item) => item.path === location.pathname)?.label || "Dashboard";

  const currentDescription =
    menu.find((item) => item.path === location.pathname)?.description ||
    "Manage your healthcare operations efficiently";

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
        {/* Desktop sidebar */}
        <aside className="hidden w-[280px] shrink-0 border-r border-slate-200 bg-white xl:flex xl:flex-col">
          {/* Brand */}
          <div className="border-b border-slate-200 px-6 py-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex w-full items-center gap-3 text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
                <LocalHospital fontSize="small" />
              </div>

              <div>
                <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  CarePulse
                </Typography>
                <Typography variant="caption" className="text-slate-500">
                  Healthcare Command Center
                </Typography>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-5">

            <div className="space-y-2">
              {menu.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`group w-full rounded-2xl border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-blue-100 bg-blue-50 shadow-sm"
                        : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                          }`}
                        >
                          {item.icon}
                        </span>

                        <div className="min-w-0">
                          <p
                            className={`truncate text-sm ${
                              isActive
                                ? "font-semibold text-blue-700"
                                : "font-medium text-slate-800"
                            }`}
                          >
                            {item.label}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        className={isActive ? "text-blue-500" : "text-slate-300"}
                        fontSize="small"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          
        </aside>

        {/* App content */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          {/* Top header */}
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  <span className="font-extrabold text-black">CarePulse</span>
                  <span>•</span>
                  <span>{currentPage}</span>
                </div>

                <Typography variant="caption" className="text-slate-500">
                  {currentDescription}
                </Typography>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <Avatar className="!h-10 !w-10 !bg-blue-600 !text-sm !font-semibold">
                    {getInitial()}
                  </Avatar>

                  <div className="min-w-0">
                    <p className="max-w-[220px] truncate text-sm font-semibold text-slate-900">
                      {user?.email || "User"}
                    </p>
                    <p className="text-xs text-slate-500">Authenticated session</p>
                  </div>
                </div>

                <Tooltip title="Logout">
                  <IconButton
                    onClick={handleLogout}
                    sx={{
                      border: "1px solid #fecaca",
                      bgcolor: "#fef2f2",
                      color: "#dc2626",
                      borderRadius: "16px",
                      "&:hover": {
                        bgcolor: "#fee2e2",
                      },
                    }}
                  >
                    <Logout fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2 sm:hidden">
                <Avatar className="!h-10 !w-10 !bg-blue-600 !text-sm !font-semibold">
                  {getInitial()}
                </Avatar>

                <IconButton
                  onClick={handleLogout}
                  sx={{
                    border: "1px solid #fecaca",
                    bgcolor: "#fef2f2",
                    color: "#dc2626",
                    borderRadius: "14px",
                  }}
                >
                  <Logout fontSize="small" />
                </IconButton>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 pb-24 xl:pb-6">
            <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">
              {children}
            </div>
          </main>

          {/* Mobile bottom nav */}
          <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur xl:hidden">
            <div className="grid grid-cols-3 gap-2">
              {menu.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-xs transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`mb-1 flex h-9 w-9 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-blue-600 text-white"
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
        </div>
      </div>
    </div>
  );
}