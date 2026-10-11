
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Chemin du site sur alwaysdata
  base: "/site/",

  // Configuration du serveur local
  server: {
    port: 5173
  },

  // Dossier de compilation
  build: {
    outDir: "dist"
  }
});
