import { assertEquals } from "jsr:@std/assert";
import { app } from "./main.ts";

Deno.test("Responds to requests", async () => {
  const request = new Request("http://localhost:8000/api");

  const result = await app.handle(request);
  const body = await result?.json();

  assertEquals(body.message, "Hello, World!");
});
