"use client";

import { useRef, useState } from "react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatJson = () => {
    setError("");
    setCopied(false);

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      setOutput("");
      setError(getJsonError(err));
    }
  };

  const minifyJson = () => {
    setError("");
    setCopied(false);

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setOutput("");
      setError(getJsonError(err));
    }
  };

  const validateJson = () => {
    setError("");
    setOutput("");
    setCopied(false);

    try {
      JSON.parse(input);
      setOutput("✓ Valid JSON");
    } catch (err) {
      setError(getJsonError(err));
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

  const downloadJson = () => {
    if (!output || output === "✓ Valid JSON") return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "formatted.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    const example = {
      name: "Dev",
      profession: "Cloud Engineer",
      skills: ["Azure", "AWS", "Linux"],
      experience: 5,
    };

    setInput(JSON.stringify(example, null, 2));
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

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Please select a .json file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target?.result;

      if (typeof contents === "string") {
        setInput(contents);
        setOutput("");
        setError("");
        setCopied(false);
      }
    };

    reader.onerror = () => {
      setError("Unable to read the selected file.");
    };

    reader.readAsText(file);

    event.target.value = "";
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
            JSON Formatter & Validator
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            Format, validate and minify JSON instantly in your browser.
            Your JSON is processed locally and is not uploaded to our
            server.
          </p>
        </div>

        {/* Utility buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={loadExample}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Load Example
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Upload JSON
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Editors */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">JSON Input</h2>

              <span className="text-sm text-slate-500">
                {input.length.toLocaleString()} characters
              </span>
            </div>

            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
                setCopied(false);
              }}
              placeholder={`Paste your JSON here...

Example:
{
  "name": "John",
  "age": 30
}`}
              className="h-[420px] w-full resize-none rounded-xl border border-slate-700 bg-slate-900 p-5 font-mono text-sm text-slate-200 outline-none transition focus:border-blue-500"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Result</h2>

              <div className="flex gap-2">
                <button
                  onClick={copyOutput}
                  disabled={!output}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>

                <button
                  onClick={downloadJson}
                  disabled={!output || output === "✓ Valid JSON"}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Download
                </button>
              </div>
            </div>

            <div className="h-[420px] overflow-auto rounded-xl border border-slate-700 bg-slate-900 p-5">
              {error ? (
                <div>
                  <p className="font-mono text-sm font-medium text-red-400">
                    ✕ Invalid JSON
                  </p>

                  <p className="mt-3 whitespace-pre-wrap font-mono text-sm leading-6 text-red-300/80">
                    {error}
                  </p>
                </div>
              ) : output ? (
                <pre
                  className={`whitespace-pre-wrap font-mono text-sm ${
                    output === "✓ Valid JSON"
                      ? "text-green-400"
                      : "text-slate-200"
                  }`}
                >
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
            onClick={formatJson}
            disabled={!input.trim()}
            className="rounded-lg bg-blue-500 px-5 py-2.5 font-semibold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Format
          </button>

          <button
            onClick={minifyJson}
            disabled={!input.trim()}
            className="rounded-lg border border-slate-700 px-5 py-2.5 font-semibold transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Minify
          </button>

          <button
            onClick={validateJson}
            disabled={!input.trim()}
            className="rounded-lg border border-slate-700 px-5 py-2.5 font-semibold transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Validate
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
                Your JSON stays in your browser
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                This tool processes JSON locally in your browser. Your
                JSON data is not uploaded to our server.
              </p>
            </div>
          </div>
        </div>

        {/* SEO content */}
        <article className="mt-16 border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-bold">
            Free Online JSON Formatter
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            JSON Formatter is a free online developer tool that helps
            you format, validate and minify JavaScript Object Notation
            (JSON). It is useful when working with APIs, configuration
            files, application data and debugging.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            What can you do with this JSON tool?
          </h3>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">
            <li>Format and pretty-print JSON.</li>
            <li>Validate JSON syntax.</li>
            <li>Minify JSON to reduce its size.</li>
            <li>Copy formatted JSON to your clipboard.</li>
            <li>Download formatted JSON as a file.</li>
            <li>Upload an existing JSON file.</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold">
            Is my JSON data private?
          </h3>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Yes. JSON processing is performed directly inside your
            browser. This version of the tool does not send your JSON
            content to a server.
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

/**
 * Converts the browser's JSON parsing error into
 * a more useful message for the user.
 */
function getJsonError(error: unknown): string {
  if (!(error instanceof Error)) {
    return "The JSON could not be parsed.";
  }

  const message = error.message;

  const positionMatch = message.match(
    /position\s+(\d+)/i
  );

  if (!positionMatch) {
    return message;
  }

  const position = Number(positionMatch[1]);

  return `${message}\n\nError position: character ${position}.`;
}