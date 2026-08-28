import { defineConfig } from "vite";
import { globSync } from "node:fs";

const htmlFiles = globSync("**/*.html", {
  ignore: ["node_modules/**", "dist/**"]
});

const input = Object.fromEntries(
  htmlFiles.map((file) => [
    file.replace(/\.html$/, "").replace(/[\\/]/g, "_") || "index",
    file
  ])
);

export default defineConfig({
  build: {
    rollupOptions: {
      input
    }
  }
});
