export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  doctor: string;
  status: "Stable" | "Critical" | "Recovering";
  lastVisit: string;
}