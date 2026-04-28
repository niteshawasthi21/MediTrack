import {
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

import {
  TrendingUp,
  PeopleAltOutlined,
  WarningAmberRounded,
  FavoriteRounded,
  InsightsOutlined,
} from "@mui/icons-material";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { mockAnalytics, mockPatients } from "../services/mockData";
import MainLayout from "../components/layout/MainLayout";

export default function Analytics() {
  const { kpis, monthlyPatients } = mockAnalytics;

  const statusData = [
    {
      name: "Stable",
      value: mockPatients.filter((p) => p.status === "Stable").length,
    },
    {
      name: "Critical",
      value: mockPatients.filter((p) => p.status === "Critical").length,
    },
    {
      name: "Recovering",
      value: mockPatients.filter((p) => p.status === "Recovering").length,
    },
  ];

  const COLORS = ["#16a34a", "#dc2626", "#f59e0b"];

  const summaryCards = [
    {
      label: "Total Patients",
      value: kpis.totalPatients,
      icon: <PeopleAltOutlined fontSize="small" />,
      iconBg: "bg-blue-50 text-blue-600",
      note: "Registered across the system",
    },
    {
      label: "Active Patients",
      value: kpis.activePatients,
      icon: <TrendingUp fontSize="small" />,
      iconBg: "bg-cyan-50 text-cyan-600",
      note: "Currently under monitoring",
    },
    {
      label: "Critical Cases",
      value: kpis.criticalCases,
      icon: <WarningAmberRounded fontSize="small" />,
      iconBg: "bg-red-50 text-red-600",
      note: "Require immediate attention",
    },
    {
      label: "Recovery Rate",
      value: `${kpis.recoveryRate}%`,
      icon: <FavoriteRounded fontSize="small" />,
      iconBg: "bg-emerald-50 text-emerald-600",
      note: "Recovered successfully",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-slate-500">
                <InsightsOutlined fontSize="small" />
                <span className="text-sm font-medium">Reporting Overview</span>
              </div>

              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Analytics
              </Typography>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Track patient growth, monitor admissions and recoveries, and review health-status distribution across your healthcare platform.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
              <span className="font-semibold text-slate-900">
                {monthlyPatients.length}
              </span>{" "}
              monthly records available
            </div>
          </div>
        </section>

        {/* KPI cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item) => (
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

                  <Avatar className={`!h-11 !w-11 ${item.iconBg}`}>
                    {item.icon}
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Main charts */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Area chart */}
          <div className="xl:col-span-7">
            <Card className="!h-full !rounded-3xl !border !border-slate-200 !shadow-sm">
              <CardContent className="!p-5 sm:!p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <Typography sx={{ fontWeight: 700 }}>
                      Patient Growth Trend
                    </Typography>
                    <p className="mt-1 text-sm text-slate-500">
                      Monthly progression of total patients in the system.
                    </p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={monthlyPatients}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="patientsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.04} />
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
                      fill="url(#patientsFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bar chart */}
          <div className="xl:col-span-5">
            <Card className="!h-full !rounded-3xl !border !border-slate-200 !shadow-sm">
              <CardContent className="!p-5 sm:!p-6">
                <div className="mb-5">
                  <Typography sx={{ fontWeight: 700 }}>
                    Recovery vs Admissions
                  </Typography>
                  <p className="mt-1 text-sm text-slate-500">
                    Compare total patient intake with recovered cases by month.
                  </p>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyPatients}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    barGap={8}
                  >
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
                    <Bar
                      dataKey="patients"
                      fill="#2563eb"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="recovered"
                      fill="#06b6d4"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Status section */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-5">
            <Card className="!rounded-3xl !border !border-slate-200 !shadow-sm">
              <CardContent className="!p-5 sm:!p-6">
                <div className="mb-5">
                  <Typography sx={{ fontWeight: 700 }}>
                    Patient Status Distribution
                  </Typography>
                  <p className="mt-1 text-sm text-slate-500">
                    Current breakdown of patient health status across all records.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="h-[280px] w-full max-w-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={100}
                          paddingAngle={4}
                        >
                          {statusData.map((_, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="w-full space-y-3">
                    {statusData.map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-sm font-medium text-slate-700">
                            {item.name}
                          </span>
                        </div>

                        <span className="text-sm font-semibold text-slate-900">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-7">
            <Card className="!rounded-3xl !border !border-slate-200 !shadow-sm">
              <CardContent className="!p-5 sm:!p-6">
                <div className="mb-5">
                  <Typography sx={{ fontWeight: 700 }}>
                    Analytics Summary
                  </Typography>
                  <p className="mt-1 text-sm text-slate-500">
                    Keep critical figures visible first, then use charts for trends and operational follow-up.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Highest Priority
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {kpis.criticalCases} critical cases need monitoring
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Prioritize operational attention toward active and high-risk patients.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Recovery Performance
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {kpis.recoveryRate}% recovery rate
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Use this metric alongside admissions to identify treatment capacity trends.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Dashboard Insight
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      This layout puts KPIs first, then trend and comparison charts, followed by status distribution, which aligns with common dashboard hierarchy guidance for making important healthcare insights easy to scan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}