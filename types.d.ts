// Deno Subhosting API response types

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Deployment {
  id: string;
  projectId: string;
  description: string;
  status: string;
  domains: string[];
  databases: {
    default: string;
  };
  requestTimeout: number;
  permissions: {
    net: (string | "*")[];
  };
  createdAt: string;
  updatedAt: string;
}

// API response types

interface ProjectDeployment {
  deployment: Deployment;
  project: Project;
  url: string;
}

interface SampleCode {
  code: string;
}
