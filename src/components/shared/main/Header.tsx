import { useEffect, useState } from 'react';
import logo from '@/assets/logo.svg';
import Home from '@/assets/icon-nav-home.svg?react';
import Movies from '@/assets/icon-nav-movies.svg?react';
import Shows from '@/assets/icon-nav-tv-series.svg?react';
import Bookmark from '@/assets/icon-nav-bookmark.svg?react';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import useAuth from '@/hooks/useAuth';
import { db } from '@/lib/firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';

function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  function toggleUserMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such document');
        }

        setLoading(false);
      };

      fetchData();
    }
  }, [user]);

  console.log(userData);

  return (
    <header className="relative bg-semi-dark-blue py-[1.125rem] md:px-6  md:mx-6 lg:ml-8 4xl:ml-12 lg:mr-0  md:py-5 md:rounded-[10px] lg:rounded-[20px] lg:px-8 lg:pt-[2.215rem] lg:pb-8 lg:min-h-[450px]  lg:h-[84vh] lg:max-h-[960px] lg:max-w-[96px]  lg:mb-10 z-10">
      <div className="container md:px-0 flex items-center justify-between lg:flex-col lg:justify-start lg:h-full">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-7 h-6 md:w-8 md:h-[1.6rem]" />
        </NavLink>
        <nav className="primary-navigation" aria-label="Primary-navigation">
          <ul className="flex items-center gap-5 md:gap-6 lg:flex-col lg:mt-[4.625rem]">
            <li>
              <NavLink to="/">
                <Home height={20} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies">
                <Movies />
              </NavLink>
            </li>
            <li>
              <NavLink to="/shows">
                <Shows />
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookmarked">
                <Bookmark />
              </NavLink>
            </li>
          </ul>
        </nav>
        <div
          className="w-7 h-7 grid place-items-center md:h-8 md:w-8 lg:h-10 lg:w-10 border border-white rounded-full lg:mt-auto hover:bg-white/50"
          onClick={toggleUserMenu}
        >
          {user && !loading ? (
            <NavLink to="/profile" className="block h-full w-full">
              <img
                src={userData.photoURL}
                alt="avatar of user"
                className="rounded-full h-full w-full object-center object-cover"
              />
            </NavLink>
          ) : (
            <div className="mb-[3px] ">
              <NavLink to="/profile">
                <FaUser />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
