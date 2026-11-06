import { readFileSync, writeFileSync, existsSync } from "node:fs";

const wranglerPath = "dist/server/wrangler.json";
if (existsSync(wranglerPath)) {
  try {
    const data = JSON.parse(readFileSync(wranglerPath, "utf-8"));
    data.name = "smartserve-app";
    data.topLevelName = "smartserve-app";
    delete data.compatibility_flags;
    data.d1_databases = [
      {
        binding: "DB",
        database_name: "smartserve-db",
        database_id: "5e3c6049-0d35-4003-a5f2-231549451c71"
      }
    ];
    data.r2_buckets = [];
    writeFileSync(wranglerPath, JSON.stringify(data, null, 2));
    console.log("Successfully cleaned compatibility_flags and set smartserve-app in dist/server/wrangler.json");
  } catch (e) {
    console.error("Error patching wrangler.json:", e);
  }
}
