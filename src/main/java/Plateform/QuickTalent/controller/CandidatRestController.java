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

import Plateform.QuickTalent.dto.CandidatDto;
import Plateform.QuickTalent.entite.Candidat;
import Plateform.QuickTalent.repository.CandidatRepository;

@RestController
@RequestMapping("/api/candidats")
public class CandidatRestController {

    @Autowired
    private CandidatRepository candidatRepository;

    @GetMapping
    public List<CandidatDto> getAllCandidats() {
        return candidatRepository.findAll()
                .stream()
                .map(c -> toDto(c))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidatDto> getCandidatParId(@PathVariable Long id) {
        return candidatRepository.findById(id)
                .map(c -> toDto(c))
                .map(dto -> ResponseEntity.ok(dto))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CandidatDto creerCandidat(@RequestBody CandidatDto dto) {
        Candidat candidat = new Candidat();
        candidat.setPrenom(dto.getPrenom());
        candidat.setNom(dto.getNom());
        Candidat saved = candidatRepository.save(candidat);
        return toDto(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidatDto> mettreAJourCandidat(
            @PathVariable Long id,
            @RequestBody CandidatDto dto) {
        return candidatRepository.findById(id)
                .map(existing -> {
                    existing.setPrenom(dto.getPrenom());
                    existing.setNom(dto.getNom());
                    Candidat updated = candidatRepository.save(existing);
                    return ResponseEntity.ok(toDto(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerCandidat(@PathVariable Long id) {
        return candidatRepository.findById(id)
                .map(existing -> {
                    candidatRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private CandidatDto toDto(Candidat c) {
        CandidatDto dto = new CandidatDto();
        dto.setId(c.getId());
        dto.setPrenom(c.getPrenom());
        dto.setNom(c.getNom());
        return dto;
    }
}
