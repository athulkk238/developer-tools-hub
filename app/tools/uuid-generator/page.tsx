"use client";

import { useState } from "react";

const UUID_OPTIONS = [1, 5, 10, 20];

export default function UUIDGeneratorPage() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateUUIDs = () => {
    const generated = Array.from(
      { length: count },
      () => crypto.randomUUID()
    );

    setUuids(generated);
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  const copyUUID = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch {
      // Clipboard access may be unavailable in some browsers.
    }
  };

  const copyAll = async () => {
    if (uuids.length === 0) return;

    try {
      await navigator.clipboard.writeText(uuids.join("\n"));

      setCopiedAll(true);

      setTimeout(() => {
        setCopiedAll(false);
      }, 2000);
    } catch {
      // Clipboard access may be unavailable in some browsers.
    }
  };

  const clearAll = () => {
    setUuids([]);
    setCopiedIndex(null);
    setCopiedAll(false);
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
      <section className="mx-auto max-w-4xl px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            Developer Tool
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            UUID Generator
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            Generate random UUID version 4 identifiers instantly in
            your browser. No registration or server-side processing
            required.
          </p>
        </div>

        {/* Generator controls */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <label
                htmlFor="uuid-count"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Number of UUIDs
              </label>

              <select
                id="uuid-count"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              >
                {UUID_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateUUIDs}
              className="rounded-lg bg-blue-500 px-6 py-2.5 font-semibold transition hover:bg-blue-600"
            >
              Generate UUID
            </button>
          </div>
        </div>

        {/* Results */}
        {uuids.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold">
                  Generated UUIDs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {uuids.length} UUID
                  {uuids.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyAll}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800"
                >
                  {copiedAll ? "Copied ✓" : "Copy All"}
                </button>

                <button
                  onClick={clearAll}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {uuids.map((uuid, index) => (
                <div
                  key={uuid}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
                >
                  <code className="min-w-0 flex-1 break-all font-mono text-sm text-slate-200">
                    {uuid}
                  </code>

                  <button
                    onClick={() => copyUUID(uuid, index)}
                    className="shrink-0 rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800"
                  >
                    {copiedIndex === index ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy */}
        <div className="mt-10 rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <div className="flex gap-3">
            <span className="text-green-400">🔒</span>

            <div>
              <h3 className="font-semibold text-green-400">
                Generated locally
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                UUIDs are generated directly in your browser using the
                browser&apos;s cryptographic random UUID functionality.
                Nothing is sent to our server.
              </p>
            </div>
          </div>
        </div>

        {/* SEO content */}
        <article className="mt-16 border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-bold">
            Free Online UUID Generator
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            A UUID, or Universally Unique Identifier, is commonly used
            to identify records, objects, transactions and resources
            in software applications.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            What is UUID version 4?
          </h3>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            UUID version 4 identifiers are generated using randomly
            generated values. They are commonly used when an
            application needs identifiers without relying on a
            centralized sequence.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            What can you use a UUID for?
          </h3>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">
            <li>Database record identifiers.</li>
            <li>API request identifiers.</li>
            <li>Application objects.</li>
            <li>Distributed systems.</li>
            <li>Testing and development.</li>
          </ul>
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