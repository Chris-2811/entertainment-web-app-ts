import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import useAuth from '@/hooks/useAuth';
import MediaGrid from '@/components/shared/main/MediaGrid';
import MediaCard from '@/components/shared/main/MediaCard';

function Bookmarked() {
  const { user } = useAuth();
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedShows, setBookmarkedShows] = useState([]);

  useEffect(() => {
    const fetchBookmarkedData = async () => {
      if (user) {
        const docRef = doc(db, 'users', `${user?.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBookmarkedMovies(docSnap.data().savedMovies);
          setBookmarkedShows(docSnap.data().savedShows);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchBookmarkedData();
  }, [bookmarkedMovies, bookmarkedShows]);

  console.log(bookmarkedMovies);

  return (
    <div>
      {bookmarkedMovies.length > 0 && (
        <MediaGrid
          title="Bookmarked Movies"
          marginBottom="mb-6 md:mb-12 lg:mb-10"
        >
          {bookmarkedMovies.map((item: any) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </MediaGrid>
      )}

      {bookmarkedShows.length > 0 && (
        <MediaGrid title="Bookmarked TV Series">
          {bookmarkedShows.map((item: any) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </MediaGrid>
      )}
    </div>
  );
}

export default Bookmarked;
