package com.delivery.deliverymds.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.delivery.deliverymds.model.Produto;
import com.delivery.deliverymds.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    // Salvar um produto
    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    // Buscar todos os produtos
    public List<Produto> buscarTodosProdutos() {
        return produtoRepository.findAll();
    }

    // Buscar um produto por ID
    public Optional<Produto> buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    // Deletar um produto
    public void deletarProduto(Long id) {
        produtoRepository.deleteById(id);
    }
}
