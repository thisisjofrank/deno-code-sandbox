import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";
import { DenoSubhostingClient } from "../deno-api/DenoSubhostingClient.ts";
import createUrl from "./shared/createUrl.ts";

const sampleCode = Deno.readTextFileSync(`${Deno.cwd()}/server/samples/code.ts`);
const client = new DenoSubhostingClient();

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        const id = ctx?.params?.id || (await client.createProject()).id;
        const code = ctx?.request?.body ? (await ctx?.request?.body.json()).code : sampleCode;

        // Slightly overcooked here given we're just using one file
        // But we could add multiple files to the deployment here.
        const files = new Map<string, string>();
        files.set("main.ts", code);

        const project = await client.getProject(id);
        const deployment = await client.deployProject(id, files);

        ctx.response.status = 201;
        ctx.response.body = JSON.stringify({
            project,
            deployment,
            url: createUrl(project, deployment)
        });
    });
}
