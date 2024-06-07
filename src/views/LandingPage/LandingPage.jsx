// import Navbar from "./Navbars";
// import HeroSection from "./HeroSection";
// import FeatureSection from "./FeatureSection";
// import Workflow from "./Workflow";
// import Footer from "./Footer";
// import Testimonials from "./Testimonials";

// const LandingPage = () => {
//   return (
//     <>
// <div className="">
//       <Navbar/>
//       <div className="max-w-7xl mx-auto pt-20 px-6">
//         <HeroSection />
//         <FeatureSection />
//         <Workflow />
//         <Testimonials />

//       </div>
//       <Footer />
//       </div>
//     </>
//   );
// };

// export default LandingPage;
// // App.jsx
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { MdPerson, MdHome, MdClass, MdSubject } from "react-icons/md";
import { gsap } from "gsap";
import logo from "../../assets/img/landingpage/Classroom-rafiki.svg";
import mainImage from "../../assets/img/landingpage/Confirmed attendance-amico.svg";
import workflow from "../../assets/img/landingpage/03.jpg";
import Workflow from "./Workflow";
import Testimonials from "./Testimonials";
import HeroSection from "./HeroSection";

function App() {
  useEffect(() => {
    // Animate sections when component mounts
    gsap.from(".animate-left", {
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.5,
    });
  }, []);
  return (
    <div className="font-sans">
      {/* Header Section */}
      <header className="bg-gray-50 p-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
            <div className="text-xl font-bold text-blue-900">Scan2mark</div>
          </div>
          <ul className="flex space-x-6">
            <li className="bg-white  rounded transition-colors text-gray-500 font-bold duration-300 hover:bg-white hover:text-blue-500">
              <Link to="/">Home</Link>
            </li>

            <li className="bg-white  rounded transition-colors font-bold duration-300 text-gray-500  hover:bg-white hover:text-blue-500">
              <a href="#hero">About</a>
            </li>
            <li className="bg-white  rounded transition-colors font-bold duration-300 text-gray-500 hover:bg-white hover:text-blue-500">
              <Link to="/signin">Login</Link>
            </li>
            <li className="bg-white  rounded transition-colors font-bold duration-300  hover:bg-white hover:text-blue-500">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-between py-16 px-8 md:px-16">
        <div className="md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-blue-900">
            <span className="text-2xl text-blue-900">
              Automated Attendance System
            </span>{" "}
            <br />
            <span className="text-5xl" style={{ color: "#6E82A7" }}>
              with Face Recognition
            </span>
          </h1>

          <p className="text-lg text-gray-500 mt-4">
            Say goodbye to manual attendance tracking and hello to streamlined
            processes with our innovative solution.
          </p>

          <button
            className="mt-8 text-white px-10 py-3 font-bold rounded-8 hover:bg-blue-300"
            style={{ backgroundColor: "#6E82A7" }}
          >
            Get Started
          </button>
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src={mainImage}
            alt="Online Education"
            className="w-full h-auto"
          />
        </div>
      </main>

      {/* Simple Steps Section */}
      {/* Custom Section with New Background Color and Border Radius */}
      <section
        className="py-16 text-white text-center ml-24 border rounded-tl-3xl rounded-bl-3xl animate-left"
        style={{ backgroundColor: "#6E82A7" }}
      >
        <div className="flex justify-center space-x-8">
          <div
            className="flex flex-col items-left text-black  rounded-lg"
            style={{ backgroundColor: "#6E82A7" }}
          >
            <h2 className="text-4xl text-white font-bold mb-8">
              Simple way to start Learning
            </h2>
            <p className=" ml-2 w-96 text-lg text-gray-300">
              Use our state-of-the-art face recognition system to automate
              attendance tracking and ensure security and accuracy.
            </p>
          </div>
          <div
            className="flex flex-col items-center text-white p-6 rounded-lg border border-transparent shadow-lg"
            style={{ backgroundColor: "#6E82A7" }}
          >
            <div className="relative">
              <div className=" w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <MdPerson size={28} color="#6E82A7" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mt-4">
              Create Account
            </h3>
          </div>
          <div
            className="flex flex-col items-center text-white p-6 rounded-lg border border-transparent shadow-lg"
            style={{ backgroundColor: "#6E82A7" }}
          >
            <div className="relative">
              <div className=" w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <MdClass size={28} color="#6E82A7" />
              </div>
            </div>{" "}
            <h3 className="text-lg font-bold text-white mt-4">Join Course</h3>
          </div>
          <div
            className="flex flex-col items-center text-white p-6 rounded-lg border border-transparent shadow-lg"
            style={{ backgroundColor: "#6E82A7" }}
          >
            <div className="relative">
              <div className=" w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <MdHome size={28} color="#6E82A7" />
              </div>
            </div>{" "}
            <h3 className="text-lg font-bold text-white mt-4">
              Take attendance
            </h3>
          </div>
          <div
            className="flex flex-col items-center text-white p-6 rounded-lg mr-8 border border-transparent shadow-lg"
            style={{ backgroundColor: "#6E82A7" }}
          >
            <div className="relative">
              <div className=" w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <MdSubject size={28} color="#6E82A7" />
              </div>
            </div>{" "}
            <h3 className="text-lg font-bold text-white mt-4">
              Start Learning
            </h3>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-16 mt-8 mb-2 bg-white text-center">
        <div className="mb-8">
          <h3 className="text-yellow-500 font-semibold">Why Choose Us</h3>
          <h2 className="text-4xl font-bold mt-2">Benefits Of Using</h2>
          <h2 className="text-4xl font-bold text-blue-700 mt-2">
            Our Attendance System
          </h2>
        </div>
        <div className="flex justify-center space-x-12">
          <div className="text-center p-6 border rounded-md shadow-md w-1/4">
            <div className="text-3xl mb-4">
              <span className="inline-block p-2 bg-gray-200 rounded-full">
                <i className="fas fa-clock"></i>
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-gray-500">
              Utilize advanced facial recognition to track attendance in real
              time, ensuring accurate and timely records.
            </p>
          </div>
          <div className="text-center p-6 border rounded-md shadow-md w-1/4">
            <div className="text-3xl mb-4">
              <span className="inline-block p-2 bg-gray-200 rounded-full">
                <i className="fas fa-user-shield"></i>
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
            <p className="text-gray-500">
              Our system offers enhanced security features, protecting personal
              data and ensuring only authorized access.
            </p>
          </div>
          <div className="text-center p-6 border rounded-md shadow-md w-1/4">
            <div className="text-3xl mb-4">
              <span className="inline-block p-2 bg-gray-200 rounded-full">
                <i className="fas fa-tachometer-alt"></i>
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Efficiency & Automation
            </h3>
            <p className="text-gray-500">
              Automate attendance tracking to reduce manual errors and save
              time, allowing educators to focus on teaching.
            </p>
          </div>
        </div>
      </section>

      <Testimonials />
      <HeroSection />
      <Workflow />
    </div>
  );
}

export default App;