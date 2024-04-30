import MediaGrid from '@/components/shared/main/MediaGrid';
import { useEffect } from 'react';
import { fetchAPIData } from '@/lib/api';
import { API_KEY } from '@/constants';
import MediaCard from '@/components/shared/main/MediaCard';
import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import Pagination from '@/components/shared/main/Pagination';

function Shows() {
  const [shows, setMovies] = useState([]);
  const { showData, queryTerm } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      const shows = await fetchAPIData(
        `tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const showsWithMediaType = shows.map((show: any) => {
        return { ...show, media_type: 'TV' };
      });

      setMovies(showsWithMediaType);
    };
    fetchData();
  }, []);

  return (
    <div>
      {showData ? (
        <div>
          <MediaGrid
            title={`Found ${showData.total_results} results for ${queryTerm}`}
          >
            {showData.results.map((item: any) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </MediaGrid>
          <Pagination item={showData} />
        </div>
      ) : (
        <MediaGrid title="Shows">
          {shows.map((item: any) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </MediaGrid>
      )}
    </div>
  );
}

export default Shows;
