"use client";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Components/auth/NavBar';
import Header from './Components/Header';
import BlogList from "./Components/BlogList";
import Footer from "./Components/Footer";
import Agenda from "./Components/Agenda";
import './globals.css';

export default function Home() {
  return (
    <>
      <ToastContainer theme="light" style={{ backgroundColor: 'var(--primary-color)' }}/>
      <NavBar/>
      <Header/>
      <BlogList/>
      <Agenda/>

      <Footer/>
      
    </>
  );
}