import { createClient } from "next-sanity";
import type { SanityClient } from "@sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      /** Avoid hanging SSR forever when the API is slow or unreachable */
      timeout: 12_000,
      maxRetries: 2,
    });
  }
  return _client;
}
