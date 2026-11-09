import { useState } from "react";
import { createService } from "./services/api";
import Header from "./components/Header";
import ServiceForm from "./components/ui/ServiceForm";
import { useServices } from "./hooks/useService";
import ServiceList from "./components/ServiceList";

function App() {
  const services = useServices();
  const [creating, setCreating] = useState(false);

  return (
    <>
      <Header>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2 text-sm font-medium text-white
          shadow-md shadow-blue-900/20 transition hover:bg-blue-800 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Novo serviço
        </button>
      </Header>

      <ServiceList />

      {creating && (
        <ServiceForm
          title="Novo serviço"
          submitLabel="Cadastrar"
          onSubmit={async (values) => {
            await createService(values);
            await services.refetch();
            setCreating(false);
          }}
          onClose={() => setCreating(false)}
        />
      )}
    </>
  );
}

export default App;