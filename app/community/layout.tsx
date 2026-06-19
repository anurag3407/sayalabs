import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Saya Commons — Open Source by SAYA LABS",
  description:
    "The Saya Commons is SAYA LABS' open-source wing — design tools, web frameworks and experiments, built in the open and given to everyone, free and MIT-licensed.",
};

export default function CommunityLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
