package com.example.demo;

import com.example.demo.rest.WireRestController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class someTests {
    @Autowired
    private WireRestController restController;

    @Test
    void contextLoads() {
    }


    @Test
    public void contextLoadsRestController() throws Exception {
        assertThat(restController).isNotNull();
    }
}
