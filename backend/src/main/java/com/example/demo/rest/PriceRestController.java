package com.example.demo.rest;

import com.example.demo.application.dto.PriceEntityDTO;
import com.example.demo.application.service.PriceService;
import com.example.demo.domain.model.PriceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/price")

public class PriceRestController {

    @Autowired
    PriceService priceService;

    //get all
    @GetMapping("")
    public CollectionModel<PriceEntityDTO> findAll() {
        return priceService.findAll();
    }

    //get by id
    @GetMapping("/id")
    public PriceEntity findWithId(@RequestParam(name = "id" ) Long id) {
        return priceService.findEntryById(id);
    }

    //add
    @PostMapping("")
    public ResponseEntity<PriceEntityDTO> createNewPrice(@RequestBody PriceEntityDTO partialDTO) throws Exception{
        PriceEntityDTO newlyCreateDTO = priceService.create(partialDTO);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(newlyCreateDTO.getRequiredLink(IanaLinkRelations.SELF).toUri());
        return new ResponseEntity<>(newlyCreateDTO, headers, HttpStatus.CREATED);
    }

    //delete
    @DeleteMapping(value ="/{id}/delete")
    public PriceEntityDTO deletePrice(@PathVariable Long id) throws Exception{
        try {
            return priceService.deleteME(id);
        } catch(Exception ex) {
            // Add code to Handle Exception (Change return null with the solution)
            return null;
        }
    }

    //update
    //id and attribute
    @PatchMapping("update/{id}")
    public PriceEntityDTO updatePrice(@PathVariable Long id, @RequestParam(name = "attribute") String attribute,
                                           @RequestParam(name = "newValue") String value){
        try {
            return priceService.updatePE(id, attribute, value);
        } catch(Exception ex) {
            // Add code to Handle Exception (Change return null with the solution)
            return null;
        }
    }
}
