import { RouterContext } from "jsr:@oak/oak/router";

export default async function (
  ctx: RouterContext<string, Record<string, string>>,
  func: () => void | Promise<void>,
) {
  try {
    await func();
  } catch (error) {
    console.error(error);
    ctx.response.status = 500;
    ctx.response.body = JSON.stringify({
      message: "Internal Server Error",
    });
  }
}
