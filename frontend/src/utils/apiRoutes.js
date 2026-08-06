export const normalizeApiBaseUrl = (value) =>
  (value || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/api$/i, "");

export const apiRoute = (path = "") => {
  const raw = String(path || "").trim();

  if (!raw) {
    return "/api";
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  const normalizedPath = raw
    .replace(/^\/+/, "")
    .replace(/^api\/?/i, "");

  return `/api/${normalizedPath}`.replace(/\/$/, "");
};

export const normalizeApiRequestPath = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/^\/api\/api\//i, "/api/");
};
