import "./globals.css";
import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import jaJP from "antd/locale/ja_JP";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "フェスティバルファインダー",
  description: "お気に入りのアーティストが出演するフェスを見つけよう",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ConfigProvider locale={jaJP}>{children}</ConfigProvider>
      </body>
    </html>
  );
}
