package com.example.demo.application.dto;

import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

@Data
public class PriceEntityDTO extends RepresentationModel<PriceEntityDTO> {
    Long id;
    String name;
    Double price;
    boolean showPrice;
}
