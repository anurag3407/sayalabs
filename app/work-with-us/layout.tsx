import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work With Us — SAYA LABS",
  description:
    "Four ways to forge with SAYA LABS: Enterprise full-agency builds, Freelance sprints, the Catalyst partnership tier for early-stage founders, and Subscription maintenance.",
};

export default function WorkWithUsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
