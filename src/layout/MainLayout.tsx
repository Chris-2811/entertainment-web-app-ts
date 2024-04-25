import { ReactNode } from 'react';
import Header from '@/components/shared/main/Header';
import Searchbar from '@/components/shared/main/Searchbar';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  return (
    <div className="relative min-h-screen lg:grid grid-cols-custom md:pt-6 lg:pt-8">
      <Header />
      <main className="">
        {!location.pathname.includes('/movie-details/') &&
          !location.pathname.includes('/show-details/') &&
          !location.pathname.includes('/profile') && <Searchbar />}
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
