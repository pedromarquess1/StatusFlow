package com.flow.statusflow.infra.adapters.outbound.persistence;

import com.flow.statusflow.domain.model.MonitoredService;
import org.springframework.stereotype.Component;

@Component
public class ServiceMapper {

    // Converte do Domínio para a Entidade JPA (para salvar no banco)
    public ServiceEntity toEntity(MonitoredService domain) {
        if (domain == null) {
            return null;
        }

        return ServiceEntity.builder()
                .id(domain.getId())
                .name(domain.getName())
                .url(domain.getUrl())
                .status(domain.getStatus())
                .build();
    }

    // Converte da Entidade JPA para o Domínio (quando busca do banco)
    public MonitoredService toDomain(ServiceEntity entity) {
        if (entity == null) {
            return null;
        }

        return new MonitoredService(
                entity.getId(),
                entity.getName(),
                entity.getUrl(),
                entity.getStatus()
        );
    }
}