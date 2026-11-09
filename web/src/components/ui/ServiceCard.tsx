import type { ServiceCardProps } from "../../types/service";
import StatusService from "../ui/StatusService";

export default function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
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

            <div className="mt-3 flex items-center justify-between gap-3">
                <p className="truncate font-mono text-sm text-slate-500">{service.url}</p>

                <div className="flex shrink-0 gap-1">
                    <button
                        type="button"
                        onClick={() => onEdit(service)}
                        aria-label={`Editar ${service.name}`}
                        title="Editar"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-white/80 hover:text-blue-900"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(service)}
                        aria-label={`Excluir ${service.name}`}
                        title="Excluir"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-white/80 hover:text-rose-600"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
}