import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Typography variant="h3" sx={{ fontWeight: 700 }} className="mb-2">
        404
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }} className="mb-4">
        Page Not Found
      </Typography>

      <Typography className="text-gray-500 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}