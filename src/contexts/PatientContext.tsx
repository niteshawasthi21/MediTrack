import { createContext, useState,type ReactNode } from "react";
import { mockPatients } from "../services/mockData";
import type { Patient } from "../types/patient";

interface PatientContextType {
  patients: Patient[];
}

export const PatientContext = createContext<PatientContextType>({
  patients: [],
});

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [patients] = useState<Patient[]>(mockPatients);

  return (
    <PatientContext.Provider value={{ patients }}>
      {children}
    </PatientContext.Provider>
  );
};