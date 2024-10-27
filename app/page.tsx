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

  let userData = "dray"

  





  return (
    <Box width={"100vw"} overflowX={"hidden"} fontFamily={"sans-serif"}>
      {/* Pass userData to the Homepage component */}
      <Homepage userData={userData} />
    </Box>
  );
}
