export const metadata = {
  title: "About DevToolsHub",
  description:
    "Learn about DevToolsHub and our collection of free developer utilities.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold">
            DevTools<span className="text-blue-400">Hub</span>
          </a>

          <a
            href="/"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Home
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">About DevToolsHub</h1>

        <p className="mt-6 leading-8 text-slate-400">
          DevToolsHub provides simple, fast and privacy-friendly online
          tools for developers, IT professionals, system administrators
          and technical users.
        </p>

        <p className="mt-5 leading-8 text-slate-400">
          Our goal is to make common technical tasks easier without
          requiring users to install additional software or create an
          account for basic functionality.
        </p>

        <h2 className="mt-12 text-2xl font-bold">
          Our approach
        </h2>

        <p className="mt-4 leading-8 text-slate-400">
          Whenever possible, our tools process information directly in
          your browser. This helps keep simple tasks fast and reduces
          unnecessary data transmission.
        </p>
      </section>

      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} DevToolsHub. All rights reserved.
        </div>
      </footer>
    </main>
  );
}