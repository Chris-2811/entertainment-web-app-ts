import React from 'react';
import { useEffect, useState } from 'react';
import { fetchAPIData } from '@/lib/api';
import { API_KEY } from '@/constants';
import MediaCard from '@/components/shared/main/MediaCard';
import MediaGrid from './MediaGrid';

function Recommended() {
  const [totalMedia, setTotalMedia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchAPIData(
        `movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const shows = await fetchAPIData(
        `tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const moviesWithMediaType = movies.map((movie) => ({
        ...movie,
        media_type: 'movie',
      }));
      const mixed = moviesWithMediaType
        .concat(shows)
        .sort(() => Math.random() - 0.5);
      const sliced = mixed.slice(0, 20);

      setTotalMedia(sliced);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-6 lg:mt-10">
      <MediaGrid title="Recommended for you">
        {totalMedia.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </MediaGrid>
    </div>
  );
}

export default Recommended;
