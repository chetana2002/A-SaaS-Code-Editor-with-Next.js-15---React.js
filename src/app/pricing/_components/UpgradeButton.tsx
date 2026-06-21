import { Zap } from "lucide-react";
import Link from "next/link";
import { getLemonSqueezyCheckoutUrl } from "@/lib/env";

export default function UpgradeButton() {
  const checkoutUrl = getLemonSqueezyCheckoutUrl();

  return (
    <Link
      href={checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  );
}
