import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/log-in');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  } else {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
