export async function post({ body: { attempt } }) {
  const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
  if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN)
    await fetch(`${UPSTASH_REDIS_REST_URL}/zincrby/attempts/1/${attempt}`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      },
    });

  return {
    body: {},
  };
}
