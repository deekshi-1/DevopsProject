
export async function getMessage() {
    const response = await fetch("/api/message");
    return response.json();
}