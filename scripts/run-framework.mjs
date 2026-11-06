import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readExecutionProfile } from "./execution-profile.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

function patchWrangler() {
  const wranglerPath = fileURLToPath(new URL("../dist/server/wrangler.json", import.meta.url));
  if (existsSync(wranglerPath)) {
    try {
      const data = JSON.parse(readFileSync(wranglerPath, "utf-8"));
      data.d1_databases = [
        {
          binding: "DB",
          database_name: "smartserve-db",
          database_id: "5e3c6049-0d35-4003-a5f2-231549451c71"
        }
      ];
      data.r2_buckets = [];
      writeFileSync(wranglerPath, JSON.stringify(data, null, 2));
      console.log("Patched wrangler.json with D1 database ID 5e3c6049-0d35-4003-a5f2-231549451c71");
    } catch (e) {
      console.error("Failed to patch wrangler.json", e);
    }
  }
}

const [command, ...args] = process.argv.slice(2);
if (!["dev", "build"].includes(command)) throw new Error("Expected dev or build.");
const managedLinux = readExecutionProfile() === "managed-linux";

if (managedLinux && command === "build") {
  const result = spawnSync("bash", [
    fileURLToPath(new URL("./build-verified.sh", import.meta.url)), ...args,
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  patchWrangler();
  process.exit(result.status ?? 1);
}

// Import in this process so the preview owner retains its PID and signals.
const cli = new URL(managedLinux
  ? "../node_modules/vite/bin/vite.js"
  : "../node_modules/vinext/dist/cli.js", import.meta.url);
process.argv = [process.execPath, fileURLToPath(cli), command,
  ...(!managedLinux && command === "dev" ? ["--port", "5173"] : []), ...args];
await import(cli.href);

if (command === "build") {
  patchWrangler();
}
