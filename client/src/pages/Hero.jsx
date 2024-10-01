import React from 'react';
import { BarChart, Users, CheckSquare, BookOpen } from "lucide-react";

export default function HackathonLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-gray-900 shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="src/assets/logo.png" alt="HackHub Logo" className="h-10" />
            <h1 className="ml-3 text-2xl font-bold text-yellow-500">HackTask Me</h1> {/* Changed text color */}
          </div>

          <a href="/log-in" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300">Log In</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-yellow-100 py-20" id="home">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
          Revolutionize Your <span className="text-yellow-600">Hackathon Experience</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-600 max-w-3xl mx-auto">
          Empower your team, streamline your workflow, and unleash innovation with our hackathon team management platform.
        </p>
        <a href="/register" className="bg-yellow-500 text-gray-900 text-lg font-semibold px-8 py-4 rounded-full hover:bg-yellow-600 transition duration-300 inline-block">
          Start Your Hackathon Journey
        </a>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-yellow-600" />, // Changed icon color
      title: "Team Management",
      description: "Easily create and manage hackathon teams with intuitive tools. Collaborate seamlessly with your teammates."
    },
    {
      icon: <CheckSquare className="h-10 w-10 text-yellow-600" />, // Changed icon color
      title: "Task Assignment",
      description: "Assign and track tasks to keep your hackathon project on schedule. Never miss a deadline again."
    },
    {
      icon: <BarChart className="h-10 w-10 text-yellow-600" />, // Changed icon color
      title: "AI Integration",
      description: "Leverage AI to optimize your workflow and boost productivity. Get smart suggestions and insights."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-yellow-600" />, // Changed icon color
      title: "Hackathon Blogs",
      description: "Stay updated with the latest hackathon trends and tips. Learn from experts and past winners."
    },
  ];

  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
        <p className='text-center text-gray-400'>&copy; 2024 HackTak Me. All rights reserved.</p>
      </div>
    </footer>
  );
}
