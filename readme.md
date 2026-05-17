# TradeBoard – GlobalTNA Technical Assessment

A full-stack mini service request board where homeowners can post trade jobs and tradespeople can browse, update status, and close them.

## Tech Stack

| Layer    | Technology           |
| -------- | -------------------- |
| Frontend | Next.js (App Router) |
| Styling  | Tailwind CSS v4      |
| Backend  | Node.js + Express    |
| Database | MongoDB Atlas        |
| ODM      | Mongoose             |

## Project Structure

```
globaltna-assessment/
├── backend/
│   ├── config/
│   │   └── MONGODB.js
│   ├── controllers/
│   │   └── jobController.js
│   ├── models/
│   │   └── jobRequestModel.js
│   ├── routes/
│   │   └── jobRoutes.js
│   └── server.js
└── frontend/
    ├── app/
    │   ├── jobs/
    │   │   └── [id]/
    │   │       └── page.js
    │   ├── new-job/
    │   │   └── page.js
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.js
    └── lib/
        └── api.js
```

## Environment Variables

### Backend — create `backend/.env`

```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=4000
```

### Frontend — create `frontend/.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Setup & Running

### Prerequisites

- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or local MongoDB

### 1. Clone the repo

```bash
git clone https://github.com/Kafoor-Nimas/globaltna-assessment.git
cd globaltna-assessment
```

### 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

Server starts on http://localhost:4000

Test it: http://localhost:4000/api/jobs

### 3. Run the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend starts on http://localhost:3000

## API Endpoints

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| GET    | /api/jobs                   | Get all jobs       |
| GET    | /api/jobs?category=Plumbing | Filter by category |
| GET    | /api/jobs?status=Open       | Filter by status   |
| GET    | /api/jobs/:id               | Get single job     |
| POST   | /api/jobs                   | Create a new job   |
| PATCH  | /api/jobs/:id               | Update job status  |
| DELETE | /api/jobs/:id               | Delete a job       |

### POST /api/jobs — request body

```json
{
  "title": "string (required)",
  "description": "string (required)",
  "category": "Plumbing | Electrical | Painting | Joinery | Other",
  "location": "string",
  "contactName": "string",
  "contactEmail": "valid email"
}
```

### PATCH /api/jobs/:id — request body

```json
{
  "status": "Open | In Progress | Closed"
}
```

## Pages

| Page       | Route     | Description                                             |
| ---------- | --------- | ------------------------------------------------------- |
| Home       | /         | Lists all job requests with category and status filters |
| New Job    | /new-job  | Form to create a new service request                    |
| Job Detail | /jobs/:id | Full job details, update status, delete job             |
