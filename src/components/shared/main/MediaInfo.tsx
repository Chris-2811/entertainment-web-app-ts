import { formatMoney } from '@/lib/utils';

type MediaInfoProps = {
  item: any;
};

function MediaInfo({ item }: MediaInfoProps) {
  const { budget, revenue, runtime, status, production_companies } = item;

  const { number_of_seasons, number_of_episodes } = item;

  return (
    <div className="mt-8">
      {item.media_type === 'movie' ? (
        <>
          <h2 className="heading-lg font-medium text-center lg:text-left">
            Movie Info
          </h2>
          <ul className="mt-6 space-y-5 pb-[2.25rem] max-w-[940px]">
            <li className="flex items-center border-b-2 border-greyish-blue/50 pb-5">
              <p className="text-red font-medium mr-2">Budget:</p>
              <p>{formatMoney(budget)}</p>
            </li>
            <li className="flex items-center border-b-2 border-greyish-blue/50 pb-5">
              <p className="text-red font-medium mr-2">Revenue:</p>
              <p>{formatMoney(revenue)}</p>
            </li>
            <li className="flex items-center border-b-2 border-greyish-blue/50 pb-5">
              <p className="text-red font-medium mr-2">Runtime:</p>
              <p>{runtime} minutes</p>
            </li>
            <li className="flex items-center border-b-2 border-greyish-blue/50 pb-5">
              <p className="text-red font-medium mr-2">Status:</p>
              <p>{status}</p>
            </li>
          </ul>
          <div className="hidden md:flex items-center gap-5  ">
            <p>Production Companies:</p>
            <div className="flex items-center gap-2 flex-wrap">
              {production_companies.map((item: any, index: number) => (
                <span className="">
                  {item.name}
                  {production_companies.length >= 1 &&
                    index !== production_companies.length - 1 &&
                    ','}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h2 className="heading-lg font-medium text-center lg:text-left uppercase">
            TV-series Info
          </h2>

          <ul className="mt-6 space-y-5 pb-[2.25rem] max-w-[940px]">
            <li className="flex items-center border-b-2 border-greyish-blue/50 pb-5">
              <p className="text-red font-medium mr-2">Number of Seasons:</p>
              <p>{number_of_seasons}</p>
            </li>
            <li className="flex items-center border-b-2 border-greyish-blue/50 pb-5">
              <p className="text-red font-medium mr-2">Number of Episodes:</p>
              <p>{number_of_episodes}</p>
            </li>
            <li className="flex items-center border-b-2 border-greyish-blue/50 pb-5">
              <p className="text-red font-medium mr-2">Status:</p>
              <p>{status} </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MediaInfo;
