import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Setting up google authentication with Firebase
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // For sign in pop up
      const result = await signInWithPopup(auth, provider);

      // Sending data to backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      // converting data to json
      const data = await res.json();

      // passing the data on success
      dispatch(signInSuccess(data));

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.log("Could not connect to google!", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="rounded-lg p-3 uppercase border border-solid border-black"
    >
      Continue with Google
    </button>
  );
}
