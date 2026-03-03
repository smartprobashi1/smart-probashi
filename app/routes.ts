// routes.ts
export type AppRoutes =
  | "/"
  | "/dashboard"
  | "/add-income"
  | "/add-expense"
  | "/goals"
  | "/profile";

export type LayoutRoutes = "/";

export type ParamMap = {
  "/": {};
  "/dashboard": {};
  "/add-income": {};
  "/add-expense": {};
  "/goals": {};
  "/profile": {};
};