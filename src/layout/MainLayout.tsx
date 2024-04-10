import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <div className="text-white">Hello this is the mainlayout</div>
      {children}
    </div>
  );
}

export default MainLayout;
