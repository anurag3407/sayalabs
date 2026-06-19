"use client";

import { useState } from "react";

export default function CopyableCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div style={{ position: "relative", marginBottom: "16px", width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-medium)", background: "#0d0d0f", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
      {/* Terminal Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }} />
        </div>
        
        <button
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          style={{
            background: "transparent",
            border: "none",
            color: copied ? "var(--emerald)" : "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "0"
          }}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <pre
        style={{
          display: "block",
          padding: "16px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--ivory)",
          overflowX: "auto",
          whiteSpace: "pre",
          margin: 0,
          lineHeight: "1.6"
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
