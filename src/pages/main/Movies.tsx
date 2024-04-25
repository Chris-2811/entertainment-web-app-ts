import MediaGrid from '@/components/shared/main/MediaGrid';
import MediaCard from '@/components/shared/main/MediaCard';
import { useEffect } from 'react';
import { fetchAPIData } from '@/lib/api';
import { API_KEY } from '@/constants';
import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import Pagination from '@/components/shared/main/Pagination';

function Movies() {
  const [movies, setMovies] = useState([]);
  const { movieData, queryTerm } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchAPIData(
        `movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const moviesWithMediaType = movies.map((movie: any) => {
        return { ...movie, media_type: 'movie' };
      });
      setMovies(moviesWithMediaType);
    };
    fetchData();
  }, []);

  return (
    <div>
      {movieData ? (
        <div>
          <MediaGrid
            title={`Found ${movieData.total_results} results for ${queryTerm} `}
          >
            {movieData.results.map((item: any) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </MediaGrid>
          <Pagination item={movieData} />
        </div>
      ) : (
        <MediaGrid title="Movies">
          {movies.map((item: any) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </MediaGrid>
      )}
    </div>
  );
}

export default Movies;
