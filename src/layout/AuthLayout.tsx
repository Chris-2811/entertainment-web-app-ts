import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <div className="ml-6">
        <Button asChild variant={'secondary'}>
          <Link to="/">Go Back</Link>
        </Button>
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
