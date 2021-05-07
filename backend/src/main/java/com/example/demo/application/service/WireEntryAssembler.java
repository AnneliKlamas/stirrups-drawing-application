package com.example.demo.application.service;

import com.example.demo.application.dto.WireEntityDTO;
import com.example.demo.domain.model.WireEntity;
import com.example.demo.rest.WireRestController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Service;

@Service
public class WireEntryAssembler extends RepresentationModelAssemblerSupport<WireEntity, WireEntityDTO> {

    public WireEntryAssembler(){
        super(WireRestController.class, WireEntityDTO.class);
    }

    @Override
    public WireEntityDTO toModel(WireEntity wireEntity) {
        WireEntityDTO dto = createModelWithId(wireEntity.getId(), wireEntity);
        dto.setId(wireEntity.getId());
        dto.setDiameter(wireEntity.getDiameter());
        dto.setWeight(wireEntity.getWeight());
        dto.setEnStandardRoll(wireEntity.getEn_standard_roll());
        dto.setFinStandardRoll(wireEntity.getFin_standard_roll());
        dto.setEnLengthPerDegree(wireEntity.getEn_length_per_degree());
        dto.setFinLengthPerDegree(wireEntity.getFin_length_per_degree());
        return dto;
    }
}
