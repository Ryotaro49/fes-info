"use client";

import { useState } from "react";
import { Input, Card, message } from "antd";

const { Search } = Input;

export default function HomePage() {
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFestivalInfo = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      console.log(data);

      if (data.error) {
        message.error(data.error);
        setInfo(null);
      } else {
        setInfo(data.titles.join("\n"));
      }
    } catch (error) {
      message.error(`情報を取得できませんでした: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}
    >
      <h1>ロックフェス情報購読サイト</h1>
      <Search
        placeholder="URLを入力してください"
        enterButton="情報を取得"
        size="large"
        onSearch={fetchFestivalInfo}
        loading={loading}
        style={{ marginBottom: "20px" }}
      />
      {info && (
        <Card title="フェス情報" style={{ marginTop: "20px" }}>
          <pre>{info}</pre>
        </Card>
      )}
    </div>
  );
}
