# MinOps CRM

> Manage Leads. Track Follow-Ups. Close More Deals.

MinOps is a premium, high-fidelity CRM designed for modern service teams who value speed, simplicity, and design excellence. Moving away from standard AI-generated layouts, MinOps offers a bespoke, custom workspace tailored to B2B teams, taking inspiration from industry-leading platforms like Linear and Attio.

---

## ✨ Features

### 📊 Executive Dashboard
* **Dynamic Analytics**: Theme-aware Area, Line, Bar, and Pie charts that automatically adapt to light/dark themes using CSS variables.
* **KPI Metrics**: Sleek summary tiles with micro-hover shadow transitions and real-time performance indicators (Conversion, Revenue, Wins).

### 🗃️ CRM Spreadsheet (Attio-style Grid)
* **Sticky Table Headers**: Column headers float with a subtle backdrop blur on scroll, keeping your workspace structured.
* **Quick Interactions**: On-row hover triggers allow actions (one-click calls and WhatsApp chats) directly from the spreadsheet list.
* **Multi-Select Selection**: Easy bulk selection utilizing master and row-level checkboxes.

### 📅 Follow-Ups Board
* **List Inbox**: Checkable task queue grouped by status (Today, Overdue, Upcoming) with custom priority tags. Completing a task triggers a line-through completion animation.
* **Timeline Feed**: A chronological vertical day-by-day stream of all pipeline events.
* **Interactive Month Calendar**: A custom grid calendar displaying dot reminders for follow-ups. Click on any day to inspect and manage its agenda instantly.

### 🗂️ Sales Pipeline (Kanban Board)
* **Column Sums**: Automatically sums the total deal value in each stage header (e.g., `Negotiation — 3 leads · $15.2k`).
* **Source Tagging**: High-density cards featuring client traffic channel icons (WhatsApp, Instagram, Facebook, Web, Phone), priority dots, and next follow-up dates.

---

## 🛠️ Tech Stack

* **Frontend Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (SSR & React 19)
* **Routing**: [TanStack Router](https://tanstack.com/router)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Charts**: [Recharts](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed (v18+ recommended).

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔒 License
Proprietary. Developed by Siddharth Dobhal.
