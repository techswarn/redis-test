import { load } from "$std/dotenv/mod.ts";

await load({ allowEmptyValues: true, export: true });

export const REDIS_URL = Deno.env.get("REDIS_URL");
export const REDIS_PASSWORD = Deno.env.get("REDIS_PASSWORD");
