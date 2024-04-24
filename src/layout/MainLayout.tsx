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
    <div className="lg:grid grid-cols-custom md:mt-6 lg:mt-8">
      <Header />
      <main>
        {!location.pathname.includes('/movie-details/') &&
          !location.pathname.includes('/show-details/') &&
          !location.pathname.includes('/profile') && <Searchbar />}
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
