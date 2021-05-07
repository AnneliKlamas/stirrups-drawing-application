package com.example.demo.application.service;

import com.example.demo.application.dto.PriceEntityDTO;
import com.example.demo.domain.model.PriceEntity;
import com.example.demo.domain.repository.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PriceService {
    @Autowired
    PriceRepository priceRepository;

    @Autowired
    PriceEntityAssembler priceEntityAssembler;

    public PriceEntity findEntryById(Long id) {
        return priceRepository.findById(id).orElse(null);
    }

    public CollectionModel<PriceEntityDTO> findAll()     {
        List<PriceEntity> entries = priceRepository.findAll();
        return priceEntityAssembler.toCollectionModel(entries);
    }

    public PriceEntityDTO create (PriceEntityDTO peDTO) throws Exception {
        PriceEntity me = PriceEntity.of(peDTO);
        priceRepository.save(me);
        return priceEntityAssembler.toModel(me);
    }

    public PriceEntityDTO deleteME(Long id) throws Exception {
        PriceEntity pe = priceRepository.findById(id).orElse(null);
        validatePE(pe);
        priceRepository.save(pe);
        return priceEntityAssembler.toModel(pe);
    }

    private void validatePE(PriceEntity pe) throws Exception {
        if(pe == null)
            throw new Exception("PE Not Found");
    }

    public PriceEntityDTO updatePE(Long id, String attribute, String value) throws Exception{
        PriceEntity pe = priceRepository.findById(id).orElse(null);
        validatePE(pe);

        if(attribute.equals("price")){
            pe.setPrice(Double.parseDouble(value));
        }
        else if(attribute.equals("showPrice")){
            if (value.equals("true")){
                pe.setShowPrice(true);
            }
            else if (value.equals("false")){
                pe.setShowPrice(false);
            }
        }
        else if(attribute.equals("name")){
            pe.setName(value);
        }
        priceRepository.save(pe);

        return priceEntityAssembler.toModel(pe);

    }
}
