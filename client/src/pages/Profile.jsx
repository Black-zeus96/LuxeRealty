import { useRef, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { app } from "../firebase";


export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});


  // handle file upload
  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // create a unique file name
    const storageRef = ref(storage, fileName); // create a storage reference
    const uploadTask = uploadBytesResumable(storageRef, file); // upload file to storage
    

    // listen for state changes
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">

        <input 
          onChange={(e) => setFile(e.target.files[0])} // set file to state
          type="file" 
          ref={fileRef} 
          hidden accept="image/*"
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
            <span className="text-red-700">Image upload failed (file must be less than 2 megabytes) </span>
          ) : fileProgress > 0 && fileProgress < 100 ? (
          <span className="text-green-700">
            {`Uploading ${fileProgress}%`}
            </span>
          ) :
            (fileProgress === 100 ? (
            <span className="text-green-700">Upload completed!</span> ) : (""))}
       </p>

        <input type="text" placeholder="userName" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg " />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg " />
        <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between gap-4 mt-4">
        <span className="text-red-700">Delete Account</span>
        <span className="text-red-700">Sign out</span>
      </div>
    </div>
  )
}
