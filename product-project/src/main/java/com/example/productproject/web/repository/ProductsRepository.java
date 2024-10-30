package com.example.productproject.web.repository;

import com.example.productproject.web.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
}
