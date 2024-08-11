import { FaSearch } from "react-icons/fa"; // importing search icon
import { Link, useNavigate } from "react-router-dom"; // Importing link
import { useSelector } from "react-redux"; // Importing useSelector from react-redux
import { useState, useEffect } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user); // Getting current user from redux store
  const [searchTerm, setSearchTerm] = useState(""); // Setting search term to empty string
  const navigate = useNavigate();

  // Function to handle search
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // UseEffect to get search term from url
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-grey shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 id="logo" className="text-sm sm:text-xl flex flex-wrap italic">
            <span>Luxe</span>
            <span>Realty</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          action=""
          className="bg-white p-3 rounded-lg flex items-center border"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="bg-white" />
          </button>
        </form>
        <ul className="flex gap-4 primary-black">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link
            target="_blank"
            to="https://apps.royalbank.com/apps/mortgages/mortgage-payment-calculator/"
          >
            <li className="hidden sm:inline hover:underline">
              Mortgage Calculator
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <li className="sm:inline hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
