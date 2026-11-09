import axios from "axios";
import type { MonitoredService, ServiceInput } from "../types/service";

const req = axios.create({
    baseURL: "/api",
    timeout: 10_000,
});

export async function getServices(signal?: AbortSignal) {
    const { data } = await req.get<MonitoredService[]>("/services", { signal });
    return data;
}

export async function createService(body: { name: string; url: string }) {
    const { data } = await req.post<MonitoredService>("/services", body);
    return data;
}

export async function updateService(id: number, body: ServiceInput) {
    const { data } = await req.put<MonitoredService>(`/services/${id}`, body);
    return data;
}

export async function deleteService(id: number) {
    await req.delete(`/services/${id}`);
}

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? "Não foi possível falar com a API.";
    }
    return "Algo deu errado. Tente novamente.";
}