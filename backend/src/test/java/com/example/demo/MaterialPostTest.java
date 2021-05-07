package com.example.demo;

import com.example.demo.domain.repository.WireRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static sun.plugin2.util.PojoUtil.toJson;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = StirrupProjectApplication.class)
@WebAppConfiguration
@DirtiesContext
public class MaterialPostTest{
    @Autowired
    WireRepository repo;
    @Autowired
    private WebApplicationContext wac;
    private MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Sql("dataset.sql")

    //When all the data complete
    @Test
    public void testCreateNew() throws Exception {

        Material material = new Material((long) 92839, 3, 3.3, 15,
                16, 1,2);

        mockMvc.perform(post("/materials")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(material))).andExpect(status().isCreated());
    }

    //When missing some data
    @Test
    public void testCreateMissing() throws Exception {

        Material material = new Material(3.3, 15,
                16, 1,2);

        mockMvc.perform(post("/materials")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(material))).andExpect(status().isCreated());
    }
}

