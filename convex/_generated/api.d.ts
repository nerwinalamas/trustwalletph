/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as http from "../http.js";
import type * as limits from "../limits.js";
import type * as migrations_addNewColumn from "../migrations/addNewColumn.js";
import type * as migrations_calculateUsage from "../migrations/calculateUsage.js";
import type * as migrations_migrateLimits from "../migrations/migrateLimits.js";
import type * as payments from "../payments.js";
import type * as scheduled from "../scheduled.js";
import type * as transactions from "../transactions.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  http: typeof http;
  limits: typeof limits;
  "migrations/addNewColumn": typeof migrations_addNewColumn;
  "migrations/calculateUsage": typeof migrations_calculateUsage;
  "migrations/migrateLimits": typeof migrations_migrateLimits;
  payments: typeof payments;
  scheduled: typeof scheduled;
  transactions: typeof transactions;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
