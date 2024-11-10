import doUntil from "./doUntil.ts";

export default class ApiClient {
  constructor(private readonly baseUrl: string = "") {}

  public async getSampleCode(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/sample`);
    return (await response.json()).code;
  }

  public async deployProject(
    code: string,
    id?: string,
  ): Promise<ProjectDeployment> {
    const idSuffix = id ? `/${id}` : "";

    const response = await fetch(`${this.baseUrl}/api/project${idSuffix}`, {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Failed to deploy project");
    }

    return await response.json();
  }

  public async getDeployment(id: string): Promise<ProjectDeployment> {
    const response = await fetch(`${this.baseUrl}/api/deployment/${id}`);
    return await response.json();
  }

  public async waitForDeployment(deploymentId: string) {
    return await doUntil(async () => {
      return await this.getDeployment(deploymentId);
    }, (response) => response.deployment.status !== "pending");
  }
}
