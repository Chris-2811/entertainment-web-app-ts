import { useEffect, useState } from 'react';
import MediaOverview from '@/components/shared/main/MediaOverview';
import MediaInfo from '@/components/shared/main/MediaInfo';
import { Button } from '@/components/ui/Button';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { API_KEY, BASE_URL } from '@/constants';

export default function ShowDetails() {
  const [show, setShow] = useState<any | undefined>();
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  useEffect(() => {
    async function fetchShow() {
      const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
      const response2 = await fetch(
        `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`
      );

      const data = await response.json();
      const data2 = await response2.json();
      const videoTrailer = data2.results.find((video: any) => {
        return video.type === 'Trailer';
      });

      if (videoTrailer !== undefined) {
        const videoKey = videoTrailer.key;

        setLink(videoKey);
      }

      console.log(videoTrailer);

      setShow(data);

      if (data) {
        setIsLoading(false);
      }
    }

    fetchShow();
  }, []);

  return isLoading ? (
    <p>isLoading....</p>
  ) : (
    <div>
      <div className="absolute top-0 left-0 w-screen h-screen">
        <img
          src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
      </div>
      <div className="relative">
        <div className="container relative z-10">
          <Button asChild variant="secondary" onClick={() => navigate(-1)}>
            <Link to="">Go Back</Link>
          </Button>
          <MediaOverview item={show} link={link} />
          <MediaInfo item={show} />
        </div>
      </div>
    </div>
  );
}