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
// ----- Import Swagger/OpenAPI (plus d’import Hibernate ici !) -----
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Candidats", description = "Opérations CRUD sur les candidats")
@RestController
@RequestMapping("/api/candidats")
public class CandidatRestController {

    @Autowired
    private CandidatRepository candidatRepository;

    @Operation(summary = "Lister tous les candidats", description = "Retourne la liste de tous les candidats", responses = {
            @ApiResponse(responseCode = "200", description = "Liste des candidats renvoyée", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CandidatDto.class, type = "array")))
    })
    @GetMapping
    public List<CandidatDto> getAllCandidats() {
        return candidatRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Récupérer un candidat par son ID", parameters = {
            @Parameter(name = "id", description = "Identifiant du candidat", required = true, schema = @Schema(type = "integer", format = "int64"))
    }, responses = {
            @ApiResponse(responseCode = "200", description = "Candidat trouvé", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CandidatDto.class))),
            @ApiResponse(responseCode = "404", description = "Aucun candidat trouvé avec cet ID")
    })
    @GetMapping("/{id}")
    public ResponseEntity<CandidatDto> getCandidatParId(@PathVariable Long id) {
        return candidatRepository.findById(id)
                .map(this::toDto)
                .map(dto -> ResponseEntity.ok(dto))
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Créer un nouveau candidat", description = "Enregistre un candidat et retourne le DTO créé", responses = {
            @ApiResponse(responseCode = "200", description = "Candidat créé", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CandidatDto.class)))
    })
    @PostMapping
    public CandidatDto creerCandidat(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Représentation JSON d’un candidat à créer", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CandidatDto.class))) @RequestBody CandidatDto dto) {
        Candidat candidat = new Candidat();
        candidat.setPrenom(dto.getPrenom());
        candidat.setNom(dto.getNom());
        candidat.setEmail(dto.getEmail());
        Candidat saved = candidatRepository.save(candidat);
        return toDto(saved);
    }

    @Operation(summary = "Mettre à jour un candidat existant", parameters = {
            @Parameter(name = "id", description = "Identifiant du candidat à mettre à jour", required = true, schema = @Schema(type = "integer", format = "int64"))
    }, responses = {
            @ApiResponse(responseCode = "200", description = "Candidat mis à jour", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CandidatDto.class))),
            @ApiResponse(responseCode = "404", description = "Aucun candidat trouvé avec cet ID")
    })
    @PutMapping("/{id}")
    public ResponseEntity<CandidatDto> mettreAJourCandidat(
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Données du candidat à mettre à jour", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CandidatDto.class))) @RequestBody CandidatDto dto) {
        return candidatRepository.findById(id)
                .map(existing -> {
                    existing.setPrenom(dto.getPrenom());
                    existing.setNom(dto.getNom());
                    existing.setEmail(dto.getEmail());
                    Candidat updated = candidatRepository.save(existing);
                    return ResponseEntity.ok(toDto(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Supprimer un candidat", parameters = {
            @Parameter(name = "id", description = "Identifiant du candidat à supprimer", required = true, schema = @Schema(type = "integer", format = "int64"))
    }, responses = {
            @ApiResponse(responseCode = "204", description = "Candidat supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Aucun candidat trouvé avec cet ID")
    })
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
        dto.setEmail(c.getEmail());
        return dto;
    }
}
