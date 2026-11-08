package com.flow.statusflow.ports.outbound;

import com.flow.statusflow.domain.model.MonitoredService;
import java.util.List;
import java.util.Optional;

public interface ServiceRepositoryPort {

    MonitoredService save(MonitoredService service);

    Optional<MonitoredService> findById(Long id);

    Optional<MonitoredService> findByName(String name);

    List<MonitoredService> findAll();

    void deleteById(Long id);
}