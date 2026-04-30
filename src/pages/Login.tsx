import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  Stack,
  Box,
  keyframes,
} from "@mui/material";
import { Visibility, VisibilityOff, LocalHospital } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../hooks/useAuth";
import { getAuthMessage } from "../utils/getAuthMessage";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import AppLoader from "../components/ui/Loader";

// Define animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function Login() {
  const { user, login, signup, loginWithGoogle, resetPassword, error, loading } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const authErrorMessage = error ? getAuthMessage(error) : "";
  const displayError = localError || authErrorMessage;

  const validate = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setLocalError("Please enter a valid email.");
      return false;
    }
    if (!password || password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const resetMessages = () => { setLocalError(""); setSuccessMessage(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!validate()) return;
    try {
      if (isSignUp) {
        await signup(email, password);
        setSuccessMessage("Account created successfully");
      } else {
        await login(email, password);
      }
    } catch (err) {
      setLocalError(getAuthMessage(err));
    }
  };

  const handleGoogle = async () => {
    resetMessages();
    try {
      await loginWithGoogle();
    } catch (err) {
      setLocalError(getAuthMessage(err));
    }
  };

  const handleForgotPasswordOpen = () => {
    setResetEmail(email);
    setResetError("");
    setResetMessage("");
    setForgotOpen(true);
  };

  const handleForgotPassword = async () => {
    setResetError("");
    setResetMessage("");
    if (!resetEmail.trim() || !/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetError("Please enter a valid email.");
      return;
    }
    try {
      setResetLoading(true);
      await resetPassword(resetEmail);
      setResetMessage("Password reset email sent.");
    } catch (err) {
      setResetError(getAuthMessage(err));
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 50%, #1e3a8a 0%, #0f172a 100%)",
        position: "relative",
        overflow: "hidden",
        p: 2,
      }}
    >
      {/* Decorative Blur Orbs */}
      <Box sx={{ position: "absolute", top: "-10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(56, 189, 248, 0.1)", filter: "blur(80px)" }} />
      <Box sx={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(167, 139, 250, 0.08)", filter: "blur(80px)" }} />

      <Box sx={{ width: "100%", maxWidth: 400, animation: `${fadeIn} 0.8s ease-out` }}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            overflow: "hidden",
            animation: `${float} 6s ease-in-out infinite`,
            bgcolor: "rgba(255, 255, 255, 0.98)",
          }}
        >
          {/* Header */}
          <Box sx={{ bgcolor: "#0f172a", color: "white", py: 3, px: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1, borderRadius: 2, bgcolor: "#1e293b" }}>
              <LocalHospital sx={{ fontSize: 24, color: "#38bdf8" }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>CarePulse</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>Secure B2B Platform</Typography>
            </Box>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{isSignUp ? "Create Account" : "Welcome back"}</Typography>
                <Typography variant="body2" color="text.secondary">Enter your details to continue</Typography>
              </Box>

              {(displayError || successMessage) && (
                <Alert severity={displayError ? "error" : "success"} onClose={() => { setLocalError(""); setSuccessMessage(""); }}>
                  {displayError || successMessage}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField fullWidth label="Email" size="small" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                  <TextField
                    fullWidth label="Password" type={showPassword ? "text" : "password"} size="small" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}
                    slotProps={{
                      input:{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),}
                    }}
                  />
                  {!isSignUp && (
                    <Box sx={{ textAlign: "right" }}>
                      <Button onClick={handleForgotPasswordOpen} sx={{ fontSize: "0.75rem", textTransform: "none" }}>Forgot password?</Button>
                    </Box>
                  )}
                  <Button type="submit" fullWidth variant="contained" disabled={loading} size="large" sx={{ fontWeight: 700, borderRadius: 2 }}>
                    {loading ? <CircularProgress size={20} color="inherit" /> : (isSignUp ? "Create Account" : "Sign In")}
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 1 }} />
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogle} disabled={loading} sx={{ borderRadius: 2 }}>
                Continue with Google
              </Button>

              <Typography variant="body2" sx={{ textAlign: "center", fontSize: "0.8rem" }}>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <Button onClick={() => { setIsSignUp(!isSignUp); resetMessages(); }} sx={{ textTransform: "none", p: 0, minWidth: "auto", ml: 0.5 }}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </Button>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Typography variant="caption" sx={{ mt: 3, display: "block", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
          © 2026 CarePulse
        </Typography>
      </Box>

      <ForgotPasswordDialog open={forgotOpen} email={resetEmail} loading={resetLoading} error={resetError} message={resetMessage} onClose={() => setForgotOpen(false)} onEmailChange={setResetEmail} onSubmit={handleForgotPassword} />
      <AppLoader open={loading && !user} message={isSignUp ? "Creating account..." : "Signing in..."} />
    </Box>
  );
}