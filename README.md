# 🏋️ GymPlanner – AI-Powered Training Plan Generator

A fullstack web application that generates personalized gym training plans using AI based on user profile and fitness goals.

---

## 🚀 Overview

**GymPlanner** is an AI-driven fitness web app that helps users create structured, personalized workout programs in seconds.

Users simply complete a short onboarding questionnaire, and the system generates a custom training plan including:

- Weekly workout schedule  
- Exercise details (sets, reps, rest, RPE)  
- Program notes & progression strategy  

---

## ✨ Key Features

### 🤖 AI Training Plan Generation
- Generate personalized workout plans using LLM via OpenRouter  
- Structured JSON output for consistent rendering  
- Supports multiple goals: bulk, cut, strength, endurance  

### 👤 User Onboarding
- Collect user fitness profile:
  - Goal  
  - Experience level  
  - Training frequency  
  - Equipment access  
  - Injuries / limitations  

### 📊 Plan Management
- Save and version training plans  
- Fetch latest plan per user  
- Regenerate plans with one click  

### ⚡ Real-time UX
- Loading states (AI generation)  
- Disabled actions to prevent spam  
- Toast notifications for feedback  

---

## 🧱 Tech Stack

### 🖥️ Frontend
- React + TypeScript  
- Context API (State Management)  
- Tailwind CSS  

### ⚙️ Backend
- Node.js + Express.js  
- RESTful API design  

### 🗄️ Database
- PostgreSQL  
- Prisma ORM  

### 🔐 Authentication
- Neon Auth (`@neondatabase/neon-js`)  

### 🤖 AI Integration
- LLM: LiquidAI LFM 2.5 (1.2B Instruct) via OpenRouter  
- Generates structured JSON outputs with validation and error handling

---

## 🔄 Application Flow

1. User signs in  
2. Completes onboarding form  
3. Profile is saved to database  
4. AI generates training plan  
5. Plan is stored & displayed  
6. User can regenerate new versions anytime  

---

## 📌 API Endpoints

### Profile
- POST /api/profile

### Training Plan
- POST /api/plan/generate
- GET  /api/plan/current?userId=


---

## ⚙️ Environment Variables

Create a `.env` file:
- DATABASE_URL=your_database_url
- OPEN_ROUTER_KEY=your_openrouter_api_key
- BASE_URL=http://localhost:3001

---

## 🧠 Challenges & Solutions

### ❗ AI Response Reliability
- Ensured structured JSON output  
- Added validation + error handling  

### ⚡ API Latency
- Implemented loading states  
- Prevented duplicate requests  

### 🔄 State Synchronization
- Centralized state using Context API  
- Controlled refresh flow after mutations  

---

## 📸 Screenshots

### Onboarding (create personal profile)
<img width="957" height="1026" alt="image" src="https://github.com/user-attachments/assets/285dea08-84e4-4ad9-a1be-5db84cb9012e" />

### Generating customized plan
<img width="955" height="502" alt="image" src="https://github.com/user-attachments/assets/e95e7c3d-e105-4f90-b519-6d37d8289fcc" />

### Show current training plan
<img width="943" height="1031" alt="image" src="https://github.com/user-attachments/assets/9b7e428d-5893-42c7-aa08-98df8ffa31b2" />

---

## 🏆 Highlights

- ✅ Fullstack application (React + Express + PostgreSQL)  
- ✅ AI-powered feature (real-world LLM integration)  
- ✅ Clean architecture & scalable structure  
- ✅ Production-ready UX patterns (loading, error handling)  
- ✅ Versioned data design (training plan history)  

---

## 📈 Future Improvements

- Add workout tracking & progress analytics  
- Mobile responsiveness optimization  
- AI fine-tuning for better plan quality  
- Social features (share plans, community)  

---

## 👨‍💻 Author

**Krypto1910**  
GitHub: https://github.com/Krypto1910  

---

## ⭐ Why This Project Matters

This project demonstrates:

- Ability to build end-to-end fullstack applications  
- Experience integrating AI into real products  
- Understanding of system design, state management, and UX  
