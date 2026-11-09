import { useState, type FormEvent } from "react";
import { getErrorMessage } from "../../services/api";
import type { ServiceFormModalProps } from "../../types/service";
import Modal from "./Modal";

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm text-slate-900 " +
    "outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20";

export default function ServiceFormModal({
    title,
    submitLabel,
    initialValues = { name: "", url: "" },
    onSubmit,
    onClose,
}: ServiceFormModalProps) {
    const [name, setName] = useState(initialValues.name);
    const [url, setUrl] = useState(initialValues.url);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
            e.preventDefault();
            setBusy(true);
            setError(null);
        try {
            await onSubmit({ name: name.trim(), url: url.trim() });
        } catch (err) {
            setError(getErrorMessage(err));
            setBusy(false);
        }
    }

    return (
        <Modal title={title} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="mb-1 block text-sm font-medium text-slate-700">Nome</span>
                    <input
                        className={inputClass}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        required
                        autoFocus
                    />
                </label>

                <label className="block">
                    <span className="mb-1 block text-sm font-medium text-slate-700">URL</span>
                    <input
                        className={`${inputClass} font-mono`}
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        maxLength={255}
                        placeholder="https://exemplo.com/health"
                        required
                    />
                </label>

                {error && <p className="text-sm text-rose-600">{error}</p>}

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={busy}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={busy}
                        className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white transition
                        hover:bg-blue-800 disabled:opacity-60"
                    >
                        {busy ? "Salvando..." : submitLabel}
                    </button>
                </div>
            </form>
        </Modal>
    );
}