"use client";

import { useState } from "react";

type JwtPart = Record<string, unknown>;

function decodeBase64Url(value: string): string {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function decodeJwtPart(value: string): JwtPart {
  const decoded = decodeBase64Url(value);
  return JSON.parse(decoded);
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<JwtPart | null>(null);
  const [payload, setPayload] = useState<JwtPart | null>(null);
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  const decodeToken = () => {
    setError("");
    setHeader(null);
    setPayload(null);
    setSignature("");

    const trimmedToken = token.trim();

    if (!trimmedToken) {
      setError("Please enter a JWT token.");
      return;
    }

    const parts = trimmedToken.split(".");

    if (parts.length !== 3) {
      setError("Invalid JWT. A JWT should contain three parts separated by dots.");
      return;
    }

    try {
      const decodedHeader = decodeJwtPart(parts[0]);
      const decodedPayload = decodeJwtPart(parts[1]);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setSignature(parts[2]);
    } catch {
      setError("Unable to decode JWT. Please check that the token is valid.");
    }
  };

  const clearAll = () => {
    setToken("");
    setHeader(null);
    setPayload(null);
    setSignature("");
    setError("");
  };

  const loadExample = () => {
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
    setError("");
    setHeader(null);
    setPayload(null);
    setSignature("");
  };

  const formatJson = (data: JwtPart) => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <a
            href="/"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to DevToolsHub
          </a>

          <h1 className="mt-6 text-4xl font-bold">
            JWT Decoder
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Decode and inspect JSON Web Tokens directly in your browser.
            View the JWT header, payload, and signature without sending
            the token to a server.
          </p>
        </div>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <label className="mb-3 block text-sm font-medium">
            JWT Token
          </label>

          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            rows={7}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-slate-100 outline-none focus:border-blue-500"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={decodeToken}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium hover:bg-blue-500"
            >
              Decode JWT
            </button>

            <button
              onClick={loadExample}
              className="rounded-lg bg-slate-700 px-5 py-2.5 font-medium hover:bg-slate-600"
            >
              Load Example
            </button>

            <button
              onClick={clearAll}
              className="rounded-lg bg-slate-800 px-5 py-2.5 font-medium hover:bg-slate-700"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="mt-5 rounded-lg border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">
              {error}
            </div>
          )}
        </section>

        {(header || payload || signature) && (
          <div className="mt-8 space-y-6">
            {header && (
              <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-4 text-xl font-semibold">
                  Header
                </h2>

                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-green-300">
                  {formatJson(header)}
                </pre>
              </section>
            )}

            {payload && (
              <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-4 text-xl font-semibold">
                  Payload
                </h2>

                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-green-300">
                  {formatJson(payload)}
                </pre>
              </section>
            )}

            {signature && (
              <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-4 text-xl font-semibold">
                  Signature
                </h2>

                <div className="break-all rounded-lg bg-slate-950 p-4 font-mono text-sm text-yellow-300">
                  {signature}
                </div>
              </section>
            )}
          </div>
        )}

        <section className="mt-8 rounded-xl border border-yellow-900/50 bg-yellow-950/20 p-5">
          <h2 className="font-semibold text-yellow-300">
            Security & Privacy
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            This tool only decodes JWT data in your browser. The token
            is not uploaded to our server. Never share passwords, private
            keys, or sensitive production credentials.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Decoding a JWT does not verify its signature or prove that
            the token is authentic.
          </p>
        </section>

        <section className="mt-10 prose prose-invert max-w-none">
          <h2>What is a JWT?</h2>

          <p>
            JSON Web Token (JWT) is a compact format commonly used for
            securely transmitting information between parties.
          </p>

          <p>
            A JWT normally contains three parts:
          </p>

          <ul>
            <li>Header — contains metadata such as the signing algorithm.</li>
            <li>Payload — contains claims and other information.</li>
            <li>Signature — used to verify that the token was not modified.</li>
          </ul>

          <h2>Is this JWT decoder secure?</h2>

          <p>
            The decoding process happens entirely in your browser.
            Your JWT is not sent to a backend server by this tool.
          </p>

          <p>
            However, you should still avoid pasting highly sensitive
            production tokens into any third-party website.
          </p>
        </section>
      </div>
    </main>
  );
}