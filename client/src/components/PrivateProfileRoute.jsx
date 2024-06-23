import { useSelector } from "react-redux";
import { Outlet, Navigate} from "react-router-dom";

export default function PrivateProfileRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet/> : <Navigate to="/sign-in"/>; // If user is logged in, show the profile page, else redirect to sign-in page
}