import { IMAGE_BASE_URL } from '@/constants';
import { Link } from 'react-router-dom';
import Bookmark from './Bookmark';
import movieIcon from '@/assets/icon-category-movie.svg';
import showIcon from '@/assets/icon-category-tv.svg';
import { MdImageNotSupported } from 'react-icons/md';
import { useEffect } from 'react';

interface MediaCardProps {
  variant?: string;
  key: number;
  item: any;
}

function MediaCard({ variant = 'default', item }: MediaCardProps) {
  const className =
    variant === 'trending'
      ? 'min-w-60 h-[140px] md:w-[470px] md:h-[230px]'
      : '';
  const releaseDate =
    item.media_type === 'movie' ? item.release_date : item.first_air_date;

  let year;

  if (releaseDate) {
    year = new Date(releaseDate).getFullYear();
  } else {
    year = 'Unknown';
  }

  const genres: { [key: string]: number } = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
    'Action & Adventure': 10759,
    Kids: 10762,
    News: 10763,
    Reality: 10764,
    'Sci-Fi & Fantasy': 10765,
    Soap: 10766,
    Talk: 10767,
    'War & Politics': 10768,
  };

  useEffect(() => {
    const image = new Image();
    image.src =
      variant === 'default'
        ? `${IMAGE_BASE_URL}${item.poster_path}`
        : `${IMAGE_BASE_URL}${item.backdrop_path}`;
  }, [item, variant]);

  return (
    <div>
      <div
        className={`${className} relative rounded-lg overflow-hidden cursor-pointer group/overlay`}
      >
        <div className="absolute z-20 right-2 top-2 lg:right-6 lg:top-4">
          <Bookmark item={item} />
        </div>
        <Link
          to={`/${
            item.media_type === 'movie' ? 'movie-details' : 'show-details'
          }/${item.id}`}
          className="relative"
        >
          {!item.poster_path && !item.backdrop_path ? (
            <div
              className="bg-gray-200 relative rounded-lg"
              style={{ paddingBottom: '150%' }}
            >
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-600 font-medium">
                <div className="">
                  <MdImageNotSupported size={50} />
                </div>
                <div className="text-center  leading-none lg:leading-tight lg:text-lg">
                  <p className="mt-1 ">No Image</p>
                  <p>available</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={variant === 'default' ? { paddingBottom: '150%' } : {}}
            >
              <img
                src={
                  variant === 'default'
                    ? `${IMAGE_BASE_URL}${item.poster_path}`
                    : `${IMAGE_BASE_URL}${item.backdrop_path}`
                }
                alt="image-poster"
                className={
                  variant === 'default'
                    ? 'absolute top-0 left-0 w-full h-full object-cover'
                    : 'w-full h-full object-cover'
                }
              />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 z-10 hidden group-hover/overlay:block"></div>
        </Link>

        {variant === 'default' ? (
          <div className="text-white z-20 mt-2">
            <div className="text-white/75 flex items-center gap-2">
              <p>{year}</p>
              <p>·</p>
              <div className="flex items-center gap-1">
                {item.media_type === 'movie' ? (
                  <img src={movieIcon} alt="movie-icon" />
                ) : (
                  <img src={showIcon} alt="show-icon" />
                )}
                {item.media_type === 'movie' ? 'Movie' : 'TV'}
              </div>
              <p>·</p>
              <p>
                {item.genre_ids &&
                  item.genre_ids
                    .map((genre: number) => {
                      for (let key in genres) {
                        if (genres[key] === genre) {
                          return key;
                        }
                      }
                    })
                    .slice(0, 1)}
              </p>
            </div>
            <h3 className="mt-1 heading-sm">
              {item.media_type === 'movie' ? item.title : item.name}
            </h3>
          </div>
        ) : (
          <div className="absolute bottom-4 left-4 text-white z-20">
            <div className="text-white/75 flex items-center gap-2">
              <p>{year}</p>
              <p>·</p>
              <div>{item.media_type === 'movie' ? 'Movie' : 'TV'}</div>
              <p>·</p>
            </div>
            <h3 className="mt-1 heading-md">
              {item.media_type === 'movie' ? item.title : item.name}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaCard;
