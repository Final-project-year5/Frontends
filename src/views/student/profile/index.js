import React, { useState, useEffect } from "react";
import avatars7 from "./avatar7.png";
import "./ProfilePage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfilePage() {
  const [fullName, setFullName] = useState("YUYUN FRANCIS BERINYUY");
  const [role, setRole] = useState("");
  const [profilePicture, setProfilePicture] = useState(avatars7);
  const [studentID, setStudentID] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEdit = (setter) => (event) => setter(event.target.value);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^091\d{7}$/;
    return phoneRegex.test(phone);
  };
  const fetchUserProfile = async () => {

  try {
    const response = await fetch("http://localhost:8000/api/profile/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const profileData = await response.json();
      setFullName(profileData.fullname);
      setRole(profileData.role);
      setStudentID(profileData.student_id || "");
      setDepartment(profileData.department || "");
      setSection(profileData.section || "");
      setCollege(profileData.college || "");
      setPhoneNumber(profileData.phonenumber || "");
      setEmail(profileData.email || "");
      setGender(profileData.gender || "");
      if (profileData.profile_picture) {
        setProfilePicture(profileData.profile_picture);
      }
    } else {
      console.error("Failed to fetch user profile:", response.statusText);
      // Set error state if needed
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    // Set error state if needed
  }
};

const handleSaveClick = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/updateprofile/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullName,
        student_id: studentID,
        department: department,
        section: section,
        college: college,
        phonenumber: phoneNumber,
        email: email,
        gender: gender,
        profile_picture: profilePicture,
        password: password,
      }),
    });

    if (response.ok) {
      toast.success("Profile updated successfully.");
      setIsEditMode(false);
    } else {
      const errorData = await response.json();
      toast.error("Failed to update user profile: " + errorData.message);
    }
  } catch (error) {
    toast.error("Error updating user profile: " + error.message);
  }
};

  return (
    <div className="bg-white w-full mt-28 max-w-6xl min-w-screen rounded-lg shadow-lg overflow-hidden">
      <div
        className="relative pt-20 h-48"
        style={{
          background: "linear-gradient(to right, #6e82a7, #95b8d1)",
          color: "#6e82a7",
          padding: "6px",
          paddingBottom: "16px",
        }}
      >
        <div className="absolute left-8 bottom-8 transform translate-y-2/3">
          {/* Profile Picture */}
          <img
            src={profilePicture}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-white"
            style={{ borderColor: "white", borderWidth: "10px" }}
          />
        </div>
        <div className="pl-48 pt-10 mt-20 text-white">
          {/* Name */}
          <h2 className="text-2xl text-white font-bold">{fullName}</h2>
          <p className="text-sm">
            @{fullName.replace(/\s+/g, "").toLowerCase()}
          </p>
        </div>
        <div className="absolute top-4 right-4">
          {/* Edit button */}
          <button className="relative" onClick={() => setIsEditMode(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.163 6 9.388 6 12v2.158c0 .538-.214 1.055-.595 1.437L4 17h5m4 0v2a2 2 0 11-4 0v-2m4 0H9"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-6 mt-12">
        <div className="flex justify-between">
          <p className="text-gray-500"></p>
          <button className="text-blue-300" onClick={() => setIsEditMode(true)}>
            Edit Profile
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* First name */}
          <div>
            <label
              className="block font-bold text-xl"
              style={{ color: "#6e82a7" }}
            >
              First name:
            </label>
            {isEditMode ? (
              <input
                type="text"
                value={fullName}
                onChange={handleEdit(setFullName)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                style={{ borderColor: "#b8e0d2" }}
              />
            ) : (
              <p className="mt-1">{fullName}</p>
            )}
          </div>
          {/* Student ID */}
          {role === "Student" && (
            <div>
              <label
                className="block font-bold text-xl"
                style={{ color: "#6e82a7" }}
              >
                Student ID:
              </label>
              {isEditMode ? (
                <input
                  type="text"
                  value={studentID}
                  onChange={handleEdit(setStudentID)}
                  className="mt-1 p-2 border rounded w-full "
                  style={{ borderColor: "#b8e0d2" }}
                />
              ) : (
                <p className="mt-1">{studentID}</p>
              )}
            </div>
          )}
          {/* Section */}
          {role === "Student" && (
            <div>
              <label
                className="block font-bold text-xl"
                style={{ color: "#6e82a7" }}
              >
                Section:
              </label>
              {isEditMode ? (
                <input
                  type="text"
                  value={section}
                  onChange={handleEdit(setSection)}
                  className="mt-1 p-2 border rounded w-full"
                  style={{ borderColor: "#b8e0d2" }}
                />
              ) : (
                <p className="mt-1">{section}</p>
              )}
            </div>
          )}
          {/* Gender */}
          <div>
            <label
              className="block font-bold text-xl"
              style={{ color: "#6e82a7" }}
            >
              Gender:
            </label>
            {isEditMode ? (
              <select
                value={gender}
                onChange={handleEdit(setGender)}
                className="mt-1 p-2 border rounded w-full"
                style={{ borderColor: "#b8e0d2" }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="mt-1">{gender}</p>
            )}
          </div>
          {/* Phone Number */}
          <div>
            <label
              className="block font-bold text-xl"
              style={{ color: "#6e82a7" }}
            >
              Phone Number:
            </label>
            {isEditMode ? (
              <input
                type="text"
                value={phoneNumber}
                onChange={handleEdit(setPhoneNumber)}
                className="mt-1 p-2 border rounded w-full"
                style={{ borderColor: "#b8e0d2" }}
              />
            ) : (
              <p className="mt-1">{phoneNumber}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label
              className="block font-bold text-xl"
              style={{ color: "#6e82a7" }}
            >
              Email:
            </label>
            {isEditMode ? (
              <input
                type="email"
                value={email}
                onChange={handleEdit(setEmail)}
                className="mt-1 p-2 border rounded w-full"
                style={{ borderColor: "#b8e0d2" }}
              />
            ) : (
              <p className="mt-1">{email}</p>
            )}
          </div>
          {/* College */}
          <div>
            <label
              className="block font-bold text-xl"
              style={{ color: "#6e82a7" }}
            >
              College:
            </label>
            {isEditMode ? (
              <select
                value={college}
                onChange={handleEdit(setCollege)}
                className="mt-1 p-2 border rounded w-full"
                style={{ borderColor: "#b8e0d2" }}
              >
                <option value="College1">College1</option>
                <option value="College2">College2</option>
                <option value="College3">College3</option>
              </select>
            ) : (
              <p className="mt-1">{college}</p>
            )}
          </div>
          {/* Department */}
          <div>
            <label
              className="block font-bold text-xl"
              style={{ color: "#6e82a7" }}
            >
              Department:
            </label>
            {isEditMode ? (
              <select
                value={department}
                onChange={handleEdit(setDepartment)}
                className="mt-1 p-2 border rounded w-full"
                style={{ borderColor: "#b8e0d2" }}
              >
                <option value="Department1">Department1</option>
                <option value="Department2">Department2</option>
                <option value="Department3">Department3</option>
              </select>
            ) : (
              <p className="mt-1">{department}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block font-bold text-xl"
              style={{ color: "#6e82a7" }}
            >
              Password:
            </label>
            {isEditMode ? (
              <input
                type="password"
                value={password}
                onChange={handleEdit(setPassword)}
                className="mt-1 p-2 border rounded w-full"
                style={{ borderColor: "#b8e0d2" }}
              />
            ) : (
              <p className="mt-1">******</p>
            )}
          </div>
        </div>
        {isEditMode && (
          <div className="text-right mt-4">
            <button
              onClick={handleSaveClick}
              className="text-white px-4 py-2 rounded"
              style={{
                backgroundColor: "#6e82a7",
                transition: "background-color 0.3s",
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
