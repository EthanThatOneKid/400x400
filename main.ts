import type { Sketch } from "./sketch.ts";
import { getSketchesFromURL, renderSketchHTML } from "./sketch.ts";

if (import.meta.main) {
  await main();
}

function main() {
  Deno.serve(handle);
}

async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const sketchesURL = url.searchParams.get("sketches");
  if (!sketchesURL) {
    return new Response("Missing sketches URL", { status: 400 });
  }

  const sketches = await getSketchesFromURL(sketchesURL);
  return new Response(renderHTML(sketches), {
    headers: { "content-type": "text/html" },
  });
}

function renderHTML(sketches: Sketch[]): string {
  return `<!DOCTYPE html>
<html>
    <head>
        <title>Sketches</title>
        <style>
            :root {
              --primary: rgb(255, 67, 101);
            }

            h1 {
                color: var(--primary);
                text-align: center;
            }

            main {
                display: grid;
                grid-gap: 1rem;
                grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                grid-auto-flow: dense;
            }

            iframe {
                outline: 2px solid var(--primary);
                border-radius: 0.5rem;
                align-self: center;
                justify-self: center;
            }

            hr {
              background-color: var(--primary);
              border: none;
              height: 2px;
            }

            footer {
              text-align: center;
              color: var(--primary);
            }
        </style>
    </head>
    <body>
        <h1>Sketches</h1>
        <br />
        ${renderGridHTML(sketches)}
        <hr />
        <footer>
            Hosted with <a href="https://deno.com/deploy">Deno Deploy</a> by <a href="https://oss.acmcsuf.com/">acmcsufoss</a>!
        </footer>
    </body>
</html>`;
}

function renderGridHTML(sketches: Sketch[]): string {
  const iframesHTML = sketches.map(renderSketchHTML).join("");
  return `<main>${iframesHTML}</main>`;
}
