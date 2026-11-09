package com.flow.statusflow.usecase;

import com.flow.statusflow.domain.model.MonitoredService;
import com.flow.statusflow.ports.outbound.ServiceRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpdateServiceUseCase {

    private final ServiceRepositoryPort serviceRepositoryPort;

    public UpdateServiceUseCase(ServiceRepositoryPort serviceRepositoryPort) {
        this.serviceRepositoryPort = serviceRepositoryPort;
    }

    public Optional<MonitoredService> execute(Long id, String name, String url) {
        return serviceRepositoryPort.findById(id)
                .map(existing -> serviceRepositoryPort.save(
                        new MonitoredService(existing.getId(), name, url, existing.getStatus())
                ));
    }
}