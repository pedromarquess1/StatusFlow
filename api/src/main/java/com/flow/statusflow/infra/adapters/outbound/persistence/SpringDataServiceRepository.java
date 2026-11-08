package com.flow.statusflow.infra.adapters.outbound.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SpringDataServiceRepository extends JpaRepository<ServiceEntity, Long> {

    Optional<ServiceEntity> findByName(String name);
}