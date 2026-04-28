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

function getAuthMessage(err: unknown) {
  const code =
    typeof err === "object" && err && "code" in err
      ? String((err as { code?: string }).code)
      : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";
    case "auth/account-exists-with-different-credential":
      return "Account exists with a different provider.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function Login() {
  const { user, login, signup, loginWithGoogle, error, loading } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // ✅ Sync global error
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

        // small delay so user can see message
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 800);
      } else {
        await login(email, password);
        // ❌ navigate handled by useEffect
      }
    } catch (err) {
      setLocalError(getAuthMessage(err));
    }
  };

  const handleGoogle = async () => {
    resetMessages();

    try {
      await loginWithGoogle();
      // ❌ no navigate here
    } catch (err) {
      setLocalError(getAuthMessage(err));
    }
  };

  // ✅ Prevent flicker
  if (loading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-500 px-4 sm:px-6">
      {/* Background blobs */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-3xl">
          {/* Card */}
          <Card className="!rounded-3xl !shadow-2xl !border-0 overflow-hidden">
            {/* Brand header inside card */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 text-white py-6 px-8 flex items-center gap-3">
              <div className="-ml-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 shadow-md">
                <LocalHospital className="!text-2xl text-white" />
              </div>

              <div>
                <Typography
                  variant="h5"
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

            <CardContent className="!p-6 sm:!p-8">
              <Stack spacing={3}>
                {/* Title */}
                <div>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {isSignUp ? "Create Account" : "Welcome back"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isSignUp
                      ? "Create your account to continue"
                      : "Sign in to access your dashboard"}
                  </Typography>
                </div>

                {/* Alerts */}
                {localError && (
                  <Alert severity="error" onClose={() => setLocalError("")}>
                    {localError}
                  </Alert>
                )}
                {successMessage && (
                  <Alert
                    severity="success"
                    onClose={() => setSuccessMessage("")}
                  >
                    {successMessage}
                  </Alert>
                )}

                {/* Form */}
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
                        inputLabel: { shrink: true },
                      }}
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
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      className="!rounded-xl !py-3 !font-semibold"
                    >
                      {loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : isSignUp ? (
                        "Create Account"
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </Stack>
                </form>

                {/* Divider */}
                <Divider>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    or
                  </span>
                </Divider>

                {/* Google */}
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogle}
                  disabled={loading}
                  className="!rounded-xl !py-3 !font-semibold"
                >
                  Continue with Google
                </Button>

                {/* Toggle */}
                <div className="text-center text-sm text-slate-600">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <button
                    disabled={loading}
                    className="ml-1 font-semibold text-blue-600 hover:underline"
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
            className="mt-4 text-center text-white/55"
          >
            © 2026 CarePulse
          </Typography>
        </div>
      </div>
    </div>
  );
}
