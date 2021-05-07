package com.example.demo.rest;

import com.example.demo.application.dto.WireEntityDTO;
import com.example.demo.application.service.WireService;
import com.example.demo.domain.model.WireEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/wires")
public class WireRestController {

    @Autowired
    WireService wireService;

    //get all
    @GetMapping("")
    public CollectionModel<WireEntityDTO> findAll() {
      return wireService.findAll();
    }

    //get with diameter
    @GetMapping("/diameter")
    public CollectionModel<WireEntityDTO> findWithDiameter(@RequestParam(name = "diameter" ) int diameter) {
        return wireService.findAvailableWire(diameter);
    }

    //get by id diameter
    @GetMapping("/id")
    public WireEntity findWithId(@RequestParam(name = "id" ) Long id) {
        return wireService.findEntryById(id);
    }


    //add
    @PostMapping("add")
    public ResponseEntity<WireEntityDTO> createNewMaterial(@RequestBody WireEntityDTO partialDTO) throws Exception{
        WireEntityDTO newlyCreateDTO = wireService.create(partialDTO);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(newlyCreateDTO.getRequiredLink(IanaLinkRelations.SELF).toUri());

        return new ResponseEntity<>(newlyCreateDTO, headers, HttpStatus.CREATED);
    }

    //update
    //id and attribute
    @PatchMapping("update/{id}")
    public WireEntityDTO updateMaterial(@PathVariable Long id, @RequestParam(name = "attribute") String attribute,
                                        @RequestParam(name = "newValue") double value){

        try {
            return wireService.updateME(id, attribute, value);
        } catch(Exception ex) {
            // Add code to Handle Exception (Change return null with the solution)
            return null;
        }
    }


    //delete
    @DeleteMapping(value ="/delete/{id}")
    public WireEntityDTO deleteMaterial(@PathVariable Long id) throws Exception{
        try {
            return wireService.deleteME(id);
        } catch(Exception ex) {
            // Add code to Handle Exception (Change return null with the solution)
            return null;
        }
    }
}
