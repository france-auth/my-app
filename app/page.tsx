// app/page.tsx
"use client"

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import Homepage from "@/components/Homepage";
import Loading from "@/components/Loading";

// Define the UserData interface according to your requirements


export default function Home() {
 const [user, setUser] = useState<any>(null);
 const [error, setError] = useState<string | null>(null);

 const telegramInitData =
   "query_id=AAElBO5_AAAAACUE7n8MOa_y&user=%7B%22id%22%3A2146305061%2C%22first_name%22%3A%22Crypto%22%2C%22last_name%22%3A%22Dray%22%2C%22username%22%3A%22Habibilord%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1729828440&hash=a21590e0fe10c68048781c3b3e22e8ecde0a8b8b163bf4c7a58e5c48855e584e";

 useEffect(() => {
   if (telegramInitData) {
     fetch("/api/auth", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ initData: telegramInitData }),
     })
       .then((res) => {
         if (!res.ok) {
           throw new Error("Failed to fetch user data");
         }
         return res.json();
       })
       .then((data) => {
         if (data.error) {
           setError(data.error);
         } else {
           console.log("User data:", data);
           setUser(data.user);
         }
       })
       .catch((err) => {
         console.error(err);
         setError("Failed to fetch user data");
       });
   } else {
     setError("No user data available");
   }
 }, []);

 if(!user){
  return <Loading />
 }

  return (
    <Box width={"100vw"} overflowX={"hidden"} fontFamily={"sans-serif"}>
      {/* Pass userData to the Homepage component */}
      <Homepage userData={user} />
    </Box>
  );
}
