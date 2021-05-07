package com.example.demo.domain.repository;

import com.example.demo.domain.model.WireEntity;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import java.util.List;

public class WireRepositoryImpl implements CustomWireRepository {

    @Autowired
    EntityManager em;

    @Override
    public List<WireEntity> findAvailable(int diameter) {
        return em.createQuery("select e from WireEntity e where e.diameter = ?1", WireEntity.class)
                .setParameter(1, diameter)
                .getResultList();
    }
}
