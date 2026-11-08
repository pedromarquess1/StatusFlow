package com.flow.statusflow.usecase;

import com.flow.statusflow.domain.model.MonitoredService;
import com.flow.statusflow.ports.outbound.ServiceRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FindAllServicesUseCase {

    private final ServiceRepositoryPort serviceRepositoryPort;

    public FindAllServicesUseCase(ServiceRepositoryPort serviceRepositoryPort) {
        this.serviceRepositoryPort = serviceRepositoryPort;
    }

    public List<MonitoredService> execute() {
        return serviceRepositoryPort.findAll();
    }
}