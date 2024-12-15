"use client";
import React from "react";

const InfiniteBanner = ({ items = [], speed = "slow" }) => {
  // Duplicate items to ensure continuous scrolling
  const repeatCount = 10; // Ensure smooth looping by duplicating items
  const repeatedItems = Array(repeatCount).fill(items).flat();
  const keyedItems = repeatedItems.map((item, index) => ({
    content: item,
    key: `item-${index}`,
  }));

  return (
    <div className="relative w-full overflow-hidden mt-10">
      {/* Scrolling container */}
      <div
        className={`w-full inline-flex will-change-transform animate-infinite-scroll-${speed} font-thin`}
      >
        {keyedItems.map(({ content, key }) => (
          <div
            key={key}
            className="flex items-center space-x-4 px-4 shrink-0 text-red_color"
          >
            {content}
          </div>
        ))}
      </div>
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white_color to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white_color to-transparent z-10" />
    </div>
  );
};

export default InfiniteBanner;
