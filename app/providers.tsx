"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { LoadContext } from "./context/LoadContext";
import LoadingScreen from "./components/LoadingScreen";

const HOME_PRELOAD_IMAGES = [
  "/projectimages/rahma/view-09.png",
  "/projectimages/amanat/front-side-view-01.jpg",
  "/projectimages/rahma/view-02.jpg",
  "/projectimages/amanat/eye-level-view-01.jpg",
  "/projectimages/rahma/view-01.jpg",
];

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isLoaded, setIsLoaded] = useState(!isHomePage);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <LoadContext.Provider value={{ isLoaded }}>
      {isHomePage && !isLoaded && (
        <LoadingScreen
          imagesToPreload={HOME_PRELOAD_IMAGES}
          onComplete={() => setIsLoaded(true)}
          minimumDuration={1800}
        />
      )}
      {children}
    </LoadContext.Provider>
  );
}
