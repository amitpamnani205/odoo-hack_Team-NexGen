# GearGuard Backend

Backend API for GearGuard: The Ultimate Maintenance Tracker

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Create a `.env` file in the `backend` directory
   - Add the following environment variables:
     ```
     PORT=5000
     NODE_ENV=development
     MONGO_URI=mongodb://localhost:27017/gearguard
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     JWT_EXPIRES_IN=7d
     FRONTEND_URL=http://localhost:5173
     ```

3. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Update `MONGO_URI` in `.env` if your MongoDB is on a different host/port

4. **Run the Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string", "role": "string" (optional) }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`
  
- `POST /api/auth/logout` - Logout user

### Health Check

- `GET /api/health` - Check if API is running

## Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "string",
  "data": {} // optional
}
```

## Authentication

The API uses JWT tokens stored in HTTP-only cookies for authentication. After successful login/signup, the token is automatically set in cookies.

