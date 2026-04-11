import type { UserProfile } from "../types";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function post(path: string, body: object) {
    const res = await fetch(`${BASE_URL}/api${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error(
            (await res.json().catch(() => ({}))).error || "Request failed",
        );
    }
    return res.json();
}

async function get(path: string) {
    const res = await fetch(`${BASE_URL}/api${path}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }

    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "API request failed");
    }
}

export const api = {
    saveProfile: (
        userId: string,
        profile: Omit<UserProfile, 'userId' | 'updatedAt'>
    ) => {
        post("/profile", { userId, ...profile });
    }
};