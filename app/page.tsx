// app/page.tsx
"use client"

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import Homepage from "@/components/Homepage";
import { useUserLogin } from "@/hooks/useAuth"; // Ensure this is the correct path
import Loading from "@/components/Loading";

// Define the UserData interface according to your requirements
interface UserData {
  user: {
    username: string;
    // Add more properties if needed
  };
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null); // Set initial state to null

  // Get referral code from URL
  const queryString = window.location.search; 
  const urlParams = new URLSearchParams(queryString);
  const referralId = urlParams.get("referralCode") || undefined; // Ensure it's either string or undefined

  // Get the initial data needed for login
  const initData = WebApp.initData;

  // Call useUserLogin at the top level of the component
  const { userData: loginData, loading } = useUserLogin(initData, referralId);

  // Update userData based on loginData from useUserLogin
  useEffect(() => {
    if (loginData) {
      setUserData(loginData);
    }
  }, [loginData]);

  // Show loading screen if data is still being fetched
  if (loading || !userData) {
    return <Loading />;
  }

  return (
    <Box width={"100vw"} overflowX={"hidden"} fontFamily={"sans-serif"}>
      {/* Pass userData to the Homepage component */}
      <Homepage userData={userData} />
    </Box>
  );
}
