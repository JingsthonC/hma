import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import avatar from "/avatars/vitote.jpg";

const UserProfile = () => {
  const { user, logout } = useAuth();
  // const avatarPath = "avatars/vitote.jpg";

  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the logout function from the authentication context
    logout();
    navigate("signin", { replace: true });
    // You can also perform additional actions after logging out if needed
    console.log("Logged out successfully");
  };
  return (
    <div className="flex items-center pl-4">
      {user && user.user && <span className="px-2">{user.user.email}</span>}
      <img src={avatar} alt="User Avatar" className="h-8 w-8 rounded-full" />

      <button
        onClick={handleLogout}
        className="mx-3 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        {" "}
        Logout
      </button>
    </div>
  );
};
export default UserProfile;
