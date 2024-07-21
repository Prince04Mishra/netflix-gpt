import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE, USER_AVTAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessege, setErrorMessege] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const habdleButtonClick = () => {
    // Validate the form data
    const messege = checkValidData(email.current.value, password.current.value);
    setErrorMessege(messege);

    if (messege) return;

    if (!isSignInForm) {
      // Sign up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVTAR,
          })
            .then(() => {
              // Profile updated
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessege(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessege(errorCode + "-" + errorMessage);
        });
    } else {
      //  Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessege(errorCode + "-" + errorMessage);
        });
    }

    if (!isSignInForm) {
      const mess = checkValidData(
        email.current.value,
        password.current.value,
        name.current.value
      );
      setErrorMessege(mess);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_IMAGE} alt="bg-image" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 p-12 bg-black my-36 absolute mx-auto right-0 left-0 text-white rounded-lg opacity-80"
      >
        <h1 className="font-bold text-3xl  py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-md "
        />
        <p className="text-red-500 font-bold font-serif text-lg py-2 text-center">
          {errorMessege}
        </p>
        <button
          onClick={habdleButtonClick}
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 text-xl">
          {!isSignInForm ? "Already registred? " : "New to Netflix? "}
          <span
            onClick={toggleSignInForm}
            className="font-bold  cursor-pointer hover:underline"
          >
            {!isSignInForm ? "Sign In Now." : "Sign Up Now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
