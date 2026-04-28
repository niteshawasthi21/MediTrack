import {
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

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
} from "recharts";

import { mockAnalytics } from "../services/mockData";
import MainLayout from "../components/layout/MainLayout";

export default function Analytics() {
  const { kpis, monthlyPatients } = mockAnalytics;

  return (
    <MainLayout>
      <div className="mb-6">
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Analytics
        </Typography>
        <Typography className="text-gray-500">
          Insights & performance overview
        </Typography>
      </div>

      <Grid container spacing={2} className="mb-6">
        {[
          { label: "Total Patients", value: kpis.totalPatients },
          { label: "Active Patients", value: kpis.activePatients },
          { label: "Critical Cases", value: kpis.criticalCases },
          { label: "Recovery Rate", value: `${kpis.recoveryRate}%` },
        ].map((item, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <Card className="rounded-xl shadow-sm">
              <CardContent>
                <Typography className="text-sm text-gray-500">
                  {item.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="rounded-xl">
            <CardContent>
              <Typography sx={{ fontWeight: 700 }} className="mb-4">
                Patient Growth Trend
              </Typography>

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
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="rounded-xl">
            <CardContent>
              <Typography sx={{ fontWeight: 700 }} className="mb-4">
                Recovery vs Admissions
              </Typography>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyPatients}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patients" fill="#1976d2" />
                  <Bar dataKey="recovered" fill="#00acc1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}