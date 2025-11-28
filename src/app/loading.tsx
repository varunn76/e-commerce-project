"use client";

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="
          relative 
          w-10 h-10 
          animate-spin
          rounded-full
          border-4
          border-muted
          border-t-primary
        "
      />
    </div>
  );
}
