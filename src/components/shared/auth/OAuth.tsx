import React from 'react';
import { auth } from '@/lib/firebase/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import googleIcon from '@/assets/icon-google.svg';
import githubIcon from '@/assets/icon-github.png';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="text-center">
      <p>{location.pathname === '/log-in' ? 'Log-in with' : 'Sign-up with'}</p>
      <div className="flex items-center justify-center gap-3">
        <div
          onClick={onGoogleClick}
          className="bg-white w-12 h-12 grid place-items-center my-4 rounded-full cursor-pointer "
        >
          <img
            src={googleIcon}
            alt="google-icon"
            className="w-[1.625rem] mx-auto"
          />
        </div>
        <div
          onClick={onGoogleClick}
          className="bg-white w-[3.25rem] h-[3.25rem] grid place-items-center my-4 rounded-full cursor-pointer "
        >
          <img src={githubIcon} alt="github-icon" />
        </div>
      </div>
    </div>
  );
}

export default OAuth;
