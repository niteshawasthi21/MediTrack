import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/Auth/AuthContextProvider";
import { PatientProvider } from "./contexts/Patient/PatientContextProvider";

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