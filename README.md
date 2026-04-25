# Wink Real-Time Chat Application

A modern, real-time messaging application built with Node.js, Express, and Socket.io, featuring secure authentication, instant messaging, and a responsive user interface.

## Features

- **Real-Time Messaging**: Instant message delivery using Socket.io.
- **User Authentication**: Secure sign-up and login with JWT and bcrypt.
- **OTP Verification**: Email-based OTP verification for secure account access.
- **File Sharing**: Upload and share images and files with other users.
- **User Management**: Profile management and user search.
- **Wink AI Assistant**: An intelligent chatbot powered by Google Gemini (gemini-2.0-flash), offering conversational support and coding assistance directly within the app.
- **Responsive UI**: Clean and modern interface built with React.

## Tech Stack

### Backend
- **Node.js** & **Express.js**: Server-side JavaScript runtime and web framework.
- **Socket.io**: Real-time bidirectional communication.
- **MongoDB**: NoSQL database for storing messages and user data.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: Secure authentication and authorization.
- **bcrypt**: Password hashing.
- **Multer**: Middleware for handling file uploads.
- **Nodemailer**: Sending OTP emails.
- **Google Gen AI SDK (`@google/genai`)**: Integration with Gemini AI for the Wink AI Assistant.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Socket.io-client**: Client-side Socket.io library.
- **Axios**: Promise-based HTTP client.
- **React Router**: Client-side routing.
- **Tailwind CSS**: Utility-first CSS framework.

## Project Structure

```
Backend/
├── src/
│   ├── Config/          # Database configuration
│   ├── Controller/      # Request handlers
│   ├── Middleware/      # Custom middleware (auth, upload)
│   ├── Models/          # Mongoose schemas
│   ├── Routes/          # API route definitions
│   ├── Utils/           # Utility functions (JWT, OTP, etc.)
│   └── index.js         # Application entry point
├── uploads/             # Directory for uploaded files
└── .env                 # Environment variables

Frontend/
├── src/
│   ├── Components/      # Reusable UI components
│   ├── Pages/           # Page components (Login, Chat, etc.)
│   ├── Services/        # API service functions
│   ├── Context/         # React Context for state management
│   └── App.jsx          # Main application component
└── .env                 # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-App
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   - Create a `.env` file in the `Backend/` directory with the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email
     EMAIL_PASS=your_email_password
     GEMINI_API_KEY=your_google_gemini_api_key
     ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   ```
   - Create a `.env` file in the `Frontend/` directory with the following variables:
     ```env
     VITE_API_URL=http://localhost:5000
     ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd Backend
   npm start
   ```
   The server will start on `http://localhost:5000`.

2. **Start the frontend client**
   ```bash
   cd Frontend
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## Usage

1. **Sign Up**: Register a new account with your email.
2. **Verify OTP**: Enter the OTP sent to your email to verify your account.
3. **Login**: Log in with your credentials.
4. **Chat**: Search for users and start real-time conversations.
5. **Share Files**: Upload images and documents to share with contacts.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/send-otp` - Send OTP to email

### Users
- `GET /api/users/search?name=query` - Search users by name
- `GET /api/users/me` - Get current user profile

### Messages
- `GET /api/messages/:userId` - Get messages between users
- `POST /api/messages/:userId` - Send a message

### Wink AI
- `POST /api/v1/Aichat` - Send a message to the Wink AI Assistant

### Uploads
- `POST /api/upload/image` - Upload an image
- `POST /api/upload/file` - Upload a file

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
