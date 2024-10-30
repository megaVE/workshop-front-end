package com.example.productproject.web.service;

import com.example.productproject.web.dto.ProductsDTO;
import com.example.productproject.web.entity.Products;
import com.example.productproject.web.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {
    private final ProductsRepository productsRepository;

    @Autowired
    public ProductsService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    public Products saveProduct(ProductsDTO productsDTO){
        Products productsEntity = new Products(productsDTO);
        return productsRepository.save(productsEntity);
    }
    
    public List<Products> getAllProducts(){
        return productsRepository.findAll();
    }
    
    public Optional<Products> getProductByID(Long id){
        return productsRepository.findById(id);
    }

    public void deleteProduct(Long id){
        productsRepository.deleteById(id);
    }
}
