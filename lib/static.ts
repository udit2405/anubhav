import data from "../data/experts.json";
import type { Professional, Review, Department, Specialization } from "./types";
import { DEPARTMENTS, SPECIALIZATIONS } from "./data";
/** All site data comes from data/experts.json, generated from data/experts.xlsx by `npm run import`. */
export const PROS = data.professionals as unknown as Professional[];
export const REVIEWS = data.reviews as unknown as Review[];
export const getPro = (id: string) => PROS.find((p) => p.id === id) ?? null;
export { DEPARTMENTS, SPECIALIZATIONS };
export type { Department, Specialization };
