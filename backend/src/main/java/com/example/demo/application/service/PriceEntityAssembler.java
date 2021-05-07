package com.example.demo.application.service;

import com.example.demo.application.dto.PriceEntityDTO;
import com.example.demo.domain.model.PriceEntity;
import com.example.demo.rest.PriceRestController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Service;

@Service
public class PriceEntityAssembler extends RepresentationModelAssemblerSupport<PriceEntity, PriceEntityDTO> {

    public PriceEntityAssembler(){
        super(PriceRestController.class, PriceEntityDTO.class);
    }

    @Override
    public PriceEntityDTO toModel(PriceEntity priceEntity) {
        PriceEntityDTO dto = createModelWithId(priceEntity.getId(), priceEntity);
        dto.setId(priceEntity.getId());
        dto.setName(priceEntity.getName());
        dto.setPrice(priceEntity.getPrice());
        dto.setShowPrice(priceEntity.isShowPrice());
        return dto;
    }
}
