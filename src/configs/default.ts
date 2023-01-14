export const backend = {
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "https://mlm-backend.onrender.com",
};
export const appName = "MLM";

export const basicAuthentication = {
  username: process.env.BASIC_AUTH_USERNAME ?? "mlm",
  password: process.env.BASIC_AUTH_PASSWORD ?? "mlmsecret",
};

export const googleAnalytics = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
};

export const nodeEnv =
  process.env.NEXT_PUBLIC_FORCE_NODE_ENV ||
  process.env.NODE_ENV ||
  "development";
