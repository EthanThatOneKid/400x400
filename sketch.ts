/**
 * Sketch is a hosted p5.js sketch.
 */
export interface Sketch {
  /**
   * url is the url of the sketch.
   */
  url: string;

  /**
   * dimensions is the dimensions of the sketch in pixels.
   */
  dimensions?: {
    /**
     * width is the width of the sketch in pixels.
     */
    width: number;

    /**
     * height is the height of the sketch in pixels.
     */
    height: number;
  };
}

/**
 * getSketchesFromURL returns a list of sketches from a JSON URL.
 */
export async function getSketchesFromURL(url: string): Promise<Sketch[]> {
  const response = await fetch(url);
  return await response.json();
}

/**
 * getSketchesFromFile returns a list of sketches from a JSON file.
 */
export async function getSketchesFromFile(file: string): Promise<Sketch[]> {
  const data = await Deno.readTextFile(file);
  return JSON.parse(data);
}

/**
 * renderSketchHTML renders the sketch as an iframe element.
 */
export function renderSketchHTML(sketch: Sketch): string {
  const { url, dimensions } = sketch;
  const { width, height } = dimensions ?? { width: 400, height: 400 };
  return `<iframe src="${url}" scrolling="no" width="${width}" height="${height}" style="border: none; overflow: hidden;"></iframe>`;
}
