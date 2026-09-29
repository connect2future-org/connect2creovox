import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.join(process.cwd(), "src");
const JS_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);

// Temporary allowlist for legacy code that is currently tool-ignored.
const ALLOWLIST = new Set([
  "src/context/AuthContext.jsx",
]);

const LOCALHOST_PATTERN = /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\b/i;
const HARD_CODED_API_CALL_PATTERN = /\bapi\.(get|post|put|patch|delete)\s*\(\s*(["'`])\/api\//;
const ENV_FALLBACK_PATTERN = /import\.meta\.env\.[A-Z0-9_]+\s*\|\|\s*(["'`])(?:https?:\/\/|\/api\/|localhost|127\.0\.0\.1)/i;

const violations = [];

const toRelative = (filePath) =>
  path.relative(process.cwd(), filePath).split(path.sep).join("/");

const shouldScan = (filePath) => JS_EXTENSIONS.has(path.extname(filePath));

const walk = (dirPath) => {
  const entries = fs.readdirSync(dirPath, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!shouldScan(fullPath)) {
      continue;
    }

    const relPath = toRelative(fullPath);
    const text = fs.readFileSync(fullPath, "utf8");
    const lines = text.split(/\r?\n/);

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      if (
        LOCALHOST_PATTERN.test(line) &&
        !ALLOWLIST.has(relPath)
      ) {
        violations.push({
          file: relPath,
          line: lineNumber,
          rule: "no-localhost-url",
          snippet: line.trim(),
        });
      }

      if (
        HARD_CODED_API_CALL_PATTERN.test(line) &&
        !ALLOWLIST.has(relPath)
      ) {
        violations.push({
          file: relPath,
          line: lineNumber,
          rule: "no-hardcoded-api-path",
          snippet: line.trim(),
        });
      }

      if (
        ENV_FALLBACK_PATTERN.test(line) &&
        !ALLOWLIST.has(relPath)
      ) {
        violations.push({
          file: relPath,
          line: lineNumber,
          rule: "no-hardcoded-env-fallback",
          snippet: line.trim(),
        });
      }
    });
  }
};

if (!fs.existsSync(SRC_DIR)) {
  console.error("[config-check] src directory not found.");
  process.exit(1);
}

walk(SRC_DIR);

if (violations.length > 0) {
  console.error("\n[config-check] Found hardcoded config violations:\n");

  for (const v of violations) {
    console.error(`- ${v.file}:${v.line} [${v.rule}]`);
    console.error(`  ${v.snippet}`);
  }

  console.error(
    "\nFix by using env variables and apiRoute(...) helper instead of hardcoded URLs or /api literals."
  );

  process.exit(1);
}

console.log("[config-check] OK: no hardcoded config/API violations found.");
