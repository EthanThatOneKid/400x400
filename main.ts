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
            h1 {
                text-align: center;
            }

            main {
                display: grid;
                grid-gap: 1rem;
                grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                grid-auto-flow: dense;
            }

            iframe {
                outline: 1px solid #000;
                align-self: center;
                justify-self: center;
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
