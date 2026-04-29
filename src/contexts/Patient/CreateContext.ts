import { createContext } from "react";
import type { Patient } from "../../types/patient";

export interface PatientContextType {
  patients: Patient[];
}

export const PatientContext = createContext<PatientContextType | null>(null);