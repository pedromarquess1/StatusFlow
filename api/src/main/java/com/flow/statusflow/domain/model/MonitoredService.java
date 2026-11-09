package com.flow.statusflow.domain.model;

public class MonitoredService {

    private Long id;
    private String name;
    private String url;
    private Boolean status;

    public MonitoredService(Long id, String name, String url, Boolean status) {
    
        if (url == null || url.isBlank()) {
            throw new IllegalArgumentException("A URL do serviço não pode ser nula ou vazia.");
        }

        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("O nome do serviço não pode ser nulo ou vazio.");
        }

        this.id = id;
        this.name = name;
        this.url = url;
        this.status = status;
    
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }

    public Boolean getStatus() {
        return status;
    }

}
