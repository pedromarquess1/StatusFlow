import type { MonitoredService } from "../../types/service";
import StatusService from "./StatusService";

type ServiceCardProps = {
    service: MonitoredService;
};

export default function ServiceCard({ service }: ServiceCardProps) {
    const accent = service.status
    ? "border-white/60 shadow-blue-900/10 hover:shadow-emerald-500/20"
    : "border-rose-300 shadow-rose-500/20";

    return (
        <article
        className={`rounded-2xl border bg-gradient-to-br from-white/80 to-white/50 p-5 shadow-lg
        backdrop-blur-xl backdrop-saturate-150 transition hover:-translate-y-0.5 ${accent}`}
        >
        <div className="flex items-start justify-between gap-3">
            <h3 className="truncate text-lg font-semibold text-slate-900">
            {service.name}
            </h3>
            <StatusService online={service.status} />
        </div>

        <p className="mt-3 truncate font-mono text-sm text-slate-500">
            {service.url}
        </p>
        </article>
    );
}