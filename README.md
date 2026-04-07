# Email Server - REST API

A scalable REST API email service built with Express.js and Nodemailer. Deploy to Vercel and send emails from your applications.

## Features

✅ RESTful API design
✅ Multiple email type support (extensible)
✅ HTML email templates
✅ Error handling and validation
✅ Vercel ready deployment
✅ CORS enabled for frontend integration

## API Routes

### Health Check
```
GET /api/health
```
Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Email server is running",
  "timestamp": "2026-04-05T10:30:00.000Z"
}
```

### Send Application Form Submission Email
```
POST /api/email/application-form/submit
```
Send a confirmation email for student application form submissions.

**Request:**
```json
{
  "formData": {
    "firstName": "John",
    "lastName": "Doe",
    "studentId": "12345",
    "email": "john@example.com",
    "phoneNumber": "+880123456789",
    "session": "2023-2024",
    "faculty": "Science",
    "department": "Computer Science",
    "degreeLevel": "Bachelor",
    "yearSemesterType": "year",
    "yearSemesterValue": "3",
    "aliasEmail": "john.doe"
  },
  "recipientEmail": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application form submission email sent successfully",
  "data": {
    "recipientEmail": "john@example.com",
    "studentId": "12345",
    "sentAt": "2026-04-05T10:30:00.000Z"
  }
}
```

### Send Generic Email (Extensible)
```
POST /api/email/send
```
Send emails of different types using a generic endpoint.

**Request:**
```json
{
  "type": "application-form-submission",
  "formData": { ...data },
  "recipientEmail": "recipient@example.com"
}
```

**Supported types:**
- `application-form-submission` - Student application form confirmation

More types can be easily added!

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   cd email-server
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Run the server:**
   ```bash
   npm run dev
   ```

Server will start on `http://localhost:3001`

### Test Endpoints

```bash
# Health check
curl http://localhost:3001/api/health

# Send application form email
curl -X POST http://localhost:3001/api/email/application-form/submit \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {
      "firstName": "Test",
      "lastName": "User",
      "studentId": "123",
      "email": "test@example.com",
      "phoneNumber": "+880123456789",
      "session": "2023-2024",
      "faculty": "Science",
      "department": "CS",
      "degreeLevel": "Bachelor",
      "yearSemesterType": "year",
      "yearSemesterValue": "3",
      "aliasEmail": "test.user"
    },
    "recipientEmail": "your-email@gmail.com"
  }'
```

## Deployment to Vercel

### Prerequisites
- Vercel account (free at vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Push to Git:**
   ```bash
   git add email-server/
   git commit -m "Add email server"
   git push
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your Git repository
   - Root Directory: `email-server`
   - Click "Deploy"

3. **Add Environment Variables:**
   - Go to Settings → Environment Variables
   - Add:
     - `EMAIL_USER` = `ict@cu.ac.bd`
     - `EMAIL_PASSWORD` = `ucui xflj auma rlww`

4. **Get Vercel URL:**
   - After deployment: `https://email-server-xyz.vercel.app`

5. **Update Frontend `.env`:**
   ```env
   REACT_APP_EMAIL_API_URL=https://email-server-xyz.vercel.app
   ```

## Extending with New Email Types

To add a new email type (e.g., "registration-confirmation"):

### 1. Create Email Template

Edit `api/email.js` and add:

```javascript
const registrationConfirmationTemplate = (userData) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Registration Confirmation</h2>
      <p>Welcome ${userData.name}!</p>
      <!-- Add more template HTML -->
    </div>
  `;
};
```

### 2. Create Handler Function

```javascript
const sendRegistrationConfirmation = async (userData, recipientEmail) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER || 'ict@cu.ac.bd',
    to: recipientEmail,
    subject: 'Registration Confirmation',
    html: registrationConfirmationTemplate(userData)
  });
};
```

### 3. Add to Switch Statement

In the `/api/email/send` endpoint:

```javascript
case 'registration-confirmation':
  result = await sendRegistrationConfirmation(formData, recipientEmail);
  break;
```

### 4. Use from Frontend

```javascript
import { sendEmail } from '../services/emailService';

// Send registration confirmation
await sendEmail('registration-confirmation', userData, userEmail);
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | Gmail address for sending emails | Yes |
| `EMAIL_PASSWORD` | Gmail App Password | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (production/development) | No |

### Gmail Setup

1. Enable 2-Factor Authentication: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Copy the 16-character password to `EMAIL_PASSWORD`

## Architecture

```
Frontend (React)
    ↓
Email API (Vercel)
    ↓
Nodemailer
    ↓
Gmail SMTP
    ↓
User Email
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request (missing fields, invalid data)
- `404` - Endpoint not found
- `500` - Server error

All responses include a `success` boolean and `message` field.

## Troubleshooting

### Emails not sending

1. **Check environment variables:**
   ```bash
   # Vercel Dashboard → Settings → Environment Variables
   # Verify EMAIL_USER and EMAIL_PASSWORD are correct
   ```

2. **Check Gmail settings:**
   - 2FA must be enabled
   - App Password must be used (not regular password)
   - Access from "Less Secure Apps" should be allowed

3. **Test locally first:**
   ```bash
   npm run dev
   # Send a test email
   ```

4. **Check Vercel logs:**
   - Vercel Dashboard → Project → Deployments → Logs

### CORS errors

- CORS is enabled for all origins
- Check that `REACT_APP_EMAIL_API_URL` in frontend `.env` is correct

### 404 errors

- Check endpoint path matches exactly
- Available endpoints: `/api/health`, `/api/email/application-form/submit`, `/api/email/send`

## Performance & Limits

- **Vercel Free Tier**: 100,000 function invocations/month
- **Gmail Free Account**: 500 emails/day (usually sufficient)
- **Response Time**: ~1-2 seconds per email

## Security Best Practices

✅ Environment variables for credentials
✅ CORS enabled
✅ Input validation
✅ Error logging
✅ No sensitive data in responses (production)

## File Structure

```
email-server/
├── api/
│   └── email.js              # Main API file
├── package.json              # Dependencies
├── vercel.json              # Vercel config
├── .env.example             # Example env
├── .gitignore              # Git ignore
└── README.md               # This file
```

## Support

For issues:
1. Check the Troubleshooting section above
2. Review Vercel logs
3. Test with `curl` to isolate the problem
4. Verify Gmail account settings
"# email-server" 
"# email-server" 
