import { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(data);
        setForm({ name: data.name, email: data.email }); // set initial values
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };

    getProfile();
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
  
      // Build payload conditionally
      const payload = {
        name: form.name,
        email: form.email,
      };
  
      if (form.password && form.password.trim() !== "") {
        payload.password = form.password;
      }
  
      const { data } = await axios.put("/users/profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setUserData(data);
      setEditing(false);
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };
  

  if (!userData) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
  <label className="block text-sm text-gray-700">New Password</label>
  <input
    name="password"
    type="password"
    value={form.password}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded"
    placeholder="Leave blank to keep current password"
  />
</div>


          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({ name: userData.name, email: userData.email });
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Admin:</strong> {userData.isAdmin ? "Yes" : "No"}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
