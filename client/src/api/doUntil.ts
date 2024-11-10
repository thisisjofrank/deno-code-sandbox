// Rudimentary resilience that retries a task until a condition is met
// Used to poll for deloyment completion in the client without hanging forever.

export default async function doUntil<TReturns>(
  task: () => Promise<TReturns>,
  until: (returns: TReturns) => boolean,
) {
  let tries = 0;
  let pushback = 0;
  let returns: TReturns;

  do {
    if (tries > 10) {
      throw new Error("doUntil failed after 10 tries");
    }

    pushback = Math.min(pushback + tries, 10) * 100;
    if (pushback > 0) {
      await new Promise((resolve) => setTimeout(resolve, pushback));
    }

    returns = await task();
    tries++;
  } while (!until(returns));

  return returns;
}
