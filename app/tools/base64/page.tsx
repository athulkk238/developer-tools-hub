"use client";

import { useState } from "react";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const encodeBase64 = (text: string) => {
    const bytes = new TextEncoder().encode(text);

    let binary = "";

    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    return btoa(binary);
  };

  const decodeBase64 = (base64: string) => {
    const binary = atob(base64);

    const bytes = Uint8Array.from(binary, (char) =>
      char.charCodeAt(0)
    );

    return new TextDecoder().decode(bytes);
  };

  const processData = () => {
    setError("");
    setOutput("");
    setCopied(false);

    if (!input.trim()) {
      setError("Please enter some text.");
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(encodeBase64(input));
      } else {
        setOutput(decodeBase64(input.trim()));
      }
    } catch {
      setError(
        "Invalid Base64 input. Please check the value and try again."
      );
    }
  };

  const copyOutput = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the result.");
    }
  };

  const loadExample = () => {
    if (mode === "encode") {
      setInput("Hello from DevToolsHub!");
    } else {
      setInput("SGVsbG8gZnJvbSBEZXZUb29sc0h1YiE=");
    }

    setOutput("");
    setError("");
    setCopied(false);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  const switchMode = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold">
            DevTools<span className="text-blue-400">Hub</span>
          </a>

          <a
            href="/"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← All Tools
          </a>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            Developer Tool
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Base64 Encoder & Decoder
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            Encode text into Base64 or decode Base64 data back into
            readable text directly in your browser.
          </p>
        </div>

        {/* Mode selector */}
        <div className="mb-6 flex rounded-lg border border-slate-800 bg-slate-900 p-1 sm:w-fit">
          <button
            onClick={() => switchMode("encode")}
            className={`rounded-md px-5 py-2 text-sm font-medium transition ${
              mode === "encode"
                ? "bg-blue-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Encode
          </button>

          <button
            onClick={() => switchMode("decode")}
            className={`rounded-md px-5 py-2 text-sm font-medium transition ${
              mode === "decode"
                ? "bg-blue-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Decode
          </button>
        </div>

        {/* Utility buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={loadExample}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Load Example
          </button>
        </div>

        {/* Editor */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">
                {mode === "encode"
                  ? "Text Input"
                  : "Base64 Input"}
              </h2>

              <span className="text-sm text-slate-500">
                {input.length.toLocaleString()} characters
              </span>
            </div>

            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setOutput("");
                setError("");
                setCopied(false);
              }}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 text to decode..."
              }
              className="h-[400px] w-full resize-none rounded-xl border border-slate-700 bg-slate-900 p-5 font-mono text-sm text-slate-200 outline-none transition focus:border-blue-500"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">
                {mode === "encode"
                  ? "Base64 Output"
                  : "Decoded Text"}
              </h2>

              <button
                onClick={copyOutput}
                disabled={!output}
                className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            <div className="h-[400px] overflow-auto rounded-xl border border-slate-700 bg-slate-900 p-5">
              {error ? (
                <p className="font-mono text-sm text-red-400">
                  ✕ {error}
                </p>
              ) : output ? (
                <pre className="whitespace-pre-wrap break-all font-mono text-sm leading-6 text-slate-200">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-slate-600">
                  Your result will appear here.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={processData}
            disabled={!input.trim()}
            className="rounded-lg bg-blue-500 px-5 py-2.5 font-semibold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </button>

          <button
            onClick={clearAll}
            className="rounded-lg border border-slate-700 px-5 py-2.5 font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            Clear
          </button>
        </div>

        {/* Privacy */}
        <div className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <div className="flex gap-3">
            <span className="text-green-400">🔒</span>

            <div>
              <h3 className="font-semibold text-green-400">
                Processed in your browser
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Your input is processed locally in your browser and is
                not uploaded to our server.
              </p>
            </div>
          </div>
        </div>

        {/* SEO content */}
        <article className="mt-16 border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-bold">
            Free Online Base64 Encoder & Decoder
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Base64 is an encoding method commonly used to represent
            binary data as text. Developers frequently encounter Base64
            when working with APIs, authentication data, configuration
            files and web applications.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            What can this tool do?
          </h3>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">
            <li>Encode normal text into Base64.</li>
            <li>Decode Base64 into readable text.</li>
            <li>Process data directly in your browser.</li>
            <li>Copy the result with one click.</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold">
            Is Base64 encryption?
          </h3>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            No. Base64 is an encoding method, not encryption. Base64
            encoded data can be decoded without a secret key.
          </p>
        </article>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} DevToolsHub. All rights reserved.
        </div>
      </footer>
    </main>
  );
}