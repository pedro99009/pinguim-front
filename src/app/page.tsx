"use client";

import { DivisionCard } from "./components/division-card";
import Header from "./components/Header";


const DIVISIONS = [
  "Atlantic",
  "Central",
  "Northwest",
  "Pacific",
  "Southeast",
  "Southwest",
];

export default function HomePage() {
  return (
    <>
    <Header />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {DIVISIONS.map((div) => (
        <DivisionCard key={div} division={div} />
      ))}
    </div>
    </>
  );
}
