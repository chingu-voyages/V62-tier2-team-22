export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 text-slate-800">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Get in Touch</h1>

      <p className="mb-4">
        Have a question, feedback, or need help with Masari? We would love to hear from you.
      </p>

      <p className="mb-4">
        Whether you are experiencing an issue, have a suggestion to improve your learning experience, or simply want to reach out, feel free to contact us by email.
      </p>

      <p className="font-bold mb-4">
        Email:{" "}
        <a
          href="mailto:anas88893142@gmail.com"
          className="text-cyan-600 underline hover:text-cyan-700"
        >
          anas88893142@gmail.com
        </a>
      </p>

      <p>
        We’ll do our best to get back to you as soon as possible.
      </p>
    </main>
  );
}
