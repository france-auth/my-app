/* // components/BackButtonHandler.tsx
"use client"

import { useEffect } from "react";
import { useRouter } from "next/router";
import WebApp from "@twa-dev/sdk";

const BackButtonHandler = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router) return; // Exit if router is not available

    WebApp.expand();
    const backButton = WebApp.BackButton;

    backButton.onClick(() => {
      router.back(); // Use Next.js router to navigate back
    });

    return () => {
      backButton.hide();
    };
  }, [router]);

  return null; // Nothing to render
};

export default BackButtonHandler;
 */