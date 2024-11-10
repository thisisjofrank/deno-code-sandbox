import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api/ApiClient.ts";
import Prism from "prismjs";
import "prismjs/components/prism-typescript.js";

const client = new ApiClient();

export default function ViewCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  useEffect(() => {
    (async () => {
      const code = await client.getSampleCode();
      setCode(code);
    })();
  }, []);

  const fork = async () => {
    // The omission of a project id here will create a new project
    const responseJson = await client.deployProject(code);
    navigate(
      `/edit/${responseJson.project.id}?deployment=${responseJson.deployment.id}`,
    );
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="editor">
      <pre id="highlighting" aria-hidden="true">
        <code className="language-ts" id="highlighting-content">{code}</code>
      </pre>
      <button className="run" onClick={fork}>Edit this code</button>
    </div>
  );
}
