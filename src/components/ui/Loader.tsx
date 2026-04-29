import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";

type AppLoaderProps = {
  open: boolean;
  message?: string;
};

export default function AppLoader({
  open,
  message = "Please wait...",
}: AppLoaderProps) {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: "rgba(8, 15, 40, 0.72)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          minWidth: 220,
          px: 4,
          py: 3,
          borderRadius: 4,
          textAlign: "center",
          bgcolor: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        }}
      >
        <Box
          sx={{
            mx: "auto",
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: 3,
            bgcolor: "#2563eb",
            boxShadow: "0 8px 20px rgba(37,99,235,0.35)",
          }}
        >
          <LocalHospital sx={{ color: "#fff", fontSize: 28 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}
        >
          CarePulse
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.75)", mb: 2 }}
        >
          {message}
        </Typography>

        <CircularProgress
          size={26}
          thickness={4.5}
          sx={{ color: "#7dd3fc" }}
        />
      </Box>
    </Backdrop>
  );
}