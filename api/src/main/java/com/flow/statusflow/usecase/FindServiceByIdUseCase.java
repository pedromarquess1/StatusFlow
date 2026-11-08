package com.flow.statusflow.usecase;

import com.flow.statusflow.domain.model.MonitoredService;
import com.flow.statusflow.ports.outbound.ServiceRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FindServiceByIdUseCase {

    private final ServiceRepositoryPort serviceRepositoryPort;

    public FindServiceByIdUseCase(ServiceRepositoryPort serviceRepositoryPort) {
        this.serviceRepositoryPort = serviceRepositoryPort;
    }

    public Optional<MonitoredService> execute(Long id) {
        return serviceRepositoryPort.findById(id);
    }
}