import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("User object in Navbar:", user);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          BookVerse
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/books" className="text-gray-700 hover:text-blue-600">
            Books
          </Link>

          {/* ✅ Show Add Book only if admin */}
          {user?.isAdmin && (
            <Link to="/add-book" className="text-gray-700 hover:text-blue-600">
              Add Book
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                {user.name || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
