import {
  People,
  LocalHospital,
  WarningAmberRounded,
  TrendingUp,
  ArrowOutwardRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useAuth } from "../hooks/useAuth";
import MainLayout from "../components/layout/MainLayout";
import { usePatients } from "../hooks/usePatients";
import { mockAnalytics } from "../services/mockData";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  requestNotificationPermission,
  sendNotification,
} from "../services/notification";
import type { Patient } from "../types/patient";

export default function Dashboard() {
  const { user } = useAuth();
  const { patients } = usePatients();
  const navigate = useNavigate();

  const { kpis, monthlyPatients } = mockAnalytics;

  const critical = patients.filter((p: Patient) => p.status === "Critical");
  const recent = patients.slice(0, 5);

  const [open, setOpen] = useState(false);
  const hasTriggered = useRef(false);

  const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  };

  useEffect(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    requestNotificationPermission().then((permission) => {
      console.log("Notification permission:", permission);
    });

    navigator.serviceWorker?.ready.then((reg) => {
      console.log("SW ready:", reg);
      console.log("SW active:", reg.active);
    });

    console.log("SW controller:", navigator.serviceWorker?.controller);

    const timer = setTimeout(async () => {
      console.log("Sending notification...");
      await sendNotification(
        "Daily Report Ready 📊",
        "Your patient analytics is updated."
      );
      setOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      label: "Total Patients",
      value: kpis.totalPatients,
      icon: <People fontSize="small" />,
      iconClass: "bg-blue-50 text-blue-600",
      note: "Across your healthcare system",
    },
    {
      label: "Active Patients",
      value: kpis.activePatients,
      icon: <LocalHospital fontSize="small" />,
      iconClass: "bg-cyan-50 text-cyan-600",
      note: "Currently under treatment",
    },
    {
      label: "Critical Cases",
      value: kpis.criticalCases,
      icon: <WarningAmberRounded fontSize="small" />,
      iconClass: "bg-red-50 text-red-600",
      note: "Need immediate review",
    },
    {
      label: "Recovery Rate",
      value: `${kpis.recoveryRate}%`,
      icon: <TrendingUp fontSize="small" />,
      iconClass: "bg-emerald-50 text-emerald-600",
      note: "Overall patient recovery",
    },
  ];

  return (
    <MainLayout>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          Daily Report Ready 📊
        </Alert>
      </Snackbar>

      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {greeting()}, {user?.email?.split("@")[0] || "Doctor"} 👋
              </Typography>
              <p className="mt-2 max-w-2xl text-sm text-slate-200">
                Here’s a live overview of patient volume, critical alerts, and
                recovery trends across your healthcare platform.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="contained"
                  onClick={() => navigate("/patients")}
                  sx={{
                    bgcolor: "white",
                    color: "#0f172a",
                    borderRadius: "999px",
                    px: 2.5,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#e2e8f0" },
                  }}
                >
                  View Patients
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate("/analytics")}
                  sx={{
                    borderColor: "rgba(255,255,255,0.25)",
                    color: "white",
                    borderRadius: "999px",
                    px: 2.5,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.45)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                    },
                  }}
                >
                  Open Analytics
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wide text-slate-300">
                  Critical
                </p>
                <p className="mt-1 text-2xl font-bold">{critical.length}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wide text-slate-300">
                  Active
                </p>
                <p className="mt-1 text-2xl font-bold">{kpis.activePatients}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wide text-slate-300">
                  Recovery
                </p>
                <p className="mt-1 text-2xl font-bold">{kpis.recoveryRate}%</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wide text-slate-300">
                  Records
                </p>
                <p className="mt-1 text-2xl font-bold">{patients.length}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <Card
              key={item.label}
              className="!rounded-3xl !border !border-slate-200 !shadow-sm transition hover:!shadow-md"
            >
              <CardContent className="!p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.label}
                    </p>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                      {item.value}
                    </Typography>
                    <p className="mt-2 text-xs text-slate-400">{item.note}</p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconClass}`}
                  >
                    {item.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <Card className="!rounded-3xl !border !border-slate-200 !shadow-sm">
              <CardContent className="!p-5 sm:!p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Typography sx={{ fontWeight: 700 }}>
                      Patient Trends
                    </Typography>
                    <p className="mt-1 text-sm text-slate-500">
                      Monthly comparison of patient admissions and recoveries.
                    </p>
                  </div>

                  <Button
                    size="small"
                    endIcon={<ArrowOutwardRounded />}
                    onClick={() => navigate("/analytics")}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    View Analytics
                  </Button>
                </div>

                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart
                    data={monthlyPatients}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="patientsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.24} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.04} />
                      </linearGradient>
                      <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.24} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="patients"
                      stroke="#2563eb"
                      strokeWidth={3}
                      fill="url(#patientsGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="recovered"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      fill="url(#recoveredGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-4">
            <Card className="!h-full !rounded-3xl !border !border-slate-200 !shadow-sm">
              <CardContent className="!p-5 sm:!p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <Typography sx={{ fontWeight: 700 }}>
                      Critical Alerts
                    </Typography>
                    <p className="mt-1 text-sm text-slate-500">
                      Patients requiring urgent attention.
                    </p>
                  </div>
                  <Chip
                    label={critical.length}
                    color="error"
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </div>

                <div className="space-y-3">
                  {critical.length === 0 ? (
                    <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                      No critical patients right now.
                    </div>
                  ) : (
                    critical.slice(0, 5).map((p: any) => (
                      <div
                        key={p.id}
                        onClick={() => navigate("/patients")}
                        className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 px-3 py-3 transition hover:bg-slate-50"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Avatar className="!h-10 !w-10 !bg-red-100 !text-red-600">
                            {p.name[0]}
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {p.name}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {p.condition}
                            </p>
                          </div>
                        </div>

                        <span className="ml-3 h-2.5 w-2.5 rounded-full bg-red-500" />
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Card className="!rounded-3xl !border !border-slate-200 !shadow-sm">
            <CardContent className="!p-5 sm:!p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Typography sx={{ fontWeight: 700 }}>
                    Recent Patients
                  </Typography>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest patient records added to the system.
                  </p>
                </div>

                <Button
                  size="small"
                  onClick={() => navigate("/patients")}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  View All
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      <th className="px-3 py-3 font-medium">Patient</th>
                      <th className="px-3 py-3 font-medium">Condition</th>
                      <th className="px-3 py-3 font-medium">Doctor</th>
                      <th className="px-3 py-3 font-medium">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recent.map((p: any) => (
                      <tr
                        key={p.id}
                        onClick={() => navigate("/patients")}
                        className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="!h-9 !w-9 !bg-slate-100 !text-slate-700">
                              {p.name[0]}
                            </Avatar>
                            <span className="font-medium text-slate-900">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-slate-600">{p.condition}</td>
                        <td className="px-3 py-3 text-slate-600">{p.doctor}</td>
                        <td className="px-3 py-3">
                          <Chip
                            label={p.status}
                            size="small"
                            color={
                              p.status === "Critical"
                                ? "error"
                                : p.status === "Recovering"
                                ? "warning"
                                : "success"
                            }
                            variant={p.status === "Stable" ? "outlined" : "filled"}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>


                
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
}