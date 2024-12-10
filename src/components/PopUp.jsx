import React, { useState } from "react";
import Image from "next/image";
import backgroundCard from "../../public/pics/card.png"
import ButtonWIcon from "./ButtonWIcon";
import Star from "../../public/pics/star.svg"

export default function Modal({ isOpen, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // For switching between login and sign up

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., API call
    console.log("Logging in with", email, password);
    // After login, close the modal
    closeModal();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform sign-up logic here, e.g., API call
    console.log("Signing up with", email, password);
    // After sign-up, close the modal
    closeModal();
  };

  const handleContinueAsGuest = () => {
    console.log("Continuing as guest");
    closeModal(); // Close modal when clicking continue as guest
  };

  const switchToSignUp = () => {
    setIsSignUp(true); // Switch to sign-up form
  };

  const switchToLogin = () => {
    setIsSignUp(false); // Switch back to login form
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Background with Image */}
      <div className="relative p-10 w-96 before:content-[''] before:absolute before:-top-8 before:-right-8 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg">
      <div className="absolute inset-0 z-0">
          <Image
            src={backgroundCard}
            alt="Ticket background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-lg"
          />
        </div>

        {/* Modal Content on top of the image */}
        <div className="relative z-10">
        <h1 className="text-[2rem] text-centermb-4 text-white">
  {isSignUp ? (
    "Sign Up"
  ) : (
    <>
      Welcome to <span className="font-serif ">Foo</span>
    </>
  )}
</h1>          
          {/* Login or Sign-up Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-center items-center">
            <ButtonWIcon
    text={isSignUp ? "Sign Up" : "Login"} 
    defaultIcon={<Image src={Star} alt="Star" width={20} height={20} />}
    defaultBgColor="#2c2c2a" 
    onClick={handleLogin} 
  />
            </div>
          </form>

          {/* Links to switch between login and sign-up */}
          {!isSignUp ? (
            <p className="text-center text-sm mt-4 font-sans text-white">
              Don't have an account?{" "}
              <span
                onClick={switchToSignUp}
                className="text-white cursor-pointer font-sans"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-center text-sm mt-4 text-white">
              Already have an account?{" "}
              <span
                onClick={switchToLogin}
                className="text-white cursor-pointer"
              >
                Login
              </span>
            </p>
          )}

          <div className="mt-4 flex justify-center text-center">
            <ButtonWIcon
            defaultIcon={<Image src={Star} alt="Star" width={20} height={20} />}
            text="Continue as guest"
            defaultBgColor="#2c2c2a"
              onClick={handleContinueAsGuest}
              
            >
            </ButtonWIcon>
          </div>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}