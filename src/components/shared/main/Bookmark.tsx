import React, { ReactNode } from 'react';
import bookmarkEmpty from '@/assets/icon-bookmark-empty.svg';
import bookmarkFull from '@/assets/icon-bookmark-full.svg';
import { useEffect, useState } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import useAuth from '@/hooks/useAuth';
import { db } from '@/lib/firebase/firebase';

function Bookmark({ item }) {
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);
  const { user } = useAuth();

  async function handleBookmark() {
    if (user) {
      setIsBookmarked(!isBookmarked);
    }

    const docRef = doc(db, 'users', `${user?.uid}`);

    if (!isBookmarked) {
      if (item.media_type === 'movie') {
        try {
          await updateDoc(docRef, {
            savedMovies: arrayUnion({
              id: item.id,
              title: item.title,
              poster_path: item.poster_path,
              media_type: item.media_type,
              genre_ids: item.genre_ids,
              bookmarked: true,
            }),
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        await updateDoc(docRef, {
          savedShows: arrayUnion({
            id: item.id,
            original_name: item.original_name,
            poster_path: item.poster_path,
            media_type: 'TV',
            first_air_date: item.first_air_date,
            genre_ids: item.genre_ids,
            bookmarked: true,
          }),
        });
      }
    } else {
      if (item.media_type === 'movie') {
        try {
          await updateDoc(docRef, {
            savedMovies: arrayRemove({
              id: item.id,
              title: item.title,
              poster_path: item.poster_path,
              media_type: item.media_type,
              genre_ids: item.genre_ids,
              bookmarked: true,
            }),
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(docRef, {
            savedShows: arrayRemove({
              id: item.id,
              original_name: item.original_name,
              poster_path: item.poster_path,
              media_type: 'TV',
              first_air_date: item.first_air_date,
              genre_ids: item.genre_ids,
              bookmarked: true,
            }),
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  useEffect(() => {
    async function fetchBookmarkState() {
      const docRef = doc(db, 'users', `${user?.uid}`);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const savedMovies = docSnap.data().savedMovies || [];
        const savedShows = docSnap.data().savedShows || [];

        const isBookmarked =
          savedMovies.some((movie) => movie.id === item.id) ||
          savedShows.some((show) => show.id === item.id);

        setIsBookmarked(isBookmarked);
      }
    }
    fetchBookmarkState();
  }, [item, user]);

  return (
    <div
      onClick={() => handleBookmark()}
      className=" bg-black/50 grid place-items-center rounded-full w-8 h-8"
    >
      {isBookmarked ? (
        <img src={bookmarkFull} alt="Bookmark" />
      ) : (
        <img src={bookmarkEmpty} alt="Bookmark" />
      )}
    </div>
  );
}

export default Bookmark;
