import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [loginMethod, setLoginMethod] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [loginStatus, setLoginStatus] = useState("");
  const [step, setStep] = useState(1);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const history = useHistory();

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

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    if (method === "faceScan") {
      setShowCamera(true);
      setStep(2);
    } else {
      setShowCamera(false);
      setStep(1);
    }
  };

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const validateLoginForm = () => {
    let isValid = true;
    const trimmedEmail = loginEmail.trim();

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail) && !/^(ETS|Ets)\d{4}\/\d{2}$/.test(trimmedEmail)) {
      setLoginEmailError("Please enter a valid email address or student ID.");
      isValid = false;
    } else {
      setLoginEmailError("");
    }

    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateLoginForm()) {
      return;
    }
  
    setLoginStatus("logging_in");
  
    let requestData = {};
    const trimmedEmail = loginEmail.trim();
  
    if (/^(ETS|Ets)\d{4}\/\d{2}$/.test(trimmedEmail)) {
      requestData = {
        student_id: trimmedEmail,
        password: loginPassword.trim(),
      };
    } else {
      requestData = {
        email: trimmedEmail,
        password: loginPassword.trim(),
      };
    }
  
    console.log("Login request data:", requestData);
  
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const responseData = await response.json();
      console.log("My Login response data:", responseData);
  
      if (response.ok) {
        localStorage.setItem("accessToken", responseData.access_token);
        localStorage.setItem("role", JSON.stringify(responseData.role));
        const userRole = responseData.role;
        console.log("login form: ");
        console.log(userRole);
        setLoginStatus("");
        if (userRole === "admin") {
          history.push(`/admin`);
        } else if (userRole === "teacher") {
          history.push(`/teacher`);
        } else if (userRole === "student") {
          history.push(`/student`);
        } else {
          console.error("Unknown user role:", userRole);
        }
        toast.success("Login successful");
      } else {
        setLoginStatus("invalid");
        console.error("Login failed:", responseData.error);
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoginStatus("invalid");
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again later.");
    }
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
      const formData = new FormData();
      formData.append("image", blob);
  
      const response = await fetch("http://localhost:8000/api/face-login/", {
        method: "POST",
        body: formData,
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        setShowCamera(false);
        stopVideo();
        localStorage.setItem("accessToken", responseData.access_token);
        localStorage.setItem("role", JSON.stringify(responseData.role));
        const userRole = responseData.role;
        if (userRole === "admin") {
          history.push(`/admin`);
        } else if (userRole === "teacher") {
          history.push(`/teacher`);
        } else if (userRole === "student") {
          history.push(`/student`);
        } else {
          console.error("Unknown user role:", userRole);
        }
        toast.success("Login successful");
      } else {
        setLoginStatus("invalid");
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error capturing picture:", error);
      toast.error("Error capturing picture. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-3/4">
        <div className="w-1/3 text-white p-8" style={{ backgroundColor: "#6e82a7" }}>
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#d6eadf" }}>Login</h1>
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => handleLoginMethodChange("email")}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold ${step === 1 ? "bg-[#95b8d1]" : "bg-[#6e82a7]"}`}>1</span>
              <span className="ml-4 font-bold">Login with Email or ID</span>
            </div>
            <div className="flex items-center cursor-pointer" onClick={() => handleLoginMethodChange("faceScan")}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold ${step === 2 ? "bg-[#95b8d1]" : "bg-[#6e82a7]"}`}>2</span>
              <span className="ml-4 font-bold">Login with face scan</span>
            </div>
          </div>
        </div>
        <div className="w-2/3 p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 text-white rounded-full flex items-center justify-center text-2xl font-bold bg-[#92ADDF]">
                A
              </div>
              <h2 className="ml-4 text-2xl font-bold" style={
                {color:"#6e82a7"}
              }>Welcome</h2>
            </div>
            {step === 1 && (
              <div>
                <div className="mb-4 text-lg">
                  <div className="relative">
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={handleLoginEmailChange}
                      onFocus={() => setLoginEmailError("")}
                      placeholder=" "
                      className="registration-input text-black pl-4 block w-full ml-4  px-0 mt-12 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                    <label className={`absolute top-0 left-0 mt-0  ml-2 text-gray-400 ${loginEmail ? "hidden" : ""}`}>
                      <FaEnvelope className="inline-block mr-2 " style={{color:"#6e82a7"}}/> Enter your Email or ID
                    </label>
                  </div>
                  {loginEmailError && (
                    <p className="text-red-500 text-sm">{loginEmailError}</p>
                  )}
                </div>
                <div className="mb-4 text-lg">
                  <div className="relative">
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={handleLoginPasswordChange}
                      onFocus={() => setLoginPasswordError("")}
                      placeholder=" "
                      className="registration-input text-black pl-4 mb-4 block w-full px-0 ml-4 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                    <label className={`absolute top-0 left-0 mt-0 ml-2 text-gray-400 ${loginPassword ? "hidden" : ""}`}>
                      <FaLock className="inline-block mr-2 "  style={{color:"#6e82a7"}}/> Password
                    </label>
                  </div>
                  {loginPasswordError && (
                    <p className="text-red-500 text-sm">{loginPasswordError}</p>
                  )}
                </div>
                  <span
                    className="text-blue-300 font-bold cursor-pointer mb-8 ml-96"
                    onClick={() => history.push("/forgotpwd")}
                  >
                                               Forgot password?
                  </span>
                  
                <button
                  type="button"
                  className="w-full bg-[#8da9c4] text-white font-bold py-2 px-4 rounded hover:bg-[#6e82a7] transition duration-300"
                  onClick={handleLoginSubmit}
                >
                  Login
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                {showCamera ? (
                  <div className="flex justify-center items-center mt-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      className="rounded-lg shadow-md w-64 h-48"
                    />
                  </div>
                ) : (
                  capturedImage && (
                    <div className="flex justify-center items-center mt-4">
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="rounded-lg shadow-md w-64 h-48"
                      />
                    </div>
                  )
                )}
                {showCamera && (
                  <button
                    type="button"
                    className="w-full bg-[#8da9c4] text-white font-bold py-2 px-4 rounded hover:bg-[#6e82a7] transition duration-300 mt-4"
                    onClick={handlePictureChange}
                  >
                    Take Picture
                  </button>
                )}
              </div>
            )}
          </div>
          <p className="text-center font-bold text-blue-300">
              Don't have an account?{" "}
              <span
                className="cursor-pointer"
                onClick={() => history.push("/signup")}
              >
                Sign up here
              </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
