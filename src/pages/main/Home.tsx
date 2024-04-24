import Trending from '@/components/HomePage/Trending';
import Recommended from '@/components/shared/main/Recommended';
import { useSearch } from '@/hooks/useSearch';
import MediaGrid from '@/components/shared/main/MediaGrid';
import MediaCard from '@/components/shared/main/MediaCard';
import Pagination from '@/components/shared/main/Pagination';
import { useEffect } from 'react';

function Home() {
  const { searchData, queryTerm } = useSearch();

  return (
    <div className="">
      {searchData ? (
        <div className="mt-6">
          {
            <>
              <MediaGrid
                title={`Found ${searchData.total_results} results for ${queryTerm}`}
              >
                {searchData?.results.map((item) => (
                  <MediaCard key={item.id} item={item} />
                ))}
              </MediaGrid>
            </>
          }
          <Pagination item={searchData} />
        </div>
      ) : (
        <div>
          <Trending />
          <Recommended />
        </div>
      )}
    </div>
  );
}

export default Home;
