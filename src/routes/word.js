import Redis from "ioredis";
export function post({ body: { attempt } }) {
  if (process.env.REDIS_URL) {
    let client = new Redis(process.env.REDIS_URL);

    client.zincrby("attempts", 1, attempt);
  }
  return {
    body: {},
  };
}
