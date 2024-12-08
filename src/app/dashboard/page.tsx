"use client"; // Ensure the component only runs on the client side

import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

// Dynamically import Firebase to ensure it's only initialized on the client-side
const Dashboard = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const { user, loading } = useAuth(); // Access the user state from Firebase Auth
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This will run only in the browser
      import('@/app/firebase/config').then(() => {
        setFirebaseInitialized(true); // Set initialized state once Firebase is loaded
      }).catch((error) => {
        console.error("Firebase initialization failed:", error);
      });
    }
  }, []);

  useEffect(() => {
    // Redirect user to sign-in page if not authenticated and loading is complete
    if (!loading && !user) {
      toast.success('Logout successfully');
      router.push('/sign-in');
    }
  }, [loading, user, router]);

  const logout = async () => {
    if (!firebaseInitialized) return; // Prevent logout if Firebase isn't initialized yet

    const { auth } = await import('@/app/firebase/config'); // Dynamically import Firebase auth
    try {
      await auth.signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  }

  // Show a loading message while Firebase is being initialized
  if (loading || !firebaseInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.email || 'User'}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
