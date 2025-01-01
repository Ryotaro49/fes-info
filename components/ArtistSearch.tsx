"use client";

import { useState, useEffect } from "react";
import { Input, Button, List, Typography } from "antd";

// 型定義
type Festival = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  artists: string;
  url?: string;
};

const { Title, Text, Link } = Typography;

export default function ArtistSearch() {
  const [searchTerm, setSearchTerm] = useState<string>(""); // 検索ワード
  const [festivals, setFestivals] = useState<Festival[]>([]); // フェスティバル情報の保存
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態
  const [error, setError] = useState<string>(""); // エラーメッセージ

  // フェスティバル情報をAPIから取得
  useEffect(() => {
    const fetchFestivals = async () => {
      setLoading(true);
      setError(""); // エラーメッセージを初期化

      try {
        const response = await fetch("/api/festivals"); // APIからフェスティバル情報を取得
        if (!response.ok) {
          throw new Error("データ取得に失敗しました");
        }

        const data = await response.json();
        setFestivals(data); // フェスティバル情報を状態に保存
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "エラーが発生しました"
        );
      } finally {
        setLoading(false); // ローディング状態を解除
      }
    };

    fetchFestivals(); // コンポーネントのマウント時にフェスティバル情報を取得
  }, []); // 空の依存配列で一度だけ実行

  // アーティスト名でフェスティバルをフィルタリング
  const filteredFestivals = festivals.filter((festival: Festival) =>
    festival.artists.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Title level={2}>アーティスト検索</Title>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="アーティスト名を入力"
        />
        <Button onClick={() => setSearchTerm("")}>クリア</Button>
      </div>

      {/* エラーメッセージ */}
      {error && <Text type="danger">{error}</Text>}

      {/* ローディング中 */}
      {loading ? (
        <Text>読み込み中...</Text>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={filteredFestivals}
          renderItem={(festival: Festival) => (
            <List.Item key={festival.id}>
              <Title level={4}>{festival.name}</Title>
              <Text>
                日付: {new Date(festival.startDate).toLocaleDateString()} ~{" "}
                {new Date(festival.endDate).toLocaleDateString()}
              </Text>
              <br />
              <Text>アーティスト: {festival.artists}</Text>
              <br />
              {festival.url && (
                <Link href={festival.url} target="_blank">
                  詳細を見る
                </Link>
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
