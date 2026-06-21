import { ConvexHttpClient } from "convex/browser";
import { getConvexUrl } from "./env";

export function getConvexClient() {
  return new ConvexHttpClient(getConvexUrl());
}
