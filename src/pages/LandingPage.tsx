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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #EAF4FF 0%, #DCEEFF 45%, #F4FAFF 100%)',
        '@keyframes floatCard': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        '@keyframes pulseGlow': {
          '0%, 100%': {
            boxShadow: '0 10px 24px rgba(25,118,210,0.20)',
          },
          '50%': {
            boxShadow: '0 16px 36px rgba(25,118,210,0.34)',
          },
        },
        '@keyframes fadeUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(12px)',
          color: '#0F172A',
          borderBottom: '1px solid #CFE3F5',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 72 }}>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 24px rgba(21,101,192,0.28)',
                }}
              >
                <LocalHospital />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: '#0F3D91',
                }}
              >
                CarePulse
              </Typography>
            </Stack>

            <Stack sx={{ flexDirection: 'row', gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  color: '#0F3D91',
                }}
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
                  background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
                  animation: 'pulseGlow 3s ease-in-out infinite',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
                    transform: 'translateY(-2px)',
                  },
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 5,
            alignItems: 'center',
          }}
        >
          <Box sx={{ animation: 'fadeUp 0.8s ease' }}>
            <Chip
              label="Trusted healthcare operations platform"
              sx={{
                mb: 2.5,
                bgcolor: '#D7ECFF',
                color: '#0F5FB8',
                fontWeight: 700,
                border: '1px solid #B8DBF8',
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

            <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 4 }}>
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
                  background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
                  boxShadow: '0 12px 30px rgba(21,101,192,0.24)',
                  animation: 'pulseGlow 3.2s ease-in-out infinite',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
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
                  color: '#1565C0',
                  borderColor: '#7EB9EE',
                  bgcolor: 'rgba(255,255,255,0.70)',
                  '&:hover': {
                    bgcolor: '#EDF6FF',
                    borderColor: '#1565C0',
                  },
                }}
              >
                Book Demo
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              animation: 'floatCard 4s ease-in-out infinite',
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 6,
                background: 'linear-gradient(135deg, #90CAF9 0%, #D6EEFF 100%)',
                boxShadow: '0 30px 60px rgba(21,101,192,0.18)',
              }}
            >
              <Card
                sx={{
                  borderRadius: 5,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                    {['#E3F2FD', '#90CAF9', '#42A5F5'].map((color) => (
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

                <CardContent sx={{ p: 3, bgcolor: '#FFFFFF' }}>
                  <Typography variant="subtitle2" sx={{ color: '#64748B', mb: 0 }}>
                    Live Overview
                  </Typography>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                    <Card
                      sx={{
                        bgcolor: '#F1F8FF',
                        borderRadius: 3,
                        boxShadow: 'none',
                        border: '1px solid #D7EAF9',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F5FB8' }}>
                          1,284
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Active patients
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                        bgcolor: '#EEF7FF',
                        borderRadius: 3,
                        boxShadow: 'none',
                        border: '1px solid #D7EAF9',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1565C0' }}>
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
                      bgcolor: '#F7FBFF',
                      border: '1px solid #D7EAF9',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#0F172A' }}>
                      Team activity
                    </Typography>

                    <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                      {['A', 'D', 'M'].map((item, index) => (
                        <Box
                          key={item}
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            bgcolor:
                              index === 0 ? '#DCEEFF' : index === 1 ? '#CDE7FF' : '#EAF4FF',
                            color: '#0F5FB8',
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {stats.map((item) => (
            <Card
              key={item.label}
              sx={{
                borderRadius: 4,
                boxShadow: '0 12px 28px rgba(15,23,42,0.06)',
                border: '1px solid #D3E5F5',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #EDF6FF 100%)',
                transition: '0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 18px 36px rgba(21,101,192,0.14)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F5FB8' }}>
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
        <Box sx={{ textAlign: 'center', mb: 5 }}>
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

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              sx={{
                borderRadius: 5,
                boxShadow: '0 14px 34px rgba(15,23,42,0.06)',
                border: '1px solid #D7E8F7',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F4FAFF 100%)',
                transition: '0.25s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 40px rgba(21,101,192,0.12)',
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
                    background: 'linear-gradient(135deg, #DCEEFF 0%, #BFE3FF 100%)',
                    color: '#1565C0',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#0F172A' }}>
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
          background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1E88E5 100%)',
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
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.8,
            }}
          >
            Start with CarePulse and bring patients, alerts, and care teams into one unified experience.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '999px',
              px: 3.5,
              py: 1.3,
              bgcolor: '#FFFFFF',
              color: '#0F5FB8',
              boxShadow: '0 10px 24px rgba(255,255,255,0.20)',
              '&:hover': {
                bgcolor: '#F4F9FF',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
}