import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const StepFourFields = ({
  cachedData,
  onPrevious,
  onSubmit,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const history = useHistory();
  const [picture, setPicture] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (showCamera) {
      startVideo();
    } else {
      stopVideo();
    }
    return () => {
      stopVideo();
    };
  }, [showCamera]);

  useEffect(() => {
    console.log("Picture state:", picture);
  }, [picture]);

  const startVideo = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopVideo = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
      setVideoStream(null);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    onPrevious();
  };

  const handlePictureChange = async () => {
    try {
      if (!videoRef.current || !videoRef.current.srcObject) {
        console.error("No video stream available.");
        return;
      }
      const mediaStream = videoRef.current.srcObject;
      const videoTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      const blob = await imageCapture.takePhoto();
      const file = new File([blob], "profile_picture.jpg", {
        type: "image/jpeg",
      });

      setPicture(file); // Update the picture state
      setShowCamera(false); // Hide the camera
      console.log("Picture state:", picture); // Verify picture state after setting it
      stopVideo(); // Stop the camera
    } catch (error) {
      console.error("Error capturing picture:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if cachedData and fullname exist
    if (!cachedData || !cachedData.fullname) {
      setErrorMessage("Cached data is missing or incomplete.");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", cachedData.fullname);
    formData.append("id", cachedData.id);
    formData.append("email", cachedData.email);
    formData.append("gender", cachedData.gender);
    formData.append("college", cachedData.college);
    formData.append("department", cachedData.department);
    formData.append("section", cachedData.section);
    formData.append("yearSemester", cachedData.yearSemester);
    formData.append("phoneNumber", cachedData.phoneNumber);
    formData.append("password", cachedData.password);
    formData.append("confirmPassword", cachedData.confirmPassword);
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);}
    // Check if a picture has been taken
    if (picture) {
      formData.append("face_image", picture);
    } else {
      setErrorMessage("Please take a picture before submitting.");
      return;
    }

    try {
      // Replace the URL with your actual backend endpoint
      await axios.post("http://localhost:8000/api/register/", formData);
      toast.success("Form submitted successfully!");
      window.location.href = "/signin";
      onSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
    
  };

  return (
    <form className="space-y-4">
      <div className="text-gray-600">
        Take your picture in clear light and show your full face.
      </div>
      {picture && (
        <div>
          <h2 className="text-lg font-medium">Taken Picture</h2>
          <img src={URL.createObjectURL(picture)} alt="Taken Picture" />
        </div>
      )}
      {!showCamera && (
        <button
          type="button"
          onClick={() => setShowCamera(true)}
          className="open-camera-button rounded-lg bg-blue-500 text-white px-4 py-1 transition-colors duration-300 hover:bg-transparent hover:text-blue-500"
        >
          Open Camera
        </button>
      )}
      {showCamera && (
        <div className="camera-container">
          <video ref={videoRef} className="camera-feed" autoPlay />
          <button
            type="button"
            onClick={handlePictureChange}
            className="take-picture-button ml-64 mt-4 rounded-lg bg-blue-500 text-white px-4 py-1 transition-colors duration-300 hover:bg-transparent hover:text-blue-500"
          >
            Take Picture
          </button>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          className="text-white py-2 px-4 rounded hover:bg-teal-600"
          style={{ backgroundColor: "#95b8d1" }}
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="text-white py-2 px-4 rounded hover:bg-teal-600"
          style={{ backgroundColor: "#95b8d1" }}
        >
          Submit
        </button>
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
    </form>
  );
};

export default StepFourFields;
