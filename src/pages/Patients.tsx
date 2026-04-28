import { useState } from "react";
import {
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";

import { usePatients } from "../hooks/usePatients";
import MainLayout from "../components/layout/MainLayout";

export default function Patients() {
  const { patients } = usePatients();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    if (status === "Critical") return "error";
    if (status === "Stable") return "success";
    return "warning";
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Patients
        </Typography>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, val) => val && setView(val)}
          size="small"
        >
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search patients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No patients found
        </div>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Card
              key={p.id}
              className="rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="!bg-blue-100 !text-blue-600">
                    {p.name[0]}
                  </Avatar>

                  <div>
                    <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                    <Typography variant="caption">
                      {p.age} yrs • {p.gender}
                    </Typography>
                  </div>
                </div>

                <div className="mt-3">
                  <Typography variant="body2">
                    {p.condition}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {p.doctor}
                  </Typography>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <Chip
                    label={p.status}
                    color={getStatusColor(p.status)}
                    size="small"
                  />
                  <span className="text-xs text-gray-400">
                    {p.lastVisit}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left border-b text-gray-500">
              <tr>
                <th className="p-2">Patient</th>
                <th className="p-2">Condition</th>
                <th className="p-2">Doctor</th>
                <th className="p-2">Status</th>
                <th className="p-2">Last Visit</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.condition}</td>
                  <td className="p-2">{p.doctor}</td>
                  <td className="p-2">
                    <Chip
                      label={p.status}
                      color={getStatusColor(p.status)}
                      size="small"
                    />
                  </td>
                  <td className="p-2">{p.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
}