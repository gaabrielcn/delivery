package com.delivery.deliverymds.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.delivery.deliverymds.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
