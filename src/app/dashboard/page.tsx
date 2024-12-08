"use client"; // Add this directive to this page component

import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import { auth } from '@/app/firebase/config';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, loading } = useAuth(); // Access the user state from Firebase Auth
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast.success('Logout successfully'); // Show success message if user is not logged in
      router.push('/sign-in'); // Redirect to the sign-in page if not authenticated
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

  // Now you can safely access user properties
  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking authentication
  }

  return (
    <div>
      <h1>Welcome, {user?.email || 'User'}!</h1> {/* Display user's name or fallback */}
      {/* Dashboard content */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
