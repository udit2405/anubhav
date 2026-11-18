import { PROS } from "./static";
export const fetchPublicPros = async () => PROS;
export const fetchPublicPro = async (id: string) => PROS.find((p) => p.id === id) ?? null;
