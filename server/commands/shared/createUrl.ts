export default function (project: Project, deployment: Deployment): string {
  return `https://${project.name}-${deployment.id}.deno.dev`;
}
