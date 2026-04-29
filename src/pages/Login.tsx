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
} from "@mui/material";
import { Visibility, VisibilityOff, LocalHospital } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../hooks/useAuth";
import { getAuthMessage } from "../utils/getAuthMessage";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import AppLoader from "../components/ui/Loader";

export default function Login() {
  const {
    user,
    login,
    signup,
    loginWithGoogle,
    resetPassword,
    error,
    loading,
  } = useAuth();
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

  useEffect(() => {
    if (error) {
      setLocalError(getAuthMessage(error));
    }
  }, [error]);

  const validate = () => {
    if (!email.trim()) {
      setLocalError("Email is required.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError("Please enter a valid email.");
      return false;
    }

    if (!password) {
      setLocalError("Password is required.");
      return false;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const resetMessages = () => {
    setLocalError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!validate()) return;

    try {
      if (isSignUp) {
        await signup(email, password);
        setSuccessMessage("Account created successfully");
        // One redirect via useEffect, no setTimeout needed
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

    if (!resetEmail.trim()) {
      setResetError("Email is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetError("Please enter a valid email.");
      return;
    }

    try {
      setResetLoading(true);
      await resetPassword(resetEmail);
      setResetMessage("Password reset email sent. Please check your inbox.");
    } catch (err) {
      setResetError(getAuthMessage(err));
    } finally {
      setResetLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-500 px-4 py-6 sm:px-6">
      <div className="absolute -right-40 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="!rounded-2xl !shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 text-white py-5 px-6 flex items-center gap-3">
              <div className="-ml-1 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md">
                <LocalHospital className="!text-xl text-white" />
              </div>
              <div>
                <Typography
                  variant="h6"
                  className="!font-bold"
                  sx={{ color: "white" }}
                >
                  CarePulse
                </Typography>
                <Typography variant="body2" className="!text-white/75">
                  Secure B2B healthcare platform
                </Typography>
              </div>
            </div>

            <CardContent className="!p-5 sm:!p-6">
              <Stack spacing={2.5}>
                <div>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {isSignUp ? "Create Account" : "Welcome back"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isSignUp
                      ? "Create your account to continue"
                      : "Sign in to access your dashboard"}
                  </Typography>
                </div>

                {localError && (
                  <Alert
                    severity="error"
                    onClose={() => setLocalError("")}
                    sx={{ fontSize: "0.8125rem" }}
                  >
                    {localError}
                  </Alert>
                )}

                {successMessage && (
                  <Alert
                    severity="success"
                    onClose={() => setSuccessMessage("")}
                    sx={{ fontSize: "0.8125rem" }}
                  >
                    {successMessage}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      slotProps={{
                        htmlInput: { autoComplete: "username" },
                        inputLabel: { shrink: true },
                      }}
                      size="small"
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      autoComplete={
                        isSignUp ? "new-password" : "current-password"
                      }
                      size="small"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                edge="end"
                                aria-label={
                                  showPassword
                                    ? "Hide password"
                                    : "Show password"
                                }
                                size="small"
                              >
                                {showPassword ? (
                                  <VisibilityOff fontSize="small" />
                                ) : (
                                  <Visibility fontSize="small" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    {!isSignUp && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleForgotPasswordOpen}
                          className="text-xs font-medium text-blue-500 hover:cursor-pointer hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      size="small"
                      className="!py-2 !font-medium"
                    >
                      {loading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : isSignUp ? (
                        "Create Account"
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </Stack>
                </form>

                <Divider>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    or
                  </span>
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogle}
                  disabled={loading}
                  size="small"
                  className="!py-2 !font-medium"
                >
                  Continue with Google
                </Button>

                <div className="text-center text-xs text-slate-600">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <button
                    type="button"
                    disabled={loading}
                    className="ml-1 font-semibold text-blue-500 hover:underline"
                    onClick={() => {
                      setIsSignUp((p) => !p);
                      resetMessages();
                    }}
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Typography
            variant="caption"
            className="mt-3 text-center text-white/55 block"
          >
            © 2026 CarePulse
          </Typography>
        </div>
      </div>

      <ForgotPasswordDialog
        open={forgotOpen}
        email={resetEmail}
        loading={resetLoading}
        error={resetError}
        message={resetMessage}
        onClose={() => !resetLoading && setForgotOpen(false)}
        onEmailChange={setResetEmail}
        onSubmit={handleForgotPassword}
      />

      <AppLoader
        open={loading && !user}
        message={isSignUp ? "Creating your account..." : "Signing you in..."}
      />
    </div>
  );
}
