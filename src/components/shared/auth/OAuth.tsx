import { auth } from '@/lib/firebase/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from 'firebase/auth';
import googleIcon from '@/assets/icon-google.svg';
import githubIcon from '@/assets/icon-github.png';
import microsoftIcon from '@/assets/icon-microsoft.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import {
  setPersistence,
  browserSessionPersistence,
  sendEmailVerification,
} from 'firebase/auth';

function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await sendEmailVerification(user);
        console.log('Verification email sent.');
      }

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          username: '',
          email: user.email,
          location: '',
          savedMovies: [],
          savedShows: [],
        });
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function onGithubClick() {
    try {
      const provider = new GithubAuthProvider();

      await signInWithPopup(auth, provider);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function onMicrosoftClick() {
    try {
      const provider = new OAuthProvider('microsoft.com');

      await signInWithPopup(auth, provider);

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
          className="bg-white w-12 h-12 grid place-items-center mt-[0.625rem] mb-4 rounded-full cursor-pointer "
        >
          <img
            src={googleIcon}
            alt="google-icon"
            className="w-[1.625rem] mx-auto"
          />
        </div>
        <div
          onClick={onGithubClick}
          className="bg-white w-[3.25rem] h-[3.25rem] grid place-items-center mt-[0.875rem] mb-4 rounded-full cursor-pointer "
        >
          <img src={githubIcon} alt="github-icon" />
        </div>
        <div
          onClick={onMicrosoftClick}
          className="bg-white w-12 h-12 grid place-items-center mt-[0.875rem] mb-4 rounded-full cursor-pointer "
        >
          <img src={microsoftIcon} alt="github-icon" className="w-6" />
        </div>
      </div>
    </div>
  );
}

export default OAuth;
