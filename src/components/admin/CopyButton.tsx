"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-gray-500 hover:text-black transition"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};

export default CopyButton;
