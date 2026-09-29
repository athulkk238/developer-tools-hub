const tools = [
  {
    name: "JSON Formatter",
    description: "Format, validate and minify JSON data.",
    icon: "{ }",
    href: "/tools/json-formatter",
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 text instantly.",
    icon: "64",
    href: "/tools/base64",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs quickly.",
    icon: "ID",
    href: "/tools/uuid-generator",
  },
  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to readable dates.",
    icon: "T",
    href: "/tools/timestamp",
  },
  {
    name: "JWT Decoder",
    description: "Decode JWT tokens directly in your browser.",
    icon: "JWT",
    href: "/tools/jwt-decoder",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold">
            DevTools<span className="text-blue-400">Hub</span>
          </a>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#tools" className="hover:text-white">
              Tools
            </a>
            <a href="#about" className="hover:text-white">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Free developer utilities
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Simple tools for
            <span className="block text-blue-400">
              developers & IT professionals
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Fast, simple and privacy-friendly online tools for developers,
            cloud engineers, system administrators and technical professionals.
          </p>

          <a
            href="#tools"
            className="mt-8 inline-block rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Explore Tools
          </a>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Developer Tools</h2>
          <p className="mt-2 text-slate-400">
            Useful utilities for your everyday development work.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              className="group rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-800"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 font-bold text-blue-400">
                {tool.icon}
              </div>

              <h3 className="text-lg font-semibold group-hover:text-blue-400">
                {tool.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {tool.description}
              </p>

              <div className="mt-5 text-sm font-medium text-blue-400">
                Open tool →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-slate-800 bg-slate-900/50"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold">Why DevToolsHub?</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">Fast</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Tools designed to get your task completed quickly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Privacy Friendly</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Wherever possible, your data is processed directly in your
                browser.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Free to Use</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Essential developer utilities available without registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
  <div className="mx-auto max-w-6xl px-6 py-8">
    <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      
      <p>
        © {new Date().getFullYear()} DevToolsHub. All rights reserved.
      </p>

      <div className="flex gap-5">
        <a
          href="/about"
          className="transition hover:text-white"
        >
          About
        </a>

        <a
          href="/privacy"
          className="transition hover:text-white"
        >
          Privacy Policy
        </a>

        <a
          href="/terms"
          className="transition hover:text-white"
        >
          Terms
        </a>

        <a
          href="/contact"
          className="transition hover:text-white"
        >
          Contact
        </a>
      </div>

    </div>
  </div>
</footer>
    </main>
  );
}