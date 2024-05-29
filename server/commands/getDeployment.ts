import { DenoSubhostingClient } from "../deno-api/DenoSubhostingClient.ts";
import { RouterContext } from "jsr:@oak/oak/router";
import handleErrors from "./shared/handleErrors.ts";
import createUrl from "./shared/createUrl.ts";

export default async function (ctx: RouterContext<string, Record<string, string>>) {
    await handleErrors(ctx, async () => {
        const client = new DenoSubhostingClient();

        let url: string | null = null;
        let project: Project | undefined;
        const deployment = await client.getDeployment(ctx?.params?.id);

        // Only grab the extra projecxt info if the deployment is done
        // This way we don't spam the API too much
        if (deployment.status === "success" || deployment.status === "failed") {
            project = await client.getProject(deployment.projectId);
            url = createUrl(project, deployment);
        }

        ctx.response.status = 200;
        ctx.response.body = JSON.stringify({
            project,
            deployment,
            url
        });
    });
}
