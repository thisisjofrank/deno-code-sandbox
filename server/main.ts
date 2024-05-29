import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import routeStaticFilesFrom from "../client/src/util/routeStaticFilesFrom.ts";
import getSampleCode from "./commands/getSampleCode.ts";
import deployProject from "./commands/deployProject.ts";
import getDeployment from "./commands/getDeployment.ts";

export const app = new Application();
const router = new Router();

router.get("/api/sample", getSampleCode)
router.post("/api/project", deployProject)
router.post("/api/project/:id", deployProject);
router.get("/api/deployment/:id", getDeployment);

app.use(router.routes());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  await app.listen({ port: 8000 });
}