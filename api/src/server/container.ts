import { REDIS_PASSWORD, REDIS_URL } from "../config.ts";
import { RedisClient } from "../gateways/cache/redis.ts";

export const redisClient = new RedisClient(
  REDIS_URL ?? "",
  REDIS_PASSWORD ?? "",
);
