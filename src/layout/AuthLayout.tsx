import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <div className="text-white">This is the AuthLayout</div>
      {children}
    </div>
  );
}

export default AuthLayout;
