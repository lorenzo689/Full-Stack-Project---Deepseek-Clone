# DeepSeek Clone - Full Stack Chat Application

A modern full-stack chat application built with Spring Boot (backend) and Next.js (frontend) that mimics DeepSeek's functionality with real-time messaging capabilities.

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 4.0.2 with Java 21
- **Database**: PostgreSQL 16
- **ORM**: Spring Data JPA with Hibernate
- **Migration**: Flyway for database versioning
- **API**: RESTful API with CORS support

### Frontend (Next.js)
- **Framework**: Next.js 16.1.0 with React 19
- **Styling**: Tailwind CSS 4
- **Authentication**: Clerk
- **TypeScript**: Full TypeScript support
- **Development**: Hot reload with Turbopack

## 📋 Prerequisites

### Required Software
- **Java 21+** (JDK)
- **Node.js 20+** and npm
- **PostgreSQL 16+** 
- **Git**

### Database Setup
1. Install PostgreSQL on your system
2. Create a database and user:
   ```sql
   CREATE DATABASE app;
   CREATE USER app WITH PASSWORD 'app';
   GRANT ALL PRIVILEGES ON DATABASE app TO app;
   ```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Project
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd Backend
```

#### Configuration
The backend is pre-configured with these settings in `src/main/resources/application.yml`:
- **Server Port**: 8081
- **Database**: PostgreSQL on localhost:5432
- **Database Name**: app
- **Username**: app
- **Password**: app

#### Build and Run
```bash
# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or if you have Maven installed
mvn spring-boot:run
```

The backend will start on `http://localhost:8081`

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd ../Frontend
```

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env` file in the frontend root:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

#### Start Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🔧 API Endpoints

### Backend Direct Endpoints

#### Get All Messages
```bash
GET http://localhost:8081/api/chat/messages
```

#### Send Message
```bash
POST http://localhost:8081/api/chat/send
Content-Type: application/json

{
  "content": "Your message here"
}
```

### Frontend Proxy Endpoints

#### Get All Messages (via Frontend)
```bash
GET http://localhost:3000/api/chat/messages
```

#### Send Message (via Frontend)
```bash
POST http://localhost:3000/api/chat/send
Content-Type: application/json

{
  "content": "Your message here"
}
```

## 🎯 Features

### ✅ Working Features
- **Real-time Chat**: Send and receive messages instantly
- **Message History**: View all previous chat messages
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: Full TypeScript implementation
- **Database Persistence**: Messages stored in PostgreSQL
- **CORS Support**: Proper cross-origin configuration
- **Hot Reload**: Development with instant updates

### 🔄 Communication Flow
1. Frontend sends message to `/api/chat/send` (Next.js API route)
2. Next.js route forwards request to Spring Boot backend
3. Backend processes message, generates AI response
4. Both messages are saved to PostgreSQL database
5. Response sent back through the same chain
6. Frontend updates UI with new messages

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
- **Check Java Version**: Ensure Java 21+ is installed
- **Database Connection**: Verify PostgreSQL is running and credentials are correct
- **Port Conflict**: Make sure port 8081 is available

#### Frontend API Errors
- **Backend Running**: Ensure backend is running on port 8081
- **CORS Issues**: Check WebConfig.java for proper CORS configuration
- **Network Issues**: Verify both services are accessible

#### Database Issues
- **PostgreSQL Service**: Ensure PostgreSQL service is running
- **Database Exists**: Verify the `app` database and `app` user exist
- **Permissions**: Check database user permissions

### Health Checks

#### Backend Health
```bash
curl http://localhost:8081/api/chat/messages
```

#### Frontend Health
```bash
curl http://localhost:3000/api/chat/messages
```

#### Database Connection
Check backend startup logs for database connection status.

## 📝 Development Notes

### Key Fixes Applied
1. **API Route Naming**: Fixed `routes.ts` → `route.ts` for Next.js compliance
2. **TypeScript Types**: Added proper type definitions for API responses
3. **CORS Configuration**: Proper cross-origin setup in WebConfig.java
4. **Message Loading**: Added useEffect to load chat history on component mount

### Database Schema
```sql
-- Chat Messages Table
CREATE TABLE chat_messages (
  id bigserial primary key,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- Todos Table (for future features)
CREATE TABLE todos (
  id bigserial primary key,
  title text not null,
  done boolean not null default false
);
```

## 🎨 UI Components

### Main Components
- **PromptBox**: Message input and sending interface
- **Message**: Individual message display component
- **Sidebar**: Navigation and chat history
- **AppContext**: Global state management with Clerk integration

## 🔐 Authentication

The application is set up with Clerk for authentication:
- Configure your Clerk keys in the `.env` file
- Authentication state is managed through AppContext
- User sessions are handled automatically

## 📦 Build & Deployment

### Backend Production Build
```bash
./mvnw clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Frontend Production Build
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes only.

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify all prerequisites are met
3. Check logs for detailed error messages
4. Ensure both backend and frontend are running properly

---

**Note**: This application is designed as an educational full-stack project to demonstrate modern web development practices and Spring Boot + Next.js integration.