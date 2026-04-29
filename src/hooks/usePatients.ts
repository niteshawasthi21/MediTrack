import { useContext } from "react";
import { PatientContext } from "../contexts/Patient/CreateContext";

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatients must be used within PatientProvider");
  }
  return context;
};