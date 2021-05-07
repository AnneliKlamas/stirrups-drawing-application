package com.example.demo.domain.model;

import com.example.demo.application.dto.PriceEntityDTO;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class PriceEntity {

    @Id
    @GeneratedValue
    Long id;

    String name;
    double price;
    boolean showPrice;

    public static PriceEntity of(PriceEntityDTO entity) {
        PriceEntity pe = new PriceEntity();
        pe.id = entity.getId();
        pe.price = entity.getPrice();
        pe.showPrice = entity.isShowPrice();
        return pe;
    }
}
