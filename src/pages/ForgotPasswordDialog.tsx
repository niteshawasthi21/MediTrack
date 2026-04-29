import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ForgotPasswordDialogProps = {
  open: boolean;
  email: string;
  loading: boolean;
  error: string;
  message: string;
  onClose: () => void;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
};

export default function ForgotPasswordDialog({
  open,
  email,
  loading,
  error,
  message,
  onClose,
  onEmailChange,
  onSubmit,
}: ForgotPasswordDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => !loading && onClose()}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            p: 1,
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          textAlign: "center",
          position: "relative",
          pt: 3,
        }}
      >
        Reset Password
        <IconButton
          onClick={onClose}
          disabled={loading}
          size="small"
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            bgcolor: "grey.100",
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 1 }}>
        <Typography variant="body2"  sx={{ px: 1, mb: 2, color: "text.primary" }}>
          Enter your email to receive a secure password reset link.
        </Typography>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {message && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
            {message}
          </Alert>
        )}

        {/* Input */}
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={loading}
          autoFocus
          size="medium"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </DialogContent>

      <Divider sx={{ mt: 2 }} />

      {/* Actions */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={loading}
          sx={{
            minWidth: 160,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Send Link"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
