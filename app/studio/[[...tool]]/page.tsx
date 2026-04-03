import type { Metadata, Viewport } from "next";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";
import StudioClient from "./studio-client";

export const metadata: Metadata = studioMetadata;
export const viewport: Viewport = {
  ...studioViewport,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <StudioClient />;
}
