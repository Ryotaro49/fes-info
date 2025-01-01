import { createContext, useContext, useEffect, useState } from "react";

const FestivalContext = createContext({ state: { festivals: [] } });

export const useFestival = () => useContext(FestivalContext);

import { ReactNode } from "react";

export const FestivalProvider = ({ children }: { children: ReactNode }) => {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await fetch("/api/festivals");
        const data = await response.json();
        setFestivals(data);
      } catch (error) {
        console.error("フェスティバル情報の取得に失敗しました:", error);
      }
    };

    fetchFestivals();
  }, []);

  return (
    <FestivalContext.Provider value={{ state: { festivals } }}>
      {children}
    </FestivalContext.Provider>
  );
};
