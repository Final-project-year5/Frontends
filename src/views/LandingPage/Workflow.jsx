// import { CheckCircle2 } from "lucide-react";
// import faceRecognitionImg from "../../assets/img/workflow.png";
// import { checklistItems } from "./constants";

// const Workflow = () => {
//   return (
//     <div className="mt-20">
//       <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-center mt-6 tracking-wide">
//         Enhance your{" "}
//         <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
//           attendance system.
//         </span>
//       </h2>
//       <div className="flex flex-wrap justify-center">
//         <div className="p-1 w-full lg:w-1/2">
//           <img src={faceRecognitionImg} alt="Face Recognition" className="w-full lg:w-3/4"/>
//         </div>
//         <div className="pt-12 w-full lg:w-1/3">
//           {checklistItems.map((item, index) => (
//             <div key={index} className="flex mb-12">
//               <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
//                 <CheckCircle2 />
//               </div>
//               <div>
//                 <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
//                 <p className="text-md text-neutral-500">{item.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Workflow;
import React from "react";
import image from "../../assets/img/landingpage/newsletter.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Newsletter = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-gray-100">
      <div className="flex-grow flex justify-center items-center py-10 relative z-10">
        <div
          className="bg-white py-16 pl-12 pr-72 rounded-3xl shadow-lg flex items-center space-x-6 relative z-20"
          style={{ backgroundColor: "#95B8D1" }}
        >
          <img
            src={image}
            alt="Man with laptop"
            className="absolute w-1/3 h-auto rounded-lg object-cover top-4 right-0 bottom-0 my-auto"
          />
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-10 text-blue-900">
              Contact US
            </h2>
            <p className="text-gray-200 mb-8 ml-2">
              If you have any questions, comments, or concerns, we would love to
              hear from you! Please fill out the form below, and one of our team
              members will get back to you as soon as possible.
            </p>

            <form className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-grow p-4 border border-blue-300 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="text-white p-2 rounded-r-lg hover:bg-purple-700 transition-colors"
                style={{ backgroundColor: "#6E82A7" }}
              >
                &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="text-gray-200 pb-6" style={{ backgroundColor: "#6E82A7" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Future Skills</h2>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="hover:underline text-gray-400">
                Features
              </a>
              <a href="#" className="hover:underline text-gray-400">
                About Us
              </a>
              <a href="#" className="hover:underline text-gray-400">
                Blog
              </a>
              <a href="#" className="hover:underline text-gray-400">
                Download App
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Newsletter;
