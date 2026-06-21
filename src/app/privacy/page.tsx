import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <main className="max-w-3xl mx-auto px-4 py-16 prose prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-gray-400">
          CodeCraft stores account data through Clerk and application data through Convex. Code you
          run is sent to the Piston API for execution. We do not sell your personal information.
        </p>
        <h2>Data we collect</h2>
        <ul className="text-gray-400">
          <li>Account information (email, name) via Clerk authentication</li>
          <li>Code snippets, execution history, and comments you choose to save</li>
          <li>Basic usage data required to operate the service</li>
        </ul>
        <h2>Third-party services</h2>
        <p className="text-gray-400">
          This app uses Clerk (auth), Convex (database), Vercel (hosting), Piston (code execution),
          and optionally OpenAI (AI explanations) and Lemon Squeezy (payments).
        </p>
        <Link href="/" className="text-blue-400 hover:text-blue-300 no-underline">
          Back to editor
        </Link>
      </main>
    </div>
  );
}
