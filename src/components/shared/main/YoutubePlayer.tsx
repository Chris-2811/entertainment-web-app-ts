import { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';

function YoutubePlayer({ link, setShowPlayer, showPlayer }) {
  const videoId = link.split('=')[1]; // Extract video ID from link
  const backgroundRef = useRef(null);
  const playerRef = useRef(null);
  const [playerSize, setPlayerSize] = useState({
    width: '100%',
    height:
      window.innerWidth > 1440
        ? '600'
        : window.innerWidth <= 1440 && window.innerWidth > 1020
        ? '575'
        : window.innerWidth <= 1020 && window.innerWidth >= 450
        ? '550'
        : '525',
  });

  const opts = {
    height: playerSize.height.toString(),
    width: playerSize.width.toString(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setPlayerSize({
        width: '100%',
        height:
          window.innerWidth > 1440
            ? '600'
            : window.innerWidth <= 1440 && window.innerWidth > 1020
            ? '575'
            : window.innerWidth <= 1020 && window.innerWidth >= 450
            ? '550'
            : '525',
      });
    };

    window.addEventListener('resize', handleResize);

    function handleClickOutside(event) {
      if (playerRef.current && !playerRef.current.contains(event.target)) {
        setShowPlayer(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowPlayer]);

  function closePlayer(e) {
    if (e.target === backgroundRef.current) {
      setShowPlayer(false);
    }
  }

  return (
    showPlayer && (
      <div className=" w-full max-w-[1068px]" ref={playerRef}>
        <YouTube
          className="player rounded-lg overflow-hidden"
          videoId={videoId}
          opts={opts}
        />
      </div>
    )
  );
}

export default YoutubePlayer;
