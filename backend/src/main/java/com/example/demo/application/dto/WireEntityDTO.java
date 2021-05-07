package com.example.demo.application.dto;

import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

@Data
public class WireEntityDTO extends RepresentationModel<WireEntityDTO> {
    Long id;
    int diameter;
    Double weight;
    int enStandardRoll;
    int finStandardRoll;
    double enLengthPerDegree;
    double finLengthPerDegree;
}
