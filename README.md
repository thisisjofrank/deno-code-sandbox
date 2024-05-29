# deno-code-sandbox

This is a code sandbox example that uses:

* React - for the WebUI
* Vite - for a react dev server
* Deno - as the backend runtime
* Oak - as the middleware framework for the API
* Deno Deploy - to host the code sandbox
* Deno Subhosting - to host the code *executed using the sandbox*

This is a stack that'll work if you want to build something like *CodePen*, *Glitch*, *JSFiddle*, or Edge Functions (Cloudflare, Vercel etc).

## What it does

The homepage of the app displays a snippet of a program using the `Deno.serve` API to create a Deno web app. When you click `Create Interactive Sandbox` the code you see will be pushed to the backend `API` which will create a `Deno Subhosting Instance` and startup the code.

You'll be redirected to an editor page at this point, where you can edit and save the code in real-time, each save resulting in a new `Deno Subhosting Deployment` with a distinct URL that you can share with others.

A real "code sandbox" experience would likely clean up the last n deployments after a certain time period, but this is a simplified example.

### Pre-Requisites

You'll need:

* Deno installed
* A Deno Deploy account
* A Deno Deploy access token
* A Deno Subhosting Account with an Organization created

Once you have your accounts, you'll need to create a `.env` file in the root of the project with the following contents:

```text
DEPLOY_ORG_ID=283....
DEPLOY_ACCESS_TOKEN=ddo_xdR...
```

With your `Org Id` and `Access Token` in place so you can run the app.

### How to run

```bash
deno task start
```

This will start the Vite server and the Oak server, and you can visit `http://localhost:3000` to see the app running.

### How to deploy

You can create all the required build artifacts by running

```bash
deno task build
```

This will use `Deno` to execute `Vite` to build the frontend components for the react app. The built react app will be created at `./client/dist` and the backend code will be in `./server`.

If you're deploying with Deno Deploy, you'll want to configure the following settings:

* Build - `deno task build`
* Entrypoint - `./server/main.ts`

In production, the Deno app will serve both the API, and the static files for the react app.
You'll see the API served at `/api` and the static files served at `/`.

### Development Notes

In development, the `Vite dev server` is configured to proxy across to the Deno server for the API calls so if you've used `Vite` before, everything will just work as expected.

If you're looking to diagnose issues, you can run `deno task serve` to start a production-like build that doesn't require a running instance of `Vite` to serve the frontend.

### React Notes

This example uses the latest version of `React` and is configured for HMR (Hot Module Replacement) so you can see changes in real-time as you develop. `React Router` is also included to handle the routing for the app, along with appropriate wildcard routing configuration so that refreshing the page will still load the app.
