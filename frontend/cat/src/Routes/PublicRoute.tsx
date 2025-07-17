// Routes/PublicOnlyRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/getuser`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setIsAuthenticated(res.ok && data.user);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicOnlyRoute;
