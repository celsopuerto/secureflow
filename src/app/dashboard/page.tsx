"use client"; // Ensure the component only runs on the client side

import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import { auth } from '@/app/firebase/config'; // Ensure correct Firebase config import
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, loading } = useAuth(); // Access the user state from Firebase Auth
  const router = useRouter();

  useEffect(() => {
    // This code runs only on the client side after the component mounts
    if (!loading && !user) {
      toast.success('Logout successfully'); // Show success message if user is not logged in
      router.push('/sign-in'); // Redirect to the sign-in page if not authenticated
    }

    // Check for Firebase initialization on the client side
    if (typeof window !== 'undefined' && !auth) {
      console.error("Firebase Auth not initialized correctly");
    }
  }, [loading, user, router]);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out'); // Show error if logout fails
    }
  }

  // Show a loading message while authentication is in progress
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render dashboard content when user is authenticated
  return (
    <div>
      <h1>Welcome, {user?.email || 'User'}!</h1>
      {/* Dashboard content */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
