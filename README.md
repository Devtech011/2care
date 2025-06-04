# MedReport Analyzer

A secure, HIPAA-compliant web application that uses AI to analyze medical reports and provide clear, patient-friendly summaries.

## Features

- 🔐 Secure authentication system
- 📄 PDF medical report upload and analysis
- 🤖 AI-powered report summarization
- 🛡️ HIPAA compliance
- 🔒 Secure data handling
- 📱 Responsive design
- 🎯 User-friendly interface

## Tech Stack

- **Frontend**: Next.js 15, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: Formik with Yup validation
- **API Integration**: Axios
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js (v18 or higher)
- npm
- A modern web browser

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Devtech011/2care.git
cd 2care
```

2. Install dependencies:
```bash
npm install
# or
npm install --legacy-peer-deps
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3010/api
```

4. Run the development server:
```bash
npm run dev


5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         # React components
├── services/          # API services
├── validation/        # Form validation schemas
└── types/            # TypeScript type definitions
```

## Key Features Implementation

### Authentication
- Secure login and signup functionality
- JWT token-based authentication

### File Upload
- Drag and drop interface
- PDF file validation
- HIPAA compliance checks

### Report Analysis
- AI-powered medical report analysis
- Clear, patient-friendly summaries
- Secure data handling and storage

## Security Features

- HIPAA compliance measures
- Secure file upload and storage
- Protected API endpoints
- Secure authentication
- Data encryption

