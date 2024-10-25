import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseUserLoginProps {
  userData: any;  // Replace `any` with your user data interface
  error: string | null;
  loading: boolean;
}

const baseURL = 'https://c837-105-112-67-130.ngrok-free.app/api'

// Custom Hook for handling user login
export const useUserLogin = (initData: string, referralCode?: string): UseUserLoginProps => {
  const [userData, setUserData] = useState<any>(null);  // Replace `any` with proper user data interface
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!initData) return;

    const loginUser = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseURL}/auth`, {
          initData,
          referralCode,
        });
        setUserData(response.data);
        setError(null);
      } catch (err) {
        setError('Login failed');
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  }, [initData, referralCode]);

  return { userData, error, loading };
};
