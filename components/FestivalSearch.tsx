"use client";

import { useState } from "react";
import { useFestival } from "../context/FestivalContext";
import { Input, Button, List, Typography } from "antd";

const { Title, Text, Link } = Typography;

export default function FestivalSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const { state } = useFestival();

  const filteredFestivals = state.festivals.filter(
    (festival: { name: string }) =>
      festival.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Title level={2}>フェス検索</Title>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="フェス名を入力"
        />
        <Button onClick={() => setSearchTerm("")}>クリア</Button>
      </div>
      <List
        itemLayout="vertical"
        dataSource={filteredFestivals}
        renderItem={(festival) => (
          <List.Item>
            <Title level={4}>{festival.name}</Title>
            <Text>
              日付: {festival.startDate} ~ {festival.endDate}
            </Text>
            <br />
            <Text>アーティスト: {festival.artists.join(", ")}</Text>
            <br />
            <Link href={festival.url} target="_blank">
              詳細を見る
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
