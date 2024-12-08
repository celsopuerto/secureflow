"use client"

import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();
    const signOutUser = async () => {
        try {
            return auth.signOut();
        } catch (error) {
            
        }
    }

    return router.push('/sign-in')
}