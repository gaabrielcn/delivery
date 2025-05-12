package com.delivery.deliverymds.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Garante que o ID seja gerado automaticamente
    private Long id;
    private String nome;
    private Double preco;

    @Enumerated(EnumType.STRING) // Define o tipo como uma enumeração (fruta ou legume)
    private TipoProduto tipo;

    @Enumerated(EnumType.STRING) // Define a unidade de medida (kg, unidade, bandeja)
    private UnidadePreco unidadePreco;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public TipoProduto getTipo() {
        return tipo;
    }

    public void setTipo(TipoProduto tipo) {
        this.tipo = tipo;
    }

    public UnidadePreco getUnidadePreco() {
        return unidadePreco;
    }

    public void setUnidadePreco(UnidadePreco unidadePreco) {
        this.unidadePreco = unidadePreco;
    }

    // Enumeração para os tipos de produto (fruta ou legume)
    public enum TipoProduto {
        FRUTA,
        LEGUME
    }

    // Enumeração para as unidades de medida (kg, unidade, bandeja)
    public enum UnidadePreco {
        KG,
        UNIDADE,
        BANDEJA
    }
}
