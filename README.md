# HackTask Me🎉

Welcome to the **Hackathon Team Management Platform**! This application is designed to help team leaders manage their diverse teams effectively during hackathons. With features for task management, an AI chatbot for assistance, and a blog for insights, this platform aims to enhance collaboration and productivity.

## Features 🚀
- **Team Registration:** Easily register your hackathon teams.
- **Task Management:** Assign tasks to team members based on their skills.
- **AI Chatbot:** Get real-time assistance and reminders.
- **Blog Section:** Access valuable insights and resources.

## Installation 🔧
To get started with the project, follow these steps:

### 1. Clone the Repository:
```bash
git clone https://github.com/SahilRakhaiya05/HackTaskMe.git
```

### 2. Install Dependencies:
Navigate to the client directory:
```bash
cd client
npm install
```
Navigate to the server directory:
```bash
cd ../server
npm install

```

## Environment Variables 🌍 
Create a .env file in both the client and server directories with the following content:

For the Server:
```bash
NODE_ENV=development
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=8800
```

For the Client:
```bash
VITE_APP_BASE_URL=http://localhost:8800
VITE_APP_API_KEY=<your_api_key>
```

## Usage 🖥️
Create a .env file in both the client and server directories with the following content:

Start the Server:
```bash
cd server
npm start
```

Start the Client:
```bash
cd client
npm run dev
```

## Open the Application 
Open your web browser and navigate to 
```bash
http://localhost:3000
```

## Problem Statement ❓
In hackathon settings, team leaders face challenges in coordinating members from different backgrounds, ensuring tasks are clearly assigned and managed, and maintaining effective communication. Without a structured platform, projects can become disorganized, leading to reduced productivity and missed deadlines.

## Real-World Impact 🌍
The Hackathon Management Platform directly addresses these challenges by providing a robust framework for team leaders to manage their teams effectively. Team leaders can register their teams, assign specific tasks based on members' skills, and monitor progress in real-time. The integrated AI chatbot enhances user experience by providing instant assistance, while the blog section keeps teams informed about best practices and trends in the hackathon community. Ultimately, this platform promotes better collaboration, boosts team morale, and drives successful project outcomes in hackathons.

## Screen Shots

![screenshot](https://github.com/user-attachments/assets/1e1c08c5-36b6-4756-816d-37896f4785bc)
![Screenshot 2024-10-01 124501](https://github.com/user-attachments/assets/ef8c0bd1-7b44-4789-8373-f9a179faf6fb)
![Screenshot 2024-10-01 124350](https://github.com/user-attachments/assets/4764cdce-3bbc-4ed7-a1d4-3ac743c80d91)


