package com.example.demo;

import com.example.demo.application.dto.WireEntityDTO;
import com.example.demo.domain.model.WireEntity;
import com.example.demo.domain.repository.WireRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.assertj.core.api.Assertions.assertThat;



@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = StirrupProjectApplication.class) // Check if the name of this class is correct or not
@WebAppConfiguration
@DirtiesContext
public class materialRestControllerTests {
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

    @Sql("testdataset.sql")

    @Test
    public void testGetAllWires() throws Exception {
        MvcResult result = mockMvc.perform(get("/materials")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode wiresJSON = mapper.readTree(result.getResponse().getContentAsString())
                .path("_embedded")
                .path("materialEntryDTOList");

        List<WireEntityDTO> wires  = mapper.readValue(wiresJSON.toString(), new TypeReference<List<WireEntityDTO>>() { });

        assertThat(wires.size()).isEqualTo(8);
    }

    @Test
    public void testGetWireByDiameter8() throws Exception{
        MvcResult result = mockMvc.perform(get("/materials/diameter?diameter=8")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode plantsJSON = mapper.readTree(result.getResponse().getContentAsString())
                .path("_embedded")
                .path("materialEntryDTOList");

        List<WireEntityDTO> wires  = mapper.readValue(plantsJSON.toString(), new TypeReference<List<WireEntityDTO>>() { });
        assertThat(wires.size()).isEqualTo(1);
        WireEntityDTO wire = wires.get(0);
        assertThat(wire.getDiameter()==8);
    }

    @Test
    public void testGetWireByDiameter7() throws Exception{
        MvcResult result = mockMvc.perform(get("/materials/diameter?diameter=7")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode plantsJSON = mapper.readTree(result.getResponse().getContentAsString())
                .path("_embedded")
                .path("materialEntryDTOList");

        List<WireEntityDTO> wires  = mapper.readValue(plantsJSON.toString(), new TypeReference<List<WireEntityDTO>>() { });
        assertThat(wires.size()).isEqualTo(1);
        WireEntityDTO wire = wires.get(0);
        assertThat(wire.getDiameter()==7);
    }

    @Test
    public void testGetWireById1() throws Exception{
        MvcResult result = mockMvc.perform(get("/materials/id?id=1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode plantsJSON = mapper.readTree(result.getResponse().getContentAsString());

        WireEntity wire  = mapper.readValue(plantsJSON.toString(), new TypeReference<WireEntity>() { });
        assertThat(wire.getId()==1);
    }

    @Test
    public void testGetWireById6() throws Exception{
        MvcResult result = mockMvc.perform(get("/materials/id?id=6")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode plantsJSON = mapper.readTree(result.getResponse().getContentAsString());

        WireEntity wire  = mapper.readValue(plantsJSON.toString(), new TypeReference<WireEntity>() { });
        assertThat(wire.getId()==6);
    }


}