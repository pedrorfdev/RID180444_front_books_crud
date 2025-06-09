import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import netlify from "vite-plugin-netlify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    netlify({
      redirects: [
        {
          from: "/*",
          to: "/index.html",
          status: 200,
        },
      ],
    }),
  ],
});
