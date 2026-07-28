export async function healthCheck() {

    const response = await fetch("/api/healthcheck");

    if (!response.ok) {
        throw new Error("Backend unavailable");
    }

    return response.json();
}