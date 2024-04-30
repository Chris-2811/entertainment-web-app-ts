import { fetchAPIData } from '@/lib/api';
import { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import MediaCard from '@/components/shared/main/MediaCard';

function Trending() {
  const [trendingTotal, setTrendingTotal] = useState<any[]>([]);

  function getCardWidth() {
    const width = window.innerWidth;

    if (width <= 640) {
      // Small screens
      return 256;
    } else {
      return 510; // Large screens
    }
  }

  function slideLeft() {
    let slider = document.getElementById('slider');
    let cardWidth = getCardWidth();
    if (slider) {
      slider.scrollLeft -= cardWidth;
    }
  }

  function slideRight() {
    let slider = document.getElementById('slider');
    let cardWidth = getCardWidth();
    if (slider) {
      slider.scrollLeft += cardWidth;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const movies = await fetchAPIData('trending/movie/day');
      const shows = await fetchAPIData('trending/tv/day');

      const mixed = movies.concat(shows).sort(() => Math.random() - 0.5);
      const sliced = mixed.slice(0, 20);

      setTrendingTotal(sliced);
    }

    fetchData();
  }, []);

  return (
    <div className="ml-4 md:ml-6 lg:ml-9 mt-4 md:mt-5">
      <h2 className="heading-lg">Trending</h2>
      <div className="grid-container-trending mt-4 md:mt-6">
        <div className="relative group">
          <MdChevronLeft
            onClick={() => slideLeft()}
            size={40}
            className="absolute text-black left-0 top-[50%] -translate-y-[50%] cursor-pointer rounded-full bg-white opacity-75 z-20 hidden group-hover:block"
          />
          <div
            id="slider"
            className="flex items-center gap-4 md:gap-10 overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap"
          >
            {trendingTotal.map((item) => {
              return <MediaCard key={item.id} item={item} variant="trending" />;
            })}
          </div>
          <MdChevronRight
            onClick={() => slideRight()}
            size={40}
            className="absolute text-black right-0 top-[50%] -translate-y-[50%] cursor-pointer bg-white opacity-75 rounded-full z-10 hidden group-hover:block  "
          />
        </div>
      </div>
    </div>
  );
}

export default Trending;
