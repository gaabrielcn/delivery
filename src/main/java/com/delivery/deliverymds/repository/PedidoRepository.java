package com.delivery.deliverymds.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.delivery.deliverymds.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
