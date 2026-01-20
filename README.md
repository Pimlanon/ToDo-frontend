# To-Do Kanban Board (Frontend)

This is the frontend of a **To-Do Application in Kanban board style** built with **React (Vite)** and deployed on **Vercel**.

It connects to a Flask + Turso backend.

---

## Features

* Kanban board with task status:

  * To-Do
  * In Progress
  * Done
* Change page title dynamically
* CRUD Tasks (Create, Read, Update, Delete)
* CRUD Connections (task relationships)
* Show overdue tasks
* Overview of:

  * Tasks due today
  * Overdue tasks

---

## Tech Stack

* React (Vite)
* Tailwind CSS
* ShadCN UI
* Zustand (state management)
* TanStack React Query
* Axios
* Date-fns

### Libraries

```
@radix-ui/react-accordion": "^1.2.12",
@radix-ui/react-alert-dialog": "^1.1.15",
@radix-ui/react-dialog": "^1.1.15",
@radix-ui/react-dropdown-menu": "^2.1.16",
@radix-ui/react-label": "^2.1.8",
@radix-ui/react-popover": "^1.1.15",
@radix-ui/react-select": "^2.2.6",
@radix-ui/react-separator": "^1.1.8",
@radix-ui/react-slot": "^1.2.4",
@radix-ui/react-tooltip": "^1.2.8",
@tailwindcss/vite": "^4.1.18"
@tanstack/react-query": "^5.90.18"
@tanstack/react-virtual": "^3.13.18"
axios": "^1.13.2"
class-variance-authority": "^0.7.1"
clsx": "^2.1.1"
date-fns": "^4.1.0"
lucide-react": "^0.562.0"
next-themes": "^0.4.6"
react": "^19.2.0"
react-day-picker": "^9.13.0"
react-dom": "^19.2.0"
sonner": "^2.0.7"
tailwind-merge": "^3.4.0"
tailwindcss": "^4.1.18"
zustand": "^5.0.10"
```

---

## Installation & Run (Local)

### 1. Clone the project

```bash
git clone <your-frontend-repo-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Create `.env` file

```env
VITE_BASE_URL_BACKEND=http://localhost:5000
```

(Replace with deployed backend URL in production)

### 4. Run development server

```bash
npm run dev
```

or

```bash
yarn dev
```

The app will run at:

```
http://localhost:5173
```

---

##  Notes

* The backend is deployed on Render (free tier) and may sleep when idle.
* The frontend is deployed on Vercel.
* The first request to the backend may be slow due to cold start.
* The app uses environment variable `VITE_BASE_URL_BACKEND` to connect to the API.
