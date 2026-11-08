package com.flow.statusflow.usecase;

import com.flow.statusflow.ports.outbound.ServiceRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class DeleteServiceUseCase {

    private final ServiceRepositoryPort serviceRepositoryPort;

    public DeleteServiceUseCase(ServiceRepositoryPort serviceRepositoryPort) {
        this.serviceRepositoryPort = serviceRepositoryPort;
    }

    public void execute(Long id) {
        serviceRepositoryPort.deleteById(id);
    }
}