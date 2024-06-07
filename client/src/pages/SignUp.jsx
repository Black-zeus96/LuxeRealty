import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  // Storing state/data when user is entering/typing data in any of input fields
  const [formData, setFormData] = useState({});
  // State for error
  const [error, setError] = useState(null);
  // State for loading
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //using useNavigate hook so we can go to sign in page

  // Tracking data when user is entering/typing data in any of input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // preventing page refresh
    try {
      setLoading(true);
      const res = await fetch(
        "/api/auth/signup", //from here we use proxy (refer vite.config.js)
        {
          // Also, stringifying form data

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json(); //converting data to json

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-center text-3xl font-semibold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          className="rounded border p-3"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded border p-3"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded border p-3"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="cta-black p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "SignUp"}
        </button>
      </form>
      <div className="flex mt-4 gap-2">
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
