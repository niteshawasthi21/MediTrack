import { useContext } from "react";
import { PatientContext } from "../contexts/Patient/CreateContext";

export const usePatients = () => useContext(PatientContext);