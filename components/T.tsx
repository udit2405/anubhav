"use client";
import { useApp } from "@/lib/app";
export function T({ k }: { k: string }) { return <>{useApp().t(k)}</>; }
