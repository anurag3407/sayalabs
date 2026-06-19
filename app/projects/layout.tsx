import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — SAYA LABS",
  description:
    "Selected work from SAYA LABS — a deliberately small roster of brands, products and digital experiences forged with precision and craft.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
