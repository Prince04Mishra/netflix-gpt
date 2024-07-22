import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const toggleGptSeacrh = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in / signed up
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browser");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between  ">
      <img className="w-48" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex p-2 justify-center items-center">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="px-2 py-2 my-2  bg-gray-900 text-white rounded-lg text-center"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={toggleGptSeacrh}
            className="text-white bg-[#2596be] px-4 mx-4 py-2 my-2 rounded-lg hover:bg-gradient-to-t from-fuchsia-600 font-bold"
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-12 h-12 rounded-md"
            src={user?.photoURL}
            alt="usericon"
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white font-serif mx-2"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
