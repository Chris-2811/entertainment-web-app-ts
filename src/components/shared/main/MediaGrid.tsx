import * as React from 'react';
import { useLocation } from 'react-router-dom';

interface MediaGridProps {
  title: string;
  children: React.ReactNode;
  marginBottom?: string;
}

const MediaGrid = ({
  title,
  children,
  marginBottom = 'mb-[3.5rem]',
}: MediaGridProps) => {
  const location = useLocation();

  return (
    <div
      className={`container ${marginBottom} xl:px-9 4xl:px-14 ${
        location.pathname !== '/' ? 'mt-4 md:mt-[1.625rem]' : ''
      }`}
    >
      <h1 className="heading-lg">{title}</h1>
      <div className="grid mt-6 lg:mt-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-[1.875rem] md:gap-y-6 lg:gap-x-10 lg:gap-y-8 4xl:grid-cols-6 5xl:grid-cols-8">
        {children}
      </div>
    </div>
  );
};

export default MediaGrid;