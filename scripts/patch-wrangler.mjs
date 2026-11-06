import { readFileSync, writeFileSync, existsSync } from "node:fs";

const wranglerPath = "dist/server/wrangler.json";
if (existsSync(wranglerPath)) {
  try {
    const data = JSON.parse(readFileSync(wranglerPath, "utf-8"));
    data.name = "smartserve-app";
    data.compatibility_flags = ["nodejs_compat"];
    data.d1_databases = [
      {
        binding: "DB",
        database_name: "smartserve-db",
        database_id: "5e3c6049-0d35-4003-a5f2-231549451c71"
      }
    ];
    data.r2_buckets = [];
    writeFileSync(wranglerPath, JSON.stringify(data, null, 2));
    console.log("Successfully deduplicated flags and configured smartserve-app in dist/server/wrangler.json");
  } catch (e) {
    console.error("Error patching wrangler.json:", e);
  }
}
