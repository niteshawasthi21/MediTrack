import type { Patient } from "../types/patient";

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    age: 45,
    gender: "Male",
    condition: "Diabetes",
    doctor: "Dr. Mehta",
    status: "Stable",
    lastVisit: "2026-04-20",
  },
  {
    id: "2",
    name: "Priya Singh",
    age: 30,
    gender: "Female",
    condition: "Heart Disease",
    doctor: "Dr. Kapoor",
    status: "Critical",
    lastVisit: "2026-04-25",
  },
  {
    id: "3",
    name: "Amit Verma",
    age: 55,
    gender: "Male",
    condition: "Hypertension",
    doctor: "Dr. Shah",
    status: "Recovering",
    lastVisit: "2026-04-22",
  },
  {
    id: "4",
    name: "Neha Gupta",
    age: 28,
    gender: "Female",
    condition: "Asthma",
    doctor: "Dr. Reddy",
    status: "Stable",
    lastVisit: "2026-04-18",
  },
  {
    id: "5",
    name: "Vikram Joshi",
    age: 60,
    gender: "Male",
    condition: "Cardiac Arrest",
    doctor: "Dr. Kapoor",
    status: "Critical",
    lastVisit: "2026-04-26",
  },
];


// ✅ ADD THIS BELOW (do not remove above)

export const mockAnalytics = {
  kpis: {
    totalPatients: 1240,
    activePatients: 320,
    criticalCases: 18,
    recoveryRate: 92,
  },

  monthlyPatients: [
    { month: "Jan", patients: 120, recovered: 80 },
    { month: "Feb", patients: 150, recovered: 110 },
    { month: "Mar", patients: 180, recovered: 140 },
    { month: "Apr", patients: 200, recovered: 170 },
    { month: "May", patients: 170, recovered: 130 },
    { month: "Jun", patients: 220, recovered: 180 },
  ],
};