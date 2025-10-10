import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './src/pages/home';
import { ContactPage } from './src/pages/contact';
import { ChatPage } from './src/pages/chat';

export default function App() {
  return (
    <Router>
      <StatusBar style="light" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}
