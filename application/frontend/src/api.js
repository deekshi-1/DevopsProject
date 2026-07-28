const API_URL = import.meta.env.VITE_API_URL || "";

export async function getMessage() {

    const response = await fetch(`${API_URL}/api/message`);

    if (!response.ok) {
        throw new Error("API request failed");
    }

    return response.json();
}