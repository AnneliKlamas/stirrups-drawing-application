package com.example.demo.security.repositories;

import java.util.Optional;

import com.example.demo.security.models.ERole;
import com.example.demo.security.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
