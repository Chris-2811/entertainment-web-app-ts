import { release } from 'os';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import playIcon from '@/assets/icon-play.svg';
import YoutubePlayer from './YoutubePlayer';
import { MdOndemandVideo } from 'react-icons/md';

interface MediaOverviewProps {
  item: any;
  link: string;
}

function MediaOverview({ item, link }: MediaOverviewProps) {
  const [truncated, setTruncated] = useState<boolean>(true);
  const [truncatedString, setTruncatedString] = useState<string>('');
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const location = useLocation();

  console.log(link);
  const {
    poster_path,
    title,
    backdrop_path,
    vote_average,
    vote_count,
    release_date,
    budget,
    genres,
    runtime,
    overview,
    homepage,
    revenue,
    status,
  } = item;

  function truncateString(str: string, num: number) {
    if (str.length > num && truncated === true) {
      let truncatedString = str.slice(0, num);
      truncatedString = truncatedString.slice(
        0,
        truncatedString.lastIndexOf(' ')
      );

      return truncatedString;
    } else {
      return str;
    }
  }

  useEffect(() => {
    const truncatedString = truncateString(overview, 250);
    setTruncatedString(truncatedString);
  }, [overview, truncated]);

  return (
    <div>
      <div className="md:flex mt-8 items-stretch  md:gap-6 lg:gap-8 xl:gap-10 border-b border-b-greyish-blue pb-8 md:text-base md:border-b-0">
        {!showPlayer && (
          <div className="group relative grid place-items-center xs:w-[350px] lg:w-[380px] 2xl:w-[400px] 4xl:w-[420px] rounded-[15px] overflow-hidden ">
            <div
              onClick={() => link && setShowPlayer(true)}
              className="hidden group-hover:block z-20 absolute"
            >
              {link ? (
                <div className="bg-white/25 cursor-pointer gap-5 rounded-full p-2 pr-6 flex items-center ">
                  <img src={playIcon} alt="play-button" />
                  <p>Play</p>
                </div>
              ) : (
                <div className="bg-white/25 rounded-full p-2 pr-6 flex items-center ">
                  <MdOndemandVideo size={24} />
                  <p className="ml-1"> No trailer available</p>
                </div>
              )}
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt=""
              className="w-full h-full"
            />
            <div className="absolute top-0 left-0 w-full  h-full group-hover:bg-black/50"></div>
          </div>
        )}

        {showPlayer && (
          <YoutubePlayer
            setShowPlayer={setShowPlayer}
            showPlayer={showPlayer}
            link={`https://www.youtube.com/watch?v=${link}`}
          />
        )}

        {!showPlayer && (
          <div className="mt-8 md:mt-0 md:flex flex-col  justify-between ">
            <div className="lg:text-lg">
              <h1 className="heading-lg font-medium leading-tight">{title}</h1>
              <div className="flex items-center gap-1 mt-4 lg:mt-6">
                <FaStar color="#FFA500" size="1.1em" />
                {vote_average.toFixed(1)} / 10
              </div>
              <div className="mt-4 lg:mt-6">
                <span className="font-medium">Release Date: </span>
                {release_date}
              </div>
              <div className="my-6 xs:max-w-[440px] ">
                {truncatedString}
                {truncated ? (
                  <span
                    onClick={() => setTruncated(false)}
                    className="text-red font-medium text-xl ml-1 cursor-pointer"
                  >
                    ...
                  </span>
                ) : (
                  <p
                    className="mt-1 text-red font-medium cursor-pointer"
                    onClick={() => setTruncated(true)}
                  >
                    Show less
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-medium">Genres:</h3>
                {genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </div>
            </div>
            <div className="md:mb-1">
              {homepage && (
                <Button asChild variant="secondary">
                  <a href={homepage} rel="noopener noreferrer" target="_blank">
                    <div>
                      Visit{' '}
                      {location.pathname.startsWith('/movie-details/')
                        ? 'Movie'
                        : 'Show'}{' '}
                      Homepage
                    </div>
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaOverview;
