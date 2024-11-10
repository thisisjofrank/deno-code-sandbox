import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";

export default function (ctx: RouterContext<string, Record<string, string>>) {
  handleErrors(ctx, () => {
    // A real world application would probably clone a git repo here
    // But for the sake of simplicity we'll just read a file

    const code = Deno.readTextFileSync(`${Deno.cwd()}/server/samples/code.ts`);
    ctx.response.body = JSON.stringify({ code });
  });
}
