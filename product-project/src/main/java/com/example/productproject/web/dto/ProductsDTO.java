package com.example.productproject.web.dto;

import com.example.productproject.web.entity.Products;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class ProductsDTO {
    private Long id;
    @NotNull(message = "products.error.nameIsNull") @NotBlank(message = "products.error.nameIsNull")
    @Size(min = 3, max = 100, message = "products.error.nameSize")
    private String name;
    @Size(max = 255, message = "products.error.description")
    private String description;
    @Min(value = 0, message = "products.error.price")
    private Float price;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDate creation;

    public ProductsDTO(Products products){
        this.id = products.getId();
        this.name = products.getName();
        this.description = products.getDescription();
        this.price = products.getPrice();
        this.creation = products.getCreation();
    }
}
