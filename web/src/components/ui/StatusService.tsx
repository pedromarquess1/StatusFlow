type StatusServiceProps = {
    online: boolean;
};

export default function StatusService({ online }: StatusServiceProps) {
    const styles = online
        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
        : "bg-rose-100 text-rose-700 border-rose-300";

    return (
        <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
        >
        <span className="relative flex h-2 w-2">
            {online && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            )}
            <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
                online ? "bg-emerald-500" : "bg-rose-500"
            }`}
            />
        </span>
        {online ? "Online" : "Offline"}
        </span>
    );
}