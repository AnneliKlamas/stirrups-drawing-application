package com.example.demo.domain.model;

import com.example.demo.application.dto.WireEntityDTO;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class WireEntity {

    @Id @GeneratedValue
    Long id;

    int diameter;
    //Weight per 1m
    double weight;
    int en_standard_roll;
    int fin_standard_roll;
    double en_length_per_degree;
    double fin_length_per_degree;

    public static WireEntity of(WireEntityDTO entry) {
        WireEntity me = new WireEntity();
        me.id = entry.getId();
        me.diameter = entry.getDiameter();
        me.weight = entry.getWeight();
        me.en_standard_roll = entry.getEnStandardRoll();
        me.fin_standard_roll = entry.getFinStandardRoll();
        me.en_length_per_degree = entry.getEnLengthPerDegree();
        me.fin_length_per_degree = entry.getFinLengthPerDegree();
        return me;
    }


}
