package com.example.demo;

public class Material {
    Long id;
    int diameter;
    Double weight;
    int enStandardRoll;
    int finStandardRoll;
    double enLengthPerDegree;
    double finLengthPerDegree;

    public Material(Long id, int diameter, Double weight, int enStandardRoll, int finStandardRoll, double enLengthPerDegree, double finLengthPerDegree) {
        this.id = id;
        this.diameter = diameter;
        this.weight = weight;
        this.enStandardRoll = enStandardRoll;
        this.finStandardRoll = finStandardRoll;
        this.enLengthPerDegree = enLengthPerDegree;
        this.finLengthPerDegree = finLengthPerDegree;
    }

    public Material(Double weight, int enStandardRoll, int finStandardRoll, double enLengthPerDegree, double finLengthPerDegree) {
        this.weight = weight;
        this.enStandardRoll = enStandardRoll;
        this.finStandardRoll = finStandardRoll;
        this.enLengthPerDegree = enLengthPerDegree;
        this.finLengthPerDegree = finLengthPerDegree;
    }


}
