"use client";

import ThemeToggle from "@/contexts/ThemeToggle";

export default function ThemeToggleWrapper() {
  return (
    <header className="flex justify-end p-4">
      <ThemeToggle />
    </header>
  );
}
