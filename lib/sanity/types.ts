import type { TrinityProductLine } from "@/lib/sanity/fetch";

export type TrinityPowerId = "dawn" | "twilight" | "dusk";

export type ProductsByEffect = Partial<
  Record<TrinityPowerId, TrinityProductLine[]>
>;
