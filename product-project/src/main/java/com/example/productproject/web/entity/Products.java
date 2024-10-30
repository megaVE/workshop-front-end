package com.example.productproject.web.entity;

import com.example.productproject.web.dto.ProductsDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.ZoneId;

@Entity
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Float price;
    private LocalDate creation;
    public Products(ProductsDTO productsDTO){
        this.id = productsDTO.getId();
        this.name = productsDTO.getName();
        this.description = productsDTO.getDescription();
        this.price = productsDTO.getPrice();
    }

    @PrePersist @PreUpdate
    private void setCreationDate(){
        this.creation = LocalDate.now(ZoneId.of("UTC"));
    }

}
