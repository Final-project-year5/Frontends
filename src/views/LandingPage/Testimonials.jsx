
import React, { useState } from "react";
import testimonial1 from "../../assets/img/landingpage/02.png";
import testimonial2 from "../../assets/img/landingpage/01.png";

const StudentFeedback = () => {
  // Define an array of feedback data
  const feedbackData = [
    {
      name: "Leslie Alexander",
      profession: "Web Developer, Texas",
      feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus dui feugiat eget orci consequat. Pretium, risus pretium hac nisi viverra. Aenean velit,",
      image: testimonial1
    },
    {
      name: "John Doe",
      profession: "Software Engineer, California",
      feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus dui feugiat eget orci consequat. Pretium, risus pretium hac nisi viverra. Aenean velit,",
      image: testimonial2
    }
    // Add more feedback data as needed
  ];

  // State to track the index of the currently displayed feedback
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

  // Function to handle clicking the right arrow
  const handleNextFeedback = () => {
    setCurrentFeedbackIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
  };

  // Function to handle clicking the left arrow
  const handlePrevFeedback = () => {
    setCurrentFeedbackIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length);
  };

  return (
    <div className=" mt-12 flex ml-32 mr-32 items-center justify-center ">
      {/* <div className="bg-opacity-50  p-10 rounded-lg shadow-lg flex items-center space-x-6 max-w-4xl mx-auto" > */}
        <div className="flex items-center">
          <button onClick={handlePrevFeedback} className="bg-white rounded-full p-2 shadow-md focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col md:flex-row items-center space-x-6  p-20 rounded-lg" style={{backgroundColor: '#6E82A7'}}>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-4">
              Students Feedback
            </h2>
            <p className="text-white mb-4">
              {feedbackData[currentFeedbackIndex].feedback}
            </p>
            <p className="text-white font-semibold">{feedbackData[currentFeedbackIndex].name}</p>
            <p className="text-white">{feedbackData[currentFeedbackIndex].profession}</p>
          </div>
          <div>
            <img
              src={feedbackData[currentFeedbackIndex].image}
              alt="Student with laptop"
              className="rounded-lg object-cover w-48 h-48"
            />
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={handleNextFeedback} className="bg-white rounded-full p-2 shadow-md focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      {/* </div> */}
    </div>
  );
};

export default StudentFeedback;
