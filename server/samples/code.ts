console.log("Server starting up...");

Deno.serve(() => {
  console.log("Request received!");
  return new Response("Hello, World!");
});
