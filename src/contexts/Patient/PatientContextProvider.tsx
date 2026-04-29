import { useState, type ReactNode } from "react";
import { mockPatients } from "../../services/mockData";
import type { Patient } from "../../types/patient";
import { PatientContext } from "./CreateContext";

type PatientProviderProps = {
  children: ReactNode;
};

export const PatientProvider = ({ children }: PatientProviderProps) => {
  const [patients] = useState<Patient[]>(mockPatients);

  return (
    <PatientContext.Provider value={{ patients }}>
      {children}
    </PatientContext.Provider>
  );
};