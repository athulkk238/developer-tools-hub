"use client";

import { useState } from "react";

type Mode = "timestamp-to-date" | "date-to-timestamp";
type Unit = "seconds" | "milliseconds";

export default function TimestampPage() {
  const [mode, setMode] = useState<Mode>("timestamp-to-date");
  const [unit, setUnit] = useState<Unit>("seconds");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    setOutput("");
    setCopied(false);

    if (!input.trim()) {
      setError("Please enter a value.");
      return;
    }

    try {
      if (mode === "timestamp-to-date") {
        convertTimestampToDate();
      } else {
        convertDateToTimestamp();
      }
    } catch {
      setError("Unable to convert the provided value.");
    }
  };

  const convertTimestampToDate = () => {
    const value = input.trim();

    if (!/^-?\d+$/.test(value)) {
      setError("Please enter a valid Unix timestamp.");
      return;
    }

    const timestamp = Number(value);

    if (!Number.isSafeInteger(timestamp)) {
      setError("The timestamp is outside the supported range.");
      return;
    }

    const milliseconds =
      unit === "seconds" ? timestamp * 1000 : timestamp;

    const date = new Date(milliseconds);

    if (Number.isNaN(date.getTime())) {
      setError("The timestamp does not represent a valid date.");
      return;
    }

    setOutput(
      [
        `UTC: ${date.toISOString()}`,
        `Local: ${date.toLocaleString()}`,
        `ISO 8601: ${date.toISOString()}`,
      ].join("\n")
    );
  };

  const convertDateToTimestamp = () => {
    const date = new Date(input);

    if (Number.isNaN(date.getTime())) {
      setError(
        "Invalid date. Try a value such as 2026-09-29 12:30:00."
      );
      return;
    }

    const milliseconds = date.getTime();

    const timestamp =
      unit === "seconds"
        ? Math.floor(milliseconds / 1000)
        : milliseconds;

    setOutput(String(timestamp));
  };

  const useCurrentTimestamp = () => {
    const now = Date.now();

    const timestamp =
      unit === "seconds"
        ? Math.floor(now / 1000)
        : now;

    setInput(String(timestamp));
    setOutput("");
    setError("");
    setCopied(false);
  };

  const loadExample = () => {
    if (mode === "timestamp-to-date") {
      setInput(
        unit === "seconds"
          ? "1759142400"
          : "1759142400000"
      );
    } else {
      setInput("2025-09-29 00:00:00");
    }

    setOutput("");
    setError("");
    setCopied(false);
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

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  const changeUnit = (newUnit: Unit) => {
    setUnit(newUnit);
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
      <section className="mx-auto max-w-5xl px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            Developer Tool
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Unix Timestamp Converter
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            Convert Unix timestamps to readable dates and convert
            dates back to Unix timestamps. Supports seconds and
            milliseconds.
          </p>
        </div>

        {/* Mode */}
        <div className="mb-6 flex rounded-lg border border-slate-800 bg-slate-900 p-1 sm:w-fit">
          <button
            onClick={() =>
              changeMode("timestamp-to-date")
            }
            className={`rounded-md px-5 py-2 text-sm font-medium transition ${
              mode === "timestamp-to-date"
                ? "bg-blue-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Timestamp → Date
          </button>

          <button
            onClick={() =>
              changeMode("date-to-timestamp")
            }
            className={`rounded-md px-5 py-2 text-sm font-medium transition ${
              mode === "date-to-timestamp"
                ? "bg-blue-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Date → Timestamp
          </button>
        </div>

        {/* Unit */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Timestamp unit
          </label>

          <div className="flex gap-3">
            <button
              onClick={() => changeUnit("seconds")}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                unit === "seconds"
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-slate-700 text-slate-400 hover:bg-slate-800"
              }`}
            >
              Seconds
            </button>

            <button
              onClick={() => changeUnit("milliseconds")}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                unit === "milliseconds"
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-slate-700 text-slate-400 hover:bg-slate-800"
              }`}
            >
              Milliseconds
            </button>
          </div>
        </div>

        {/* Input / Output */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">
                {mode === "timestamp-to-date"
                  ? "Unix Timestamp"
                  : "Date & Time"}
              </h2>

              <span className="text-sm text-slate-500">
                {input.length} characters
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
                mode === "timestamp-to-date"
                  ? "Example: 1759142400"
                  : "Example: 2025-09-29 00:00:00"
              }
              className="h-[300px] w-full resize-none rounded-xl border border-slate-700 bg-slate-900 p-5 font-mono text-sm text-slate-200 outline-none transition focus:border-blue-500"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Result</h2>

              <button
                onClick={copyOutput}
                disabled={!output}
                className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            <div className="h-[300px] overflow-auto rounded-xl border border-slate-700 bg-slate-900 p-5">
              {error ? (
                <p className="whitespace-pre-wrap font-mono text-sm text-red-400">
                  ✕ {error}
                </p>
              ) : output ? (
                <pre className="whitespace-pre-wrap break-all font-mono text-sm leading-7 text-slate-200">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-slate-600">
                  Your converted value will appear here.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={convert}
            disabled={!input.trim()}
            className="rounded-lg bg-blue-500 px-5 py-2.5 font-semibold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Convert
          </button>

          <button
            onClick={useCurrentTimestamp}
            className="rounded-lg border border-slate-700 px-5 py-2.5 font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            Current Timestamp
          </button>

          <button
            onClick={loadExample}
            className="rounded-lg border border-slate-700 px-5 py-2.5 font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            Load Example
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
                Timestamp conversion happens directly in your browser.
                No data is uploaded to our server.
              </p>
            </div>
          </div>
        </div>

        {/* SEO content */}
        <article className="mt-16 border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-bold">
            Free Unix Timestamp Converter
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            A Unix timestamp represents a point in time as the number
            of seconds or milliseconds elapsed since January 1, 1970
            at 00:00:00 UTC, commonly known as the Unix epoch.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            What is a Unix timestamp?
          </h3>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Unix timestamps are widely used in software applications,
            APIs, databases, logs and authentication systems because
            they provide a compact numeric representation of time.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            Seconds vs milliseconds
          </h3>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Some systems represent Unix time in seconds while others
            use milliseconds. This tool lets you select the appropriate
            unit when converting timestamps.
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