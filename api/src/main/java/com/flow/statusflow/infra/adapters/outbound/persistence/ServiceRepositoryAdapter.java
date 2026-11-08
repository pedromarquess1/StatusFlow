package com.flow.statusflow.infra.adapters.outbound.persistence;

import com.flow.statusflow.domain.model.MonitoredService;
import com.flow.statusflow.ports.outbound.ServiceRepositoryPort;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class ServiceRepositoryAdapter implements ServiceRepositoryPort {

    private final SpringDataServiceRepository repository;
    private final ServiceMapper mapper;

    // Injeção de dependências via construtor
    public ServiceRepositoryAdapter(SpringDataServiceRepository repository, ServiceMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public MonitoredService save(MonitoredService service) {
        // 1. Converte do Domínio para Entidade JPA
        ServiceEntity entity = mapper.toEntity(service);
        
        // 2. Salva no banco usando o Spring Data
        ServiceEntity savedEntity = repository.save(entity);
        
        // 3. Converte de volta para Domínio e retorna
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<MonitoredService> findById(Long id) {
        return repository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public Optional<MonitoredService> findByName(String name) {
        return repository.findByName(name)
                .map(mapper::toDomain);
    }

    @Override
    public List<MonitoredService> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}