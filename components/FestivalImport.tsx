"use client";

import { useState } from "react";
import { Input, Button, Typography, Form } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

export default function FestivalImport() {
  const [url, setUrl] = useState("");
  const [festivalName, setFestivalName] = useState("");
  const [festivalStartDate, setFestivalStartDate] = useState("");
  const [festivalEndDate, setFestivalEndDate] = useState("");
  const [artists, setArtists] = useState("");

  const handleImport = async () => {
    try {
      if (!url) {
        alert("URLを入力してください");
        return;
      }

      const response = await fetch("/api/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "情報の取得に失敗しました");
      }

      const importedArtists = result.titles || [];

      if (importedArtists.length === 0) {
        alert("アーティスト情報が見つかりませんでした");
        return;
      }

      setArtists(importedArtists.join("\n"));
      alert("アーティスト情報を取得しました");
    } catch (error) {
      console.error(error);
      alert("アーティスト情報の取得に失敗しました");
    }
  };

  const handleSave = async () => {
    try {
      if (!festivalName || !festivalStartDate || !festivalEndDate || !artists) {
        alert("すべてのフィールドを入力してください");
        return;
      }

      const newFestival = {
        name: festivalName,
        startDate: festivalStartDate,
        endDate: festivalEndDate,
        artists: artists.split("\n").filter((artist) => artist.trim() !== ""),
        url,
      };

      const response = await fetch("/api/festivals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFestival),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "フェス情報の保存に失敗しました");
      }

      setUrl("");
      setFestivalName("");
      setFestivalStartDate("");
      setFestivalEndDate("");
      setArtists("");
      alert("フェス情報を保存しました");
    } catch (error) {
      console.error(error);
      alert("フェス情報の保存に失敗しました");
    }
  };

  return (
    <div>
      <Title level={2}>フェス取り込み</Title>
      <Form layout="vertical">
        <Form.Item
          label="フェスのURL"
          rules={[{ required: true, message: "URLを入力してください" }]}
        >
          <Input
            placeholder="https://www.example.fes/artist"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleImport}>アーティスト情報を取得</Button>
        </Form.Item>
        <Form.Item
          label="フェス名"
          rules={[{ required: true, message: "フェス名を入力してください" }]}
        >
          <Input
            value={festivalName}
            onChange={(e) => setFestivalName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="開催開始日"
          rules={[{ required: true, message: "開催開始日を入力してください" }]}
        >
          <Input
            type="date"
            value={festivalStartDate}
            onChange={(e) => setFestivalStartDate(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="開催終了日"
          rules={[{ required: true, message: "開催終了日を入力してください" }]}
        >
          <Input
            type="date"
            value={festivalEndDate}
            onChange={(e) => setFestivalEndDate(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="アーティスト一覧"
          rules={[
            { required: true, message: "アーティスト一覧を入力してください" },
          ]}
        >
          <TextArea
            rows={10}
            value={artists}
            onChange={(e) => setArtists(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
