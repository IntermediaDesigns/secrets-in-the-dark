'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../../lib/auth';

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          router.push('/game'); // Redirect to game page if authenticated
        } else {
          router.push('/login'); // Redirect to login page if not authenticated
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        router.push('/login'); // Redirect to login page on error
      }
    };

    checkAuth();
  }, []);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;