package com.example.demo.domain.repository;

import com.example.demo.domain.model.WireEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WireRepository extends JpaRepository<WireEntity, Long>, CustomWireRepository {
}
