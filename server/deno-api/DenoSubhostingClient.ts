import * as mod from '@std/dotenv';
const env = await mod.load();

// This client class captures all the API calls we need to make to the Deno Subhosting API
// It wraps the fetch API to keep the noise out of the commands
export class DenoSubhostingClient {
    private API: string;
    private accessToken: string | undefined;
    private orgId: string | undefined;
    private headers: { Authorization: string; "Content-Type": string; };

    constructor() {
        this.API = "https://api.deno.com/v1";
        this.accessToken = env["DEPLOY_ACCESS_TOKEN"];
        this.orgId = env["DEPLOY_ORG_ID"];

        if (!this.accessToken) {
            throw new Error("env DEPLOY_ACCESS_TOKEN is required");
        }

        if (!this.orgId) {
            throw new Error("env DEPLOY_ORG_ID is required");
        }

        this.headers = {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
        };
    }

    public async createProject(name: string | null = null) {
        const response = await fetch(`${this.API}/organizations/${this.orgId}/projects`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name }),
        });

        await this.validateResponse(response);
        return await response.json() as Project;
    }

    public async getProject(id: string) {
        const response = await fetch(`${this.API}/projects/${id}`, {
            headers: this.headers,
        });

        await this.validateResponse(response);
        return await response.json() as Project;
    }

    public async deployProject(id: string, files: Map<string, string>) {
        const assets = Array.from(files).reduce((acc, [name, content]) => {
            acc[name] = {
                kind: "file",
                content,
                encoding: "utf-8",
            };

            return acc;
        }, {} as Record<string, { kind: string; content: string; encoding: string }>);

        const response = await fetch(`${this.API}/projects/${id}/deployments`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                entryPointUrl: "main.ts",
                assets: assets,
                envVars: {},
            }),
        });

        await this.validateResponse(response);
        return await response.json() as Deployment;
    }

    public async getDeployment(id: string) {
        const response = await fetch(`${this.API}/deployments/${id}`, {
            headers: this.headers,
        });

        await this.validateResponse(response);
        return await response.json() as Deployment;
    }

    private async validateResponse(response: Response) {
        // A real application would wire in telemetry here

        console.log("Validating response", response.status, response.statusText, response.ok, response.url,);

        if (!response.ok) {
            const body = await response.text();
            throw new Error(
                `Request failed with status code ${response.status}.\n
                ${response.statusText}\n
                ${body}`
            );
        }
    }
}
