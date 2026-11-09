import { useServices } from "../../hooks/useService";
import ServiceCard from "./ServiceCard";

function SkeletonCard() {
    return (
        <div className="h-28 animate-pulse rounded-2xl border border-white/60 bg-white/50 shadow-lg shadow-blue-900/10" />
    );
}

export default function ServiceGrid() {
    const { data, isLoading, isError, refetch } = useServices();

    if (isLoading) {
        return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 1 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
        );
    }

    if (isError && data.length === 0) {
        return (
        <div className="rounded-2xl border border-rose-300 bg-rose-50/80 p-6 text-rose-700 backdrop-blur-xl">
            Não foi possível conectar à API.{" "}
            <button onClick={refetch} className="font-medium underline">
            Tentar novamente
            </button>
        </div>
        );
    }

    if (data.length === 0) {
        return (
        <div className="rounded-2xl border border-dashed border-slate-400/60 bg-white/40 p-12 text-center text-slate-500 backdrop-blur-xl">
            Nenhum serviço cadastrado ainda.
        </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((service) => (
            <ServiceCard key={service.id} service={service} />
        ))}
        </div>
    );
}