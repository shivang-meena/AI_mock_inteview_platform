"use client";

import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction, ReactNode } from "react";

type ThemeContextType = {
  dark: boolean;
  setdark: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setdark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dark");
    if (stored !== null) {
      setdark(stored === "true");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("dark", String(dark));
    }
  }, [dark, mounted]);

  return (
    <ThemeContext.Provider value={{ dark, setdark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}




// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext(undefined);

// export function ThemeProvider({ children }) {
//   const [dark, setdark] = useState(false); // safe default for server render
//   const [mounted, setMounted] = useState(false);

//   // Read the real value only after mounting on the client
//   useEffect(() => {
//     const stored = localStorage.getItem("dark");
//     if (stored !== null) {
//       setdark(stored === "true");
//     }
//     setMounted(true);
//   }, []);

//   // Persist changes, but skip the very first render before we've read localStorage
//   useEffect(() => {
//     if (mounted) {
//       localStorage.setItem("dark", String(dark));
//     }
//   }, [dark, mounted]);

//   return (
//     <ThemeContext.Provider value={{ dark, setdark }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// }