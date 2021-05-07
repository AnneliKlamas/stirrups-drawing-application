package com.example.demo.application.service;

import com.example.demo.application.dto.WireEntityDTO;
import com.example.demo.domain.model.WireEntity;
import com.example.demo.domain.repository.WireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class WireService {

    @Autowired
    WireRepository materialRepository;

    @Autowired
    WireEntryAssembler wireEntryAssembler;

    public WireEntity findEntryById(Long id) {
        return materialRepository.findById(id).orElse(null);
    }

    public CollectionModel<WireEntityDTO> findAvailableWire(int diameter)     {
        List<WireEntity> entries = materialRepository.findAvailable(diameter);
        return wireEntryAssembler.toCollectionModel(entries);
    }

    public CollectionModel<WireEntityDTO> findAll()     {
        List<WireEntity> entries = materialRepository.findAll();
        return wireEntryAssembler.toCollectionModel(entries);
    }

    public WireEntityDTO create (WireEntityDTO meDTO) throws Exception {

        WireEntity me = WireEntity.of(meDTO);
        materialRepository.save(me);
        return wireEntryAssembler.toModel(me);
    }

    public WireEntityDTO deleteME(Long id) throws Exception {
        WireEntity me = materialRepository.findById(id).orElse(null);
        validateME(me);
        materialRepository.deleteById(id);
        return wireEntryAssembler.toModel(me);
    }

    private void validateME(WireEntity me) throws Exception {
        if(me == null)
            throw new Exception("ME Not Found");

    }

    public WireEntityDTO updateME(Long id, String attribute, double value) throws Exception{
        WireEntity me = materialRepository.findById(id).orElse(null);
        validateME(me);

        if(attribute.equals("weight")){
            me.setWeight(value);
        }
        else if(attribute.equals("en_length_per_degree")){
            me.setEn_length_per_degree(value);
        }
        else if(attribute.equals("fin_length_per_degree")){
            me.setFin_length_per_degree(value);
        }
        else if(attribute.equals("en_standard_roll")){
            me.setEn_standard_roll((int)value);
        }
        else if(attribute.equals("fin_standard_roll")){
            me.setFin_standard_roll((int)value);
        }
        else {
            throw new Exception("Attribute not found");
        }
        materialRepository.save(me);

        return wireEntryAssembler.toModel(me);

    }

}