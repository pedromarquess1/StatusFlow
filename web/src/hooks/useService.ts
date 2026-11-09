import { useCallback, useEffect, useState } from "react";
import { getServices } from "../services/api";
import type { MonitoredService } from "../types/service";

export function useServices(intervalMs = 15_000) {
    const [data, setData] = useState<MonitoredService[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const load = useCallback(async (signal?: AbortSignal) => {
        try {
            const services = await getServices(signal);
            setData(services);
            setIsError(false);
        } catch {
            if (signal?.aborted) return;
            setIsError(true);
        } finally {
            if (!signal?.aborted) setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        load(controller.signal);
        const timer = setInterval(() => load(controller.signal), intervalMs);

        return () => {
            controller.abort();
            clearInterval(timer);
        };
    }, [load, intervalMs]);

    const refetch = useCallback(() => load(), [load]);

    return { data, isLoading, isError, refetch };
}