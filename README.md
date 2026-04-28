# 🏥 MediTrack - Healthcare Management Platform

A modern, full-featured healthcare management application built with React, TypeScript, and Firebase. MediTrack simplifies hospital operations by providing a unified dashboard for patient management, real-time alerts, analytics, and team collaboration.

**Live Demo:** https://meditrack-ec246.web.app/

---

## ✨ Features

### 🎯 Core Functionality
- **Patient Management** - Track patient records, health status, conditions, and medical history
- **Real-time Dashboard** - Live overview of active patients, critical alerts, and team activity
- **Smart Analytics** - Visualize patient trends with interactive charts and KPI metrics
- **Critical Alerts** - Get notified of critical patient conditions in real-time
- **Team Collaboration** - Unified platform for doctors, nurses, and administrators

### 🔐 Authentication & Security
- **Firebase Authentication** - Secure email/password and Google OAuth login
- **Role-based Access** - Protected routes for authenticated users
- **Secure Data Storage** - Firestore with security rules

### 📊 Analytics & Insights
- **Interactive Charts** - Monthly patient data visualization using Recharts
- **KPI Metrics** - Track key performance indicators
- **Patient Status Tracking** - Monitor stable, critical, and recovering patients
- **Trend Analysis** - Understand patient patterns over time

### 🎨 User Interface
- **Modern Design** - Beautiful, responsive UI built with Material-UI v9
- **Dark & Light Support** - Adaptive UI themes
- **Mobile-Friendly** - Fully responsive across all devices
- **Smooth Animations** - Polished interactions and transitions

### 🔔 Notifications
- **Push Notifications** - Browser-based alerts for critical events
- **Permission Management** - User-controlled notification settings
- **Real-time Updates** - Instant alerts on patient status changes

---

## 🛠 Tech Stack

### Frontend
- **React 19.2** - Latest React with improved performance
- **TypeScript 6.0** - Type-safe development
- **Vite 8.0** - Lightning-fast build tool with HMR

### UI & Styling
- **Material-UI (MUI) v9.0** - Enterprise-grade component library
- **Tailwind CSS 4.2** - Utility-first styling framework
- **Emotion** - CSS-in-JS styling solution
- **MUI Icons** - Comprehensive icon library

### Data Visualization
- **Recharts 3.8** - React charting library for analytics

### Backend & Database
- **Firebase 12.12** - Backend as a Service
  - Authentication (Email/Password, Google OAuth)
  - Firestore (Real-time NoSQL database)
  - Hosting

### State Management & Routing
- **React Context API** - Global state management
- **React Router DOM 7.14** - Client-side routing

### Development Tools
- **ESLint** - Code quality and linting
- **TypeScript ESLint** - Type-aware linting rules

---

## 📂 Project Structure

```
meditrack/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx      # Marketing landing page
│   │   ├── Login.tsx            # Authentication page
│   │   ├── Dashboard.tsx        # Main dashboard with KPIs
│   │   ├── Patients.tsx         # Patient list & management
│   │   ├── Analytics.tsx        # Advanced analytics page
│   │   └── NotFound.tsx         # 404 page
│   ├── components/
│   │   ├── layout/
│   │   │   └── MainLayout.tsx   # Shared layout wrapper
│   │   └── ui/                  # Reusable UI components
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Authentication state
│   │   ├── PatientContext.tsx   # Patient data state
│   │   └── UIContext.tsx        # UI theme/settings
│   ├── hooks/
│   │   ├── useAuth.ts           # Auth utilities
│   │   └── usePatients.ts       # Patient data utilities
│   ├── services/
│   │   ├── firebase.ts          # Firebase initialization
│   │   ├── notification.ts      # Push notification service
│   │   ├── homeData.ts          # Home page data
│   │   └── mockData.ts          # Mock patient data
│   ├── types/
│   │   ├── patient.ts           # Patient interface
│   │   ├── home.ts              # Home page types
│   │   └── AuthContextType.ts   # Auth types
│   ├── routes/
│   │   ├── AppRoutes.tsx        # Route definitions
│   │   └── ProtectedRoute.tsx   # Protected route wrapper
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── public/
│   └── sw.js                    # Service worker
├── index.html                   # HTML template
├── firebase.json                # Firebase config
├── firestore.rules              # Firestore security rules
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meditrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env.local` file in the project root:
   ```env
   VITE_API_KEY=your_firebase_api_key
   VITE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_PROJECT_ID=your_firebase_project_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

---

## 📦 Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## 🔐 Authentication

MediTrack supports multiple authentication methods:

### Email/Password Login
- Register new account with email and password
- Secure password hashing via Firebase
- Remember me functionality

### Google OAuth
- One-click Google account login
- No password management needed
- Automatic account creation on first login

### Protected Routes
All pages except Landing and Login require authentication. Unauthenticated users are automatically redirected to the login page.

---

## 📊 Key Pages

### 🏠 Landing Page
- Product overview and features
- Marketing messaging
- Quick links to login/signup
- Statistics and testimonials

### 🔑 Login Page
- Email/password authentication
- Google OAuth integration
- Account creation form
- Password recovery link

### 📈 Dashboard
- Real-time KPI metrics
- Active patient count
- Critical alerts counter
- Monthly patient trend chart
- Recent patient list
- Team activity feed

### 👥 Patients
- Complete patient directory
- Filter by status (Stable, Critical, Recovering)
- Patient details and medical history
- Assigned doctor information
- Quick action buttons

### 📊 Analytics
- Advanced data visualization
- Multiple chart types
- Historical data analysis
- Custom date range filtering
- Export capabilities

---

## 🔄 Data Flow

```
Firebase Authentication
    ↓
AuthContext (Global Auth State)
    ↓
Protected Routes
    ↓
PatientContext (Global Patient Data)
    ↓
Pages & Components
```

---

## 🌐 Deployment

### Firebase Hosting

1. **Build production bundle**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

3. **View live site**
   Visit: https://meditrack-ec246.web.app/

### Environment Variables for Deployment
Ensure `.env.local` exists locally with valid Firebase credentials. This file is NOT committed to git for security.

---

## 🔒 Security Features

- **Firebase Security Rules** - Database access control
- **Environment Variables** - Sensitive data protection
- **.gitignore Protection** - Prevents credential leaks
- **HTTPS Only** - Firebase Hosting enforces HTTPS
- **Authentication Required** - Protected routes and data access

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎨 UI/UX Highlights

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Accessibility** - WCAG 2.1 compliant components
- **Performance** - Optimized bundle size and load times
- **Visual Hierarchy** - Clear information prioritization
- **Color Scheme** - Professional healthcare branding

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 📞 Support

For issues and questions, please contact the development team or open an issue on the project repository.

---

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced appointment scheduling
- [ ] Telemedicine capabilities
- [ ] AI-powered health insights
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Export patient reports (PDF)
- [ ] Integration with hospital systems

---

## ✅ Version Info

- **Current Version:** 0.0.0
- **Last Updated:** April 2026
- **Deployment Status:** Live on Firebase Hosting
- **Node.js Version:** 18+
- **React Version:** 19.2.5
- **TypeScript Version:** 6.0.2
- **Vite Version:** 8.0.10
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
