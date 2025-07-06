# Lunar

A modern, AI-powered document processing platform built with Node.js, Express, Prisma, and Bun. It extracts company information from uploaded PDFs, enriches it with GitHub data, and provides a robust API for document upload and status tracking.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Architecture Overview](#architecture-overview)
- [Directory Structure](#directory-structure)
- [Main Components](#main-components)
  - [API & Routing](#api--routing)
  - [Controllers](#controllers)
  - [Services](#services)
  - [Database Schema](#database-schema)
  - [Types](#types)
  - [Error Handling](#error-handling)
  - [AI Integration](#ai-integration)
  - [Background Processing](#background-processing)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Error Codes](#error-codes)
- [Development & Contribution](#development--contribution)

---

## Features
- **PDF Upload & Processing**: Upload PDF documents and extract company names using Google Gemini AI.
- **GitHub Enrichment**: Fetches organization members from GitHub for detected companies.
- **Background Task Processing**: Uses Trigger.dev for scalable, rate-limited background jobs.
- **RESTful API**: Endpoints for document upload and status retrieval.
- **Robust Error Handling**: Centralized error codes and structured responses.
- **Type Safety**: End-to-end TypeScript with Prisma for database access.

---

## Setup

### 1. Install Dependencies

```bash
bun install
```

---

### 2. Setup the Database

```bash
bun db:migrate       # Runs Prisma migrations
bun db:generate      # Generates Prisma client
```

---

### 3. Setup Trigger.dev

```bash
bun init:trigger
```

> 💡 If you're using the development version of Trigger.dev, your `TRIGGER_SECRET_KEY` must start with `tr_dev`. For production, it must start with `tr_prod`.

#### Run Trigger.dev Server

* **Locally**

  ```bash
  bun dev:trigger
  ```

* **Production Deployment**

  ```bash
  bun deploy:trigger
  ```

---

### 4. Run the Project Server

```bash
bun run dev:server
```

---

## Architecture Overview

- **Entry Point**: `index.ts` initializes the server, handles process signals, and starts the Express app.
- **Server Setup**: `server.ts` configures Express, loads middleware, sets up API routes, and global error handling.
- **API**: Versioned under `/api/v1`, with document-related endpoints under `/api/v1/documents`.
- **Services**: Business logic for document processing, company extraction, GitHub integration, and AI calls.
- **Database**: PostgreSQL (via Prisma ORM) with models for generations, companies, and members.
- **Background Tasks**: Trigger.dev task for PDF parsing and enrichment.
- **AI Integration**: Google Gemini (via `@google/genai`) for extracting company names from text.

---

## Directory Structure

```
.
├── api/                # API route handlers
├── controllers/        # Request controllers
├── lib/                # Core libraries (AI, database, express, utils, media)
├── prisma/             # Prisma schema and migrations
├── routes/             # API route definitions
├── services/           # Business logic and integrations
├── trigger/            # Background task definitions
├── types/              # Shared TypeScript types
├── index.ts            # Main entry point
├── server.ts           # Server setup
├── package.json        # Project metadata and dependencies
└── README.md           # This documentation
```

---

## Main Components

### API & Routing
- **`routes/v1.ts`**: Mounts versioned API routes (currently `/documents`).
- **`api/document.ts`**: Defines `/upload` (POST) and `/status/:job_id` (GET) endpoints for document operations.

### Controllers
- **`controllers/document.ts`**: Handles document upload (triggers processing) and status retrieval.

### Services
- **`services/document.ts`**: Orchestrates document upload, triggers background processing, and fetches status.
- **`services/generation.ts`**: CRUD for document generation records.
- **`services/generation-company.ts`**: CRUD for companies detected in documents.
- **`services/generation-company-member.ts`**: Bulk insert of company members.
- **`services/github.ts`**: Fetches organization members from GitHub.
- **`services/gemma.ts`**: Integrates with Google Gemini for company extraction.

### Database Schema
Defined in `prisma/schema.prisma`:
- **Generation**: Represents an uploaded document and its processing status.
- **JobResponse**: Stores AI/processing results.
- **GenerationCompany**: Companies detected in the document.
- **GenerationCompanyMember**: Members of each detected company (from GitHub).

#### Schema Tables

##### `Generation`
| Field      | Type    | Description                                 |
|------------|---------|---------------------------------------------|
| id         | String  | Primary key (UUID)                          |
| fileName   | String  | Name of the uploaded file                   |
| fileLink   | String  | Link to the uploaded file                   |
| jobStatus  | Enum    | Processing status (see JobStatus enum)      |
| error      | String? | Error message if processing failed (nullable)|
| companies  | GenerationCompany[] | Related companies              |

##### `GenerationCompany`
| Field         | Type                  | Description                                 |
|---------------|----------------------|---------------------------------------------|
| id            | String               | Primary key (UUID)                          |
| name          | String               | Company name                                |
| generationId  | String               | Linked Generation (foreign key)             |
| generation    | Generation           | Linked Generation entity                    |
| members       | GenerationCompanyMember[] | Related company members               |

##### `GenerationCompanyMember`
| Field            | Type        | Description                                 |
|------------------|------------|---------------------------------------------|
| id               | String     | Primary key (UUID)                          |
| platform_id      | String     | Platform-specific user ID                   |
| avatar_url       | String     | User avatar URL                             |
| profile_url      | String     | User profile URL                            |
| organizations_url| String     | Organizations URL                           |
| repositories_url | String     | Repositories URL                            |
| username         | String     | Username                                    |
| companyId        | String     | Linked company (foreign key)                |
| company          | GenerationCompany | Linked company entity                  |

##### `JobStatus` (Enum)
| Value        | Description                |
|--------------|---------------------------|
| NOT_ADDED    | Not added to processing   |
| PENDING      | Awaiting processing       |
| IN_PROGRESS  | Processing in progress    |
| FAILED       | Processing failed         |
| SUCCESS      | Processing succeeded      |

### Types
- Located in `types/`, these provide strong typing for all major entities and service inputs/outputs.

### Error Handling
- Centralized in `lib/utils/errors/`, with a global error map and custom error classes (`LunarError`).
- All errors are returned in a structured format with codes and descriptions.

### AI Integration
- `lib/genai/` and `services/gemma.ts` handle communication with Google Gemini for extracting company names from text.

### Background Processing
- `trigger/process-generation.ts` defines a Trigger.dev task that:
  - Downloads and parses PDFs
  - Extracts company names using AI
  - Fetches GitHub members for each company
  - Updates the database with results

---

## API Reference

### POST `/api/v1/documents/upload`
Upload a PDF document for processing.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `media` (file)

**Response:**
```json
{
  "status": true,
  "content": {
    "data": { "job_id": "..." }
  }
}
```

### GET `/api/v1/documents/status/:job_id`
Get the processing status and results for a document.

**Response:**
```json
{
  "status": true,
  "content": {
    "data": {
      "id": "...",
      "fileName": "...",
      "jobStatus": "SUCCESS",
      "companies": [
        {
          "name": "...",
          "members": [
            { "username": "...", "avatar_url": "...", ... }
          ]
        }
      ]
    }
  }
}
```

---

## Environment Variables

Set these in your environment or `.env` file:

| Variable                | Description                        |
|-------------------------|------------------------------------|
| `ENV`                   | App environment (`development`, etc) |
| `PORT`                  | Port to run the server on           |
| `DATABASE_URL`          | PostgreSQL connection string        |
| `STORAGE_KEY`           | S3 access key                       |
| `STORAGE_SECRET`        | S3 secret key                       |
| `STORAGE_REGION`        | S3 region                           |
| `STORAGE_BUCKET`        | S3 bucket name                      |
| `STORAGE_HOST`          | S3 endpoint/host                    |
| `TRIGGER_SECRET_KEY`    | Trigger.dev secret key              |
| `GOOGLE_GENAI_KEY`      | Google Gemini API key               |

---

## Error Codes

Common error codes (see `lib/utils/errors/lang/codes.ts` for full list):

| Code                              | Status | Description                       |
|------------------------------------|--------|-----------------------------------|
| `common.request.BAD_REQUEST`       | 400    | The request is malformed          |
| `common.request.UNAUTHORIZED`      | 401    | Not authorized                    |
| `common.request.FORBIDDEN`         | 403    | Forbidden                         |
| `common.request.NOT_FOUND`         | 404    | Resource not found                |
| `common.request.INTERNAL_SERVER_ERROR` | 500 | Internal server error             |
| `media.upload.FILE_NOT_ALLOWED`    | 1001   | File type not allowed             |
| `media.upload.FILE_TOO_LARGE`      | 1002   | File too large                    |
| `media.upload.FILE_NOT_FOUND`      | 1003   | File not found                    |
| `generation.generation.ID_NOT_PROVIDED` | 2001 | Generation ID not provided    |

## Flow For Generation
---
### 1. Upload File to S3

The user uploads a PDF file to the `/api/documents/upload` endpoint using a `multipart/form-data` request. The file is sent as a media field in the form data.

The file upload is handled by a middleware, which performs the following:

* Validates the MIME type and file size.
* Uploads the file to S3.
* Attaches the uploaded file's metadata (such as `location` and `originalname`) to the request for downstream use.

---

### 2. Upload Controller: Store Entry and Schedule Task

After the file is successfully uploaded and passed through the middleware, the main controller logic executes. This controller:

* Extracts file metadata from the request.
* Creates a new generation record in the database with job status set to `PENDING`.
* Schedules the `process-generation` background task using Trigger.dev and the generation ID.
* Updates the generation record with the Trigger.dev `job_id` and sets the job status to `IN_PROGRESS`.

The API responds with a `job_id`, which can be used by the client to track the processing status.

---

### 3. Background Task Execution

The background job `process-generation` is scheduled through Trigger.dev. This task is responsible for downloading, parsing, and analyzing the uploaded PDF.

It is configured with a maximum duration and a concurrency limit to ensure predictable execution.

---

### 4. Processing Logic Inside the Task

* The database is initialized.
* The generation record is fetched using the provided generation ID.
* The PDF is downloaded from the S3 URL to a temporary file.
* The PDF is parsed into raw text using a PDF parsing library.
* The text is processed using a language model (Gemma) with a custom prompt to extract company names.
* If companies are detected:

  * A record is created for each company.
  * GitHub is queried for all public users associated with each company.
  * Each user is stored in the database with profile details.
* If parsing fails or no companies are found, the generation is marked as `FAILED` with an appropriate error message.
* If the process completes successfully, the generation is marked as `SUCCESS`.
* Temporary files are cleaned up after task completion.

---