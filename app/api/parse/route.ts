import { NextResponse } from "next/server";
import axios from "axios";
import { load } from "cheerio";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URLが無効です" }, { status: 400 });
    }

    const { data } = await axios.get(url);
    const $ = load(data);

    // フェス情報の抽出
    const titles: string[] = [];
    $("li img[title]").each((_, el) => {
      const title = $(el).attr("title");
      if (title) {
        titles.push(title);
      }
    });

    return NextResponse.json({ titles });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "情報を取得できませんでした" },
      { status: 500 }
    );
  }
}
