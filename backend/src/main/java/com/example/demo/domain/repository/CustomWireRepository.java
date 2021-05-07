package com.example.demo.domain.repository;

import com.example.demo.domain.model.WireEntity;

import java.util.List;

public interface CustomWireRepository {
    List<WireEntity> findAvailable(int diameter);
}
