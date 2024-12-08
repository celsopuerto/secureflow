"use client"; // Add this directive

import { useEffect, useState } from 'react';
import { auth } from '@/app/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Set the user data when the user is authenticated
      setLoading(false); // Set loading to false when authentication is checked
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  return { user, loading };
};

export default useAuth;
