"use client";

import { Tabs } from "antd";
import ArtistSearch from "../components/ArtistSearch";
import FestivalSearch from "../components/FestivalSearch";
import FestivalCalendar from "../components/FestivalCalendar";
import FestivalImport from "../components/FestivalImport";
import { FestivalProvider } from "../context/FestivalContext";

export default function Home() {
  const items = [
    { key: "1", label: "アーティスト検索", children: <ArtistSearch /> },
    // { key: "2", label: "フェス検索", children: <FestivalSearch /> },
    // { key: "3", label: "フェスカレンダー", children: <FestivalCalendar /> },
    { key: "4", label: "フェス取り込み", children: <FestivalImport /> },
  ];

  return (
    <FestivalProvider>
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          フェスインフォ！
        </h1>
        <Tabs defaultActiveKey="1" items={items} />
      </main>
    </FestivalProvider>
  );
}
