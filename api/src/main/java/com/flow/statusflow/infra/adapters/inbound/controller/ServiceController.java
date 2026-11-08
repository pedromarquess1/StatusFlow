package com.flow.statusflow.infra.adapters.inbound.controller;

import com.flow.statusflow.domain.model.MonitoredService;
import com.flow.statusflow.usecase.DeleteServiceUseCase;
import com.flow.statusflow.usecase.FindAllServicesUseCase;
import com.flow.statusflow.usecase.FindServiceByIdUseCase;
import com.flow.statusflow.usecase.RegisterServiceUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final RegisterServiceUseCase registerServiceUseCase;
    private final FindAllServicesUseCase findAllServicesUseCase;
    private final FindServiceByIdUseCase findServiceByIdUseCase;
    private final DeleteServiceUseCase deleteServiceUseCase;

    public ServiceController(RegisterServiceUseCase registerServiceUseCase,
                            FindAllServicesUseCase findAllServicesUseCase,
                            FindServiceByIdUseCase findServiceByIdUseCase,
                            DeleteServiceUseCase deleteServiceUseCase) {
        this.registerServiceUseCase = registerServiceUseCase;
        this.findAllServicesUseCase = findAllServicesUseCase;
        this.findServiceByIdUseCase = findServiceByIdUseCase;
        this.deleteServiceUseCase = deleteServiceUseCase;
    }

    public record ServiceRequestDTO(String name, String url) {}

    @PostMapping
    public ResponseEntity<MonitoredService> register(@RequestBody ServiceRequestDTO request) {
        MonitoredService createdService = registerServiceUseCase.execute(request.name(), request.url());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdService);
    }

    @GetMapping
    public ResponseEntity<List<MonitoredService>> getAll() {
        List<MonitoredService> services = findAllServicesUseCase.execute();
        return ResponseEntity.ok(services);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonitoredService> getById(@PathVariable Long id) {
        return findServiceByIdUseCase.execute(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        deleteServiceUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}