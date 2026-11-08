package com.flow.statusflow.usecase;

import com.flow.statusflow.domain.model.MonitoredService;
import com.flow.statusflow.ports.outbound.ServiceRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceUseCase {

    private final ServiceRepositoryPort serviceRepositoryPort;

    // Injeção da porta de saída via construtor
    public RegisterServiceUseCase(ServiceRepositoryPort serviceRepositoryPort) {
        this.serviceRepositoryPort = serviceRepositoryPort;
    }

    public MonitoredService execute(String name, String url) {
        // 1. Criamos a entidade de domínio. 
        // Lembra-te que o construtor do MonitoredService já valida se a URL é válida!
        MonitoredService newService = new MonitoredService(null, name, url, true);

        // 2. Persistimos utilizando a porta de saída
        return serviceRepositoryPort.save(newService);
    }
}