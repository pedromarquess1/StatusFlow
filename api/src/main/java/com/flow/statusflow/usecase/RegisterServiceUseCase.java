package com.flow.statusflow.usecase;

import com.flow.statusflow.domain.model.MonitoredService;
import com.flow.statusflow.ports.outbound.ServiceRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceUseCase {

    private final ServiceRepositoryPort serviceRepositoryPort;

    public RegisterServiceUseCase(ServiceRepositoryPort serviceRepositoryPort) {
        this.serviceRepositoryPort = serviceRepositoryPort;
    }

    public MonitoredService execute(String name, String url) {
        MonitoredService newService = new MonitoredService(null, name, url, true);

        return serviceRepositoryPort.save(newService);
    }
}