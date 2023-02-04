import { defineConfig } from "vite";
import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import * as Path from "node:path";

export default defineConfig({
    build: {
        lib: {
            entry: "./lib/index.ts",
            name: "restatoes",
            fileName: "index",
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["react", "react-jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                },
            },
            plugins: [
                typescript({ declaration: true, sourceMap: false, outDir: "dist", rootDir: "lib" }),
            ],
        },
    },
    plugins: [react()],
});
