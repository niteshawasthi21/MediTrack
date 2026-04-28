import {
  People,
  LocalHospital,
  Warning,
  TrendingUp,
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
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

export default function Dashboard() {
  const { user } = useAuth();
  const { patients } = usePatients();
  const navigate = useNavigate();

  const { kpis, monthlyPatients } = mockAnalytics;

  const critical = patients.filter((p) => p.status === "Critical");
  const recent = patients.slice(0, 5);

  const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <Typography variant="h5">
          {greeting()}, {user?.email || "Doctor"} 👋
        </Typography>
        <Typography className="text-gray-500">
          Overview of your healthcare system
        </Typography>
      </div>

      <Grid container spacing={2} className="mb-6">
        {[
          {
            label: "Total Patients",
            value: kpis.totalPatients,
            icon: <People />,
            color: "text-blue-600",
          },
          {
            label: "Active Patients",
            value: kpis.activePatients,
            icon: <LocalHospital />,
            color: "text-cyan-600",
          },
          {
            label: "Critical Cases",
            value: kpis.criticalCases,
            icon: <Warning />,
            color: "text-red-600",
          },
          {
            label: "Recovery Rate",
            value: `${kpis.recoveryRate}%`,
            icon: <TrendingUp />,
            color: "text-green-600",
          },
        ].map((item, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <Card className="rounded-xl shadow-sm hover:shadow-md transition">
              <CardContent className="flex items-center justify-between">
                <div>
                  <Typography variant="body2" className="text-gray-500">
                    {item.label}
                  </Typography>
                  <Typography variant="h5">
                    {item.value}
                  </Typography>
                </div>
                <div className={item.color}>{item.icon}</div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card className="rounded-xl">
            <CardContent>
              <div className="mb-4 flex justify-between">
                <Typography sx={{ fontWeight: 700 }}>
                  Patient Trends
                </Typography>
                <Button size="small" onClick={() => navigate("/analytics")}>
                  View Analytics
                </Button>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyPatients}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="patients"
                    stroke="#1976d2"
                    fill="#1976d2"
                  />
                  <Area
                    type="monotone"
                    dataKey="recovered"
                    stroke="#00acc1"
                    fill="#00acc1"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="rounded-xl h-full">
            <CardContent>
              <div className="mb-3 flex justify-between">
                <Typography sx={{ fontWeight: 700 }}>
                  Critical Alerts
                </Typography>
                <Chip label={critical.length} color="error" size="small" />
              </div>

              {critical.length === 0 ? (
                <Typography className="text-gray-500">
                  No critical patients
                </Typography>
              ) : (
                critical.map((p) => (
                  <div
                    key={p.id}
                    className="flex cursor-pointer items-center justify-between rounded px-2 py-2 hover:bg-gray-50"
                    onClick={() => navigate("/patients")}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="!bg-red-100 !text-red-600">
                        {p.name[0]}
                      </Avatar>
                      <div>
                        <Typography variant="body2">{p.name}</Typography>
                        <Typography variant="caption">{p.condition}</Typography>
                      </div>
                    </div>
                    <span className="text-xs text-red-500">●</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card className="rounded-xl">
            <CardContent>
              <div className="mb-3 flex justify-between">
                <Typography sx={{ fontWeight: 700 }}>
                  Recent Patients
                </Typography>
                <Button size="small" onClick={() => navigate("/patients")}>
                  View All
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b text-gray-500">
                    <tr>
                      <th className="p-2 text-left">Patient</th>
                      <th className="p-2 text-left">Condition</th>
                      <th className="p-2 text-left">Doctor</th>
                      <th className="p-2 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recent.map((p) => (
                      <tr
                        key={p.id}
                        className="cursor-pointer border-b hover:bg-gray-50"
                        onClick={() => navigate("/patients")}
                      >
                        <td className="p-2">{p.name}</td>
                        <td className="p-2">{p.condition}</td>
                        <td className="p-2">{p.doctor}</td>
                        <td className="p-2">
                          <Chip label={p.status} size="small" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}