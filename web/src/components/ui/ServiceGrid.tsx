import { useState } from "react";
import { deleteService, updateService } from "../../services/api";
import { useServices } from "../../hooks/useService";
import type { MonitoredService } from "../../types/service";
import ConfirmDialog from "./Confirm";
import ServiceCard from "./ServiceCard";
import ServiceFormModal from "./ServiceForm";

function SkeletonCard() {
    return (
        <div className="h-28 animate-pulse rounded-2xl border border-white/60 bg-white/50 shadow-lg shadow-blue-900/10" />
    );
}

export default function ServiceGrid() {
    const { data, isLoading, isError, refetch } = useServices();
    const [editing, setEditing] = useState<MonitoredService | null>(null);
    const [deleting, setDeleting] = useState<MonitoredService | null>(null);

    if (isLoading) {
        return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
            ))}
        </div>
        );
    }

    if (isError && data.length === 0) {
        return (
        <div className="rounded-2xl border border-rose-300 bg-rose-50/80 p-6 text-rose-700 backdrop-blur-xl">
            Não foi possível conectar à API.{" "}
            <button onClick={() => refetch()} className="font-medium underline">
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
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((service) => (
                <ServiceCard
                    key={service.id}
                    service={service}
                    onEdit={setEditing}
                    onDelete={setDeleting}
                />
                ))}
            </div>

            {editing && (
                <ServiceFormModal
                title="Editar serviço"
                submitLabel="Salvar"
                initialValues={{ name: editing.name, url: editing.url }}
                onSubmit={async (values) => {
                    await updateService(editing.id, values);
                    await refetch();
                    setEditing(null);
                }}
                onClose={() => setEditing(null)}
                />
            )}

            {deleting && (
                <ConfirmDialog
                title="Excluir serviço"
                message={`Tem certeza que deseja excluir "${deleting.name}"? Essa ação não pode ser desfeita.`}
                confirmLabel="Excluir"
                onConfirm={async () => {
                    await deleteService(deleting.id);
                    await refetch();
                    setDeleting(null);
                }}
                onClose={() => setDeleting(null)}
                />
            )}
        </>
    );
}