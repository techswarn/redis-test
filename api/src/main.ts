import { Application } from "oak/mod.ts";
import { oakCors } from "cors/mod.ts";
import { REDIS_PASSWORD, REDIS_URL } from "./config.ts";
import { redisClient } from "./server/container.ts";

/* Info */
console.info(`deno ${Deno.version.deno}`);

if (REDIS_URL && REDIS_PASSWORD) {
  redisClient.connect();
}

/* Web Server */
const app = new Application();

app.use(oakCors({ origin: true, credentials: true }));

app.addEventListener("listen", (options) => {
  const scheme = options.secure ? "https" : "http";
  const origin = `${scheme}://${options.hostname}:${options.port}`;
  console.info(`server started ${origin}`);
});

// Close the Redis connection on shutdown
Deno.addSignalListener("SIGINT", async () => {
  console.info("Shutting down...");
  if (REDIS_URL && REDIS_PASSWORD) {
    await redisClient.disconnect();
  }
  Deno.exit(0);
});

await app.listen({ port: 3333 });
