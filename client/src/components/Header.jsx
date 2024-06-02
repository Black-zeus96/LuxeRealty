import { FaSearch } from "react-icons/fa"; // importing search icon
import { Link } from "react-router-dom"; // Importing link

export default function Header() {
  return (
    <header className="bg-grey shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="text-sm sm:text-xl flex flex-wrap italic">
            <span>Luxe</span>
            <span>Realty</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-white p-3 rounded-lg flex items-center border"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="bg-white" />
        </form>
        <ul className="flex gap-4 primary-black">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/sign-in">
            <li className="sm:inline hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
