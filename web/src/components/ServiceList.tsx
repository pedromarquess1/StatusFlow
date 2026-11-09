import ServiceGrid from "./ui/ServiceGrid";

export default function ServiceList() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-slate-500">
                Serviços monitorados
            </h2>
            <ServiceGrid />
        </main>
    );
}