import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { PatientProvider } from "./contexts/PatientContext";

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <AppRoutes />
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;