"use client";

import { useFestival } from "../context/FestivalContext";
import { Calendar, Badge, Typography } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { Title } = Typography;

export default function FestivalCalendar() {
  const { state } = useFestival();

  const getListData = (value: Dayjs) => {
    // valueがstartDateとendDateの間に含まれるフェスティバルをフィルタリング
    return state.festivals.filter((festival) => {
      const start = dayjs(festival.startDate);
      const end = dayjs(festival.endDate);
      return value.isBetween(start, end, "day", "[]"); // '[]' はstartDateとendDateを含む意味
    });
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status="success" text={item.name} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Title level={2}>フェスカレンダー</Title>
      <Calendar cellRender={dateCellRender} />
    </div>
  );
}
