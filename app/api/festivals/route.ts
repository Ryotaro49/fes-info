import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, startDate, endDate, artists, url }: Festival =
      await req.json();

    // 入力データのバリデーション
    if (!name || !startDate || !endDate || !artists) {
      return NextResponse.json(
        { error: "必須フィールドが不足しています" },
        { status: 400 }
      );
    }

    const artistsString = Array.isArray(artists) ? artists.join(", ") : artists;

    // データベースに保存
    const newFestival = await prisma.festival.create({
      data: {
        name,
        startDate,
        endDate,
        artists: artistsString,
        url,
      },
    });

    return NextResponse.json([newFestival], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "api 側でフェス情報の保存に失敗しました" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const festivals = await prisma.festival.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        artists: true,
        url: true,
      },
    });

    return NextResponse.json(festivals, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "データ取得に失敗しました" },
      { status: 500 }
    );
  }
}

type Festival = {
  name: string;
  startDate: string; // Date型ではなくstring型に変更
  endDate: string; // Date型ではなくstring型に変更
  artists: string;
  url?: string | null;
};
