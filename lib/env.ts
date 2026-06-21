const PLACEHOLDER_CONVEX_URL = "https://placeholder.convex.cloud";

export function getConvexUrl(): string {
  return process.env.NEXT_PUBLIC_CONVEX_URL ?? PLACEHOLDER_CONVEX_URL;
}

export function getClerkPublishableKey(): string {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
}

export function getLemonSqueezyCheckoutUrl(): string {
  return (
    process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL ??
    "https://your-store.lemonsqueezy.com/checkout/buy/your-product-id"
  );
}

export function isAppConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CONVEX_URL &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY
  );
}

export function isConvexConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);
}
