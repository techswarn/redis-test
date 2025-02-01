import { createClient, RedisClientType } from "npm:redis@^4.5";

export class RedisClient {
  #url: string;
  #password: string;
  #client: RedisClientType;
  #connected: boolean = false;

  constructor(
    url: string | undefined,
    password: string | undefined,
  ) {
    if (url === undefined || password === undefined) {
      throw new SyntaxError("missing formal parameter for RedisClient");
    }
    this.#url = url;
    console.log("url: ", url);
    this.#password = password;
    console.log("password: ", password);
    this.#client = createClient({ url, password });
  }

  async connect() {
    console.info("Connecting to Redis...");
    try {
      await this.#client.connect();
      console.info("Redis connection established");
      this.#connected = true;
    } catch (error) {
      console.error("Failed to connect to Redis", error);
      console.warn("continuing without Redis");
      this.#connected = false;
    }
  }

  reconnect() {
    if (this.#connected) return;

    console.info("Reconnecting to Redis in 5 seconds...");
    setTimeout(async () => {
      try {
        this.#client = createClient({
          url: this.#url,
          password: this.#password,
        });
        await this.connect();
      } catch (err) {
        console.error("Redis reconnection failed:", err);
      }
    }, 5000);
  }

  async set(key: string, value: string) {
    if (!this.#connected) return;
    await this.#client.set(key, value, { EX: 1200 });
  }

  async get(key: string): Promise<string | null> {
    if (!this.#connected) return null;
    return await this.#client.get(key);
  }

  async delete(key: string) {
    if (!this.#connected) return;
    await this.#client.del(key);
  }

  async disconnect() {
    if (!this.#connected) return;
    await this.#client.quit();
    console.info("Redis connection closed");
  }
}
