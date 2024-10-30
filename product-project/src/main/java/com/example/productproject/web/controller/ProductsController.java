package com.example.productproject.web.controller;

import com.example.productproject.exception.InvalidDtoException;
import com.example.productproject.web.dto.ProductsDTO;
import com.example.productproject.web.entity.Products;
import com.example.productproject.web.service.ProductsService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
@CrossOrigin
@RestController
public class ProductsController {
    private final ProductsService productsService;

    @Autowired
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @PostMapping("/products")
    public ResponseEntity<ProductsDTO> productsPost(@RequestBody ProductsDTO productsDTO) throws InvalidDtoException {
        List<String> violations = verifyDTO(productsDTO);
        if(!violations.isEmpty()){
            throw new InvalidDtoException(violations);
        }
        productsDTO.setId(null);
        Products products = productsService.saveProduct(productsDTO);
        ProductsDTO response = new ProductsDTO(products);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping("/products")
    public ResponseEntity<List<ProductsDTO>> productsGet(){
        List<Products> products = productsService.getAllProducts();
        List<ProductsDTO> response = products.stream().map(ProductsDTO::new).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductsDTO> productsGetByID(@PathVariable("id") Long id){
        Optional<Products> optionalProducts = productsService.getProductByID(id);
        if(optionalProducts.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        ProductsDTO response = new ProductsDTO(optionalProducts.get());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductsDTO> productsPutByID(@PathVariable("id") Long id, @RequestBody ProductsDTO productsDTO) throws InvalidDtoException {
        List<String> violations = verifyDTO(productsDTO);
        if(!violations.isEmpty()){
            throw new InvalidDtoException(violations);
        }

        Optional<Products> optionalProducts = productsService.getProductByID(id);
        if(optionalProducts.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        productsDTO.setId(optionalProducts.get().getId());
        Products products = productsService.saveProduct(productsDTO);
        ProductsDTO response = new ProductsDTO(products);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> productsDeleteByID(@PathVariable("id") Long id){
        Optional<Products> optionalProducts = productsService.getProductByID(id);
        if(optionalProducts.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        productsService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private List<String> verifyDTO(ProductsDTO productsDTO){
        Validator validator;
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            validator = factory.getValidator();
            Set<ConstraintViolation<ProductsDTO>> violations = validator.validate(productsDTO);
            return violations.stream().map(ConstraintViolation::getMessage).toList();
        }
    }
}
