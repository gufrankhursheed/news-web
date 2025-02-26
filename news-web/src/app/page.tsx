"use client";

import { useState } from "react";
import TopHeadline from "./components/TopHeadline";

export default function Home() {
  const [category, setCategory] = useState("general");

  return (
    <div className="mx-5">
      <div className="my-4">
        {["general","business", "technology", "sports", "entertainment"].map((cat) => (
          <button
            key={cat}
            className="mx-2 font-bold inline-flex items-center justify-center gap-1.5 rounded border border-black bg-black px-3 py-2 text-white text-lg transition hover:border-gray-800 hover:bg-gray-800 focus:outline-none focus:ring"
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <TopHeadline category={category} />
    </div>
  );
}
