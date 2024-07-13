import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserDataStart,
  updateUserDataSuccess,
  updateUserDataFaliure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { set } from "mongoose";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [userUpdateSucess, setUserUpdateSucess] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  // handle file upload
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // create a unique file name
    const storageRef = ref(storage, fileName); // create a storage reference
    const uploadTask = uploadBytesResumable(storageRef, file); // upload file to storage

    // listen for state changes
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileProgress(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  // handle form changes
  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // update user profile
      dispatch(updateUserDataStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserDataFaliure(data.message));
        return;
      }
      dispatch(updateUserDataSuccess(data));
      setUserUpdateSucess(true);
    } catch (error) {
      dispatch(updateUserDataFaliure(error.message));
    }
  };

  // Handle delete user

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Handling Sign Out

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  // Handle showing listings for user

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])} // set file to state
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <div className="relative self-center">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer"
          />
          <i className="fa-solid fa-pen-to-square absolute right-2 top-20 cursor-pointer text-slate-600"></i>
        </div>
        {/* display file upload status */}
        <p className="text-center text-sm text-red-700 self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Image upload failed (file must be less than 2 megabytes){" "}
            </span>
          ) : fileProgress > 0 && fileProgress < 100 ? (
            <span className="text-green-700">
              {`Uploading ${fileProgress}%`}
            </span>
          ) : fileProgress === 100 ? (
            <span className="text-green-700">Upload completed!</span>
          ) : (
            ""
          )}
        </p>
        {/* Form fields */}
        <input
          type="text"
          placeholder="userName"
          id="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleChanges}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg "
          defaultValue={currentUser.email}
          onChange={handleChanges}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg "
          onChange={handleChanges}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 rounded-lg p-3 text-white uppercase hover:opacity-95 text-center"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between gap-4 mt-4">
        <span onClick={handleDeleteUser} className="text-red-700">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-4">{error ? error : ""}</p>
      <p className="text-green-700 mt-4">
        {userUpdateSucess ? "Profile updated successfully" : ""}
      </p>
      <button onClick={handleShowListings} className="text-green-700 w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-4">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="Listing cover image"
                  className="h-20 w-20 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold truncate flex-1 hover:underline"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700">Delete</button>
                <button className="text-green-700">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
