import { useMemo, useState } from "react";
import {
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Avatar,
  Chip,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  GridViewRounded,
  ViewListRounded,
  PeopleAltOutlined,
  LocalHospitalOutlined,
} from "@mui/icons-material";

import { usePatients } from "../hooks/usePatients";
import MainLayout from "../components/layout/MainLayout";
import type { Patient } from "../types/patient";

export default function Patients() {
  const { patients } = usePatients();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return patients.filter((p: Patient) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [patients, search]);

  const getStatusColor = (status: string) => {
    if (status === "Critical") return "error";
    if (status === "Stable") return "success";
    return "warning";
  };

  const getStatusClasses = (status: string) => {
    if (status === "Critical") {
      return "bg-red-50 text-red-700 ring-red-100";
    }
    if (status === "Stable") {
      return "bg-emerald-50 text-emerald-700 ring-emerald-100";
    }
    return "bg-amber-50 text-amber-700 ring-amber-100";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Top section */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-slate-500">
                <PeopleAltOutlined fontSize="small" />
                <span className="text-sm font-medium">Patient Directory</span>
              </div>

              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Patients
              </Typography>

              <p className="mt-1 text-sm text-slate-500">
                Search, review, and monitor registered patients across your care system.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
                <span className="font-semibold text-slate-900">
                  {filtered.length}
                </span>{" "}
                patient{filtered.length !== 1 ? "s" : ""} found
              </div>

              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(_, val) => val && setView(val)}
                size="small"
                color="primary"
                className="!rounded-2xl"
              >
                <ToggleButton value="grid" className="!px-4 !py-2">
                  <div className="flex items-center gap-2">
                    <GridViewRounded fontSize="small" />
                    <span>Grid</span>
                  </div>
                </ToggleButton>

                <ToggleButton value="list" className="!px-4 !py-2">
                  <div className="flex items-center gap-2">
                    <ViewListRounded fontSize="small" />
                    <span>List</span>
                  </div>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <div className="mt-5">
            <TextField
              fullWidth
              placeholder="Search by patient name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" className="text-slate-400" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </section>

        {/* Empty state */}
        {filtered.length === 0 && (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <LocalHospitalOutlined />
            </div>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>
              No patients found
            </Typography>
            <p className="mx-auto max-w-md text-sm text-slate-500">
              Try adjusting your search term or switch views to continue browsing the patient directory.
            </p>
          </section>
        )}

        {/* Grid view */}
        {filtered.length > 0 && view === "grid" && (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <Card
                key={p.id}
                className="group !rounded-3xl !border !border-slate-200 !shadow-sm transition hover:!-translate-y-0.5 hover:!shadow-md"
              >
                <CardContent className="!p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="!h-12 !w-12 !bg-blue-100 !text-blue-700 !font-semibold">
                        {p.name?.charAt(0).toUpperCase()}
                      </Avatar>

                      <div className="min-w-0">
                        <Typography
                          sx={{ fontWeight: 700 }}
                          className="truncate"
                        >
                          {p.name}
                        </Typography>
                        <p className="text-sm text-slate-500">
                          {p.age} yrs • {p.gender}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getStatusClasses(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Condition
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {p.condition}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Doctor
                        </p>
                        <p className="mt-1 truncate text-sm font-medium text-slate-700">
                          {p.doctor}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Last Visit
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {p.lastVisit}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <Chip
                      label={p.status}
                      color={getStatusColor(p.status)}
                      size="small"
                    />
                    <button
                      type="button"
                      className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      View Profile
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {/* List view */}
        {filtered.length > 0 && view === "list" && (
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Patient</th>
                    <th className="px-5 py-4">Condition</th>
                    <th className="px-5 py-4">Doctor</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Last Visit</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((p: Patient) => (
                    <tr
                      key={p.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="!h-10 !w-10 !bg-blue-100 !text-blue-700 !font-semibold">
                            {p.name?.charAt(0).toUpperCase()}
                          </Avatar>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-800">
                              {p.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {p.age} yrs • {p.gender}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 font-medium text-slate-700">
                        {p.condition}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {p.doctor}
                      </td>

                      <td className="px-5 py-4">
                        <Chip
                          label={p.status}
                          color={getStatusColor(p.status)}
                          size="small"
                        />
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {p.lastVisit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}