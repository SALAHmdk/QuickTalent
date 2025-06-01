package Plateform.QuickTalent.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Plateform.QuickTalent.dto.RecruteurDto;
import Plateform.QuickTalent.entite.Recruteur;
import Plateform.QuickTalent.repository.RecruteurRepository;

@RestController
@RequestMapping("/api/recruteurs")
public class RecruteuRestController {

    @Autowired
    private RecruteurRepository recruteurRepository;

    @GetMapping
    public List<RecruteurDto> getAllRecruteurs() {
        return recruteurRepository.findAll()
                .stream()
                .map(r -> toDto(r))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecruteurDto> getRecruteurParId(@PathVariable Long id) {
        return recruteurRepository.findById(id)
                .map(r -> toDto(r))
                .map(dto -> ResponseEntity.ok(dto))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RecruteurDto creerRecruteur(@RequestBody RecruteurDto dto) {
        Recruteur recruteur = new Recruteur();
        recruteur.setEntreprise(dto.getEntreprise());
        Recruteur saved = recruteurRepository.save(recruteur);
        return toDto(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecruteurDto> mettreAJourRecruteur(
            @PathVariable Long id,
            @RequestBody RecruteurDto dto) {
        return recruteurRepository.findById(id)
                .map(existing -> {
                    existing.setEntreprise(dto.getEntreprise());
                    Recruteur updated = recruteurRepository.save(existing);
                    return ResponseEntity.ok(toDto(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerRecruteur(@PathVariable Long id) {
        return recruteurRepository.findById(id)
                .map(existing -> {
                    recruteurRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private RecruteurDto toDto(Recruteur r) {
        RecruteurDto dto = new RecruteurDto();
        dto.setId(r.getId());
        dto.setEntreprise(r.getEntreprise());
        return dto;
    }
}
