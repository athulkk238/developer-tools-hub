export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for DevToolsHub.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="mt-4 text-sm text-slate-500">
          Last updated: September 2026
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Information we collect
        </h2>

        <p className="mt-4 leading-8 text-slate-400">
          DevToolsHub is designed to provide useful online developer
          utilities while minimizing unnecessary data collection.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Tool data
        </h2>

        <p className="mt-4 leading-8 text-slate-400">
          Tools that are designed to operate locally in your browser
          process your input on your device and do not require the input
          to be uploaded to our servers.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Analytics and advertising
        </h2>

        <p className="mt-4 leading-8 text-slate-400">
          We may use analytics and advertising services in the future to
          understand website usage and support the operation of the
          service. Details will be updated here when those services are
          enabled.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Contact
        </h2>

        <p className="mt-4 leading-8 text-slate-400">
          If you have questions about this Privacy Policy, please
          contact us through the contact information provided on this
          website.
        </p>
      </section>
    </main>
  );
}