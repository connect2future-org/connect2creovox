# Configuration Guidelines

Use environment variables for deploy-specific values. Avoid hardcoding URLs, domains, ports, credentials, and CORS origins in source code.

## Team Rules

1. Never hardcode hostnames, API base URLs, or CORS origins.
2. Keep runtime config in .env files and commit only .env.example templates.
3. For multiple values (like CORS origins), use comma-separated env values and parse them in code.
4. Do not include trailing slashes in origin values unless code explicitly normalizes them.
5. Add new config keys to both docs and .env.example in the same PR.

## Project Variables

Backend:
- PORT
- NODE_ENV
- MONGODB_URI
- CLIENT_URL
- JWT_SECRET
- JWT_EXPIRE
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

Frontend:
- VITE_API_URL

## Deployment Checklist

1. Confirm required env vars are set in the target environment.
2. Restart process manager with env refresh (example: pm2 restart <app> --update-env).
3. Verify startup logs show the expected normalized configuration values.
