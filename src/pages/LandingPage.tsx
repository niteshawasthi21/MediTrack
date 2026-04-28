import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import {
  LocalHospital,
  MonitorHeart,
  Insights,
  Security,
  ArrowForward,
} from '@mui/icons-material';

const stats = [
  { value: '12K+', label: 'Patients managed' },
  { value: '250+', label: 'Healthcare teams' },
  { value: '99.9%', label: 'Platform uptime' },
];

const features = [
  {
    title: 'Patient Monitoring',
    desc: 'Track patient records, health status, and daily activity in one place.',
    icon: <MonitorHeart sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Smart Insights',
    desc: 'Get useful analytics and reports to improve operational decisions.',
    icon: <Insights sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Secure Access',
    desc: 'Keep healthcare data protected with secure access and user controls.',
    icon: <Security sx={{ fontSize: 28 }} />,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#F8FBFF', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          color: '#0F172A',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 72 }}>
            <Stack component="div" sx={{ flexDirection: 'row', spacing: 1.5, alignItems: 'center', gap:2}}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2.5,
                  bgcolor: '#1565C0',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 24px rgba(21,101,192,0.25)',
                }}
              >
                <LocalHospital />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                CarePulse
              </Typography>
            </Stack>

            <Stack component="div" sx={{ flexDirection: 'row', spacing: 1.5,gap:2 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Sign In
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: '999px',
                  px: 2.5,
                  boxShadow: 'none',
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box component="div" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 5, alignItems: 'center' }}>
          <Box component="div">
            <Chip
              label="Trusted healthcare operations platform"
              sx={{
                mb: 2.5,
                bgcolor: '#E3F2FD',
                color: '#1565C0',
                fontWeight: 700,
              }}
            />

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.1,
                fontSize: { xs: '2.2rem', md: '3.5rem' },
              }}
            >
              Simplify healthcare management with one smart dashboard
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2.5,
                color: '#475569',
                lineHeight: 1.8,
                maxWidth: 560,
                fontSize: '1.05rem',
              }}
            >
              CarePulse helps hospitals and healthcare teams manage patients,
              monitor alerts, and improve daily operations with speed and clarity.
            </Typography>

            <Stack component="div" sx={{ flexDirection: { xs: 'column', sm: 'row' }, spacing: 2, mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: '999px',
                  px: 3,
                  py: 1.4,
                  boxShadow: '0 12px 30px rgba(21,101,192,0.22)',
                }}
              >
                Start Free
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: '999px',
                  px: 3,
                  py: 1.4,
                }}
              >
                Book Demo
              </Button>
            </Stack>
          </Box>

          <Box component="div">
            <Box
              sx={{
                p: 2,
                borderRadius: 6,
                background: 'linear-gradient(135deg, #1565C0 0%, #00ACC1 100%)',
                boxShadow: '0 30px 60px rgba(15,23,42,0.16)',
              }}
            >
              <Card sx={{ borderRadius: 5, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: '#0F172A', px: 2, py: 1.5 }}>
                  <Stack component="div" sx={{ flexDirection: 'row', spacing: 1 }}>
                    {['#EF4444', '#F59E0B', '#10B981'].map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: color,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0 }}>
                    Live Overview
                  </Typography>

                  <Box component="div" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                    <Card
                      sx={{
                        bgcolor: '#F8FAFC',
                        borderRadius: 3,
                        boxShadow: 'none',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>
                          1,284
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Active patients
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                        bgcolor: '#F8FAFC',
                        borderRadius: 3,
                        boxShadow: 'none',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>
                          36
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Critical alerts
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 3,
                      bgcolor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                      Team activity
                    </Typography>

                    <Stack component="div" sx={{ flexDirection: 'row', spacing: 1, alignItems: 'center' }}>
                      {['A', 'D', 'M'].map((item, index) => (
                        <Box
                          key={item}
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            bgcolor: index === 0 ? '#E3F2FD' : index === 1 ? '#E0F7FA' : '#F1F5F9',
                            color: '#1565C0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 14,
                          }}
                        >
                          {item}
                        </Box>
                      ))}

                      <Typography variant="body2" color="text.secondary">
                        Doctors and admins aligned in one place
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Stats */}
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Box component="div" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {stats.map((item) => (
            <Card
              key={item.label}
              sx={{
                borderRadius: 4,
                boxShadow: 'none',
                border: '1px solid #E2E8F0',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {item.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box component="div" sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 800, color: '#0F172A' }}
          >
            Everything your healthcare team needs
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 1.5,
              color: '#64748B',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Designed for care teams that want faster workflows, better visibility,
            and a smoother patient management experience.
          </Typography>
        </Box>

        <Box component="div" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {features.map((feature) => (
            <Card
              key={feature.title}
              sx={{
                borderRadius: 5,
                boxShadow: 'none',
                border: '1px solid #E2E8F0',
                transition: '0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
                },
              }}
            >
              <CardContent sx={{ p: 3.2 }}>
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #E3F2FD 0%, #E0F7FA 100%)',
                    color: '#1565C0',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {feature.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 7, md: 9 },
          bgcolor: '#0F172A',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 800, mb: 2 }}
          >
            Ready to modernize your healthcare workflow?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              mb: 4,
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.8,
            }}
          >
            Start with CarePulse and bring patients, alerts, and care teams into one unified experience.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}