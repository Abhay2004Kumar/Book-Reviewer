import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition"
        >
          BookVerse
        </Link>

        <div className="flex items-center gap-6 mt-2 md:mt-0">
          <Link
            to="/books"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Books
          </Link>

          {user?.isAdmin && (
            <Link
              to="/add-book"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Add Book
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none transition duration-200">
                {user.name || "Profile"}
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
