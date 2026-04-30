<div align="center">

# 🏥 MediTrack

### Modern Healthcare Dashboard Demo

A sleek healthcare management demo built with React, TypeScript, and Firebase.  
It helps users explore patient records, dashboard insights, and analytics in a clean and responsive interface.

<p align="center">
  <a href="https://meditrack-ec246.web.app/"><strong>Live Demo</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Backend-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/MUI-UI-007FFF?style=flat-square&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Demo-16a34a?style=flat-square" />
</p>

</div>

---

## Preview

> Add your project screenshot here for a better first impression.

```md

```

---

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Note](#note)
- [License](#license)

---

## Overview

MediTrack is a healthcare dashboard demo project created for showcasing frontend development and dashboard design.  
It focuses on patient management, visual analytics, authentication flow, and a modern responsive user interface.

---

## Highlights

- 👤 Manage patient information in a structured interface
- 📊 View dashboard metrics and healthcare analytics
- 🔐 Authenticate users with Firebase
- 🎨 Enjoy a clean UI with Material UI and Tailwind CSS
- 📱 Use the app smoothly on desktop and mobile devices

---

## Tech Stack

| Category | Tools |
|---|---|
| Frontend | React, TypeScript, Vite |
| UI | Material UI, Tailwind CSS |
| Charts | Recharts |
| Backend Services | Firebase Authentication, Firestore, Firebase Hosting |

---

## Project Structure

```bash
meditrack/
├── src/
│   ├── pages/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── routes/
├── public/
├── firebase.json
├── firestore.rules
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd meditrack
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file

```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
```

4. Start the development server

```bash
npm run dev
```

The app will run on `http://localhost:5173`

---

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## Deployment

Deploy the production build with Firebase Hosting.

```bash
npm run build
firebase deploy
```

**Live URL:** [https://meditrack-ec246.web.app/](https://meditrack-ec246.web.app/)

---

## Note

This project is a demo application created for learning, practice, and portfolio presentation.  
It is not a real-time hospital or healthcare management system.

---

## License

This project is private and proprietary.
