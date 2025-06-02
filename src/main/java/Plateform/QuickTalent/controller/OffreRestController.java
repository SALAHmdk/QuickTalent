package Plateform.QuickTalent.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Plateform.QuickTalent.dto.OffreDto;
import Plateform.QuickTalent.entite.Offre;
import Plateform.QuickTalent.entite.Recruteur;
import Plateform.QuickTalent.repository.OffreRepository;
import Plateform.QuickTalent.repository.RecruteurRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Offres", description = "Opérations CRUD sur les offres")
@RestController
@RequestMapping("/api/offres")
public class OffreRestController {

    @Autowired
    private OffreRepository offreRepository;

    @Autowired
    private RecruteurRepository recruteurRepository;

    // ----------------------------------------------------------------
    // 1) Lister toutes les offres
    // ----------------------------------------------------------------
    @Operation(summary = "Lister toutes les offres", description = "Retourne la liste de toutes les offres", responses = {
            @ApiResponse(responseCode = "200", description = "Liste des offres renvoyée", content = @Content(mediaType = "application/json", schema = @Schema(implementation = OffreDto.class, type = "array")))
    })
    @GetMapping
    public List<OffreDto> getAllOffres(
            @Parameter(name = "titre", description = "Filtrer sur le titre (optionnel)", required = false, in = ParameterIn.QUERY, schema = @Schema(type = "string")) @RequestParam(required = false) String titre,

            @Parameter(name = "ville", description = "Filtrer sur la ville (optionnel)", required = false, in = ParameterIn.QUERY, schema = @Schema(type = "string")) @RequestParam(required = false) String ville) {
        // Si aucun filtre, on renvoie tout
        List<Offre> liste;
        if (titre != null && ville != null) {
            liste = offreRepository.findByTitreAndVilleIgnoreCase(titre, ville);
        } else if (titre != null) {
            liste = offreRepository.findByTitreIgnoreCase(titre);
        } else if (ville != null) {
            liste = offreRepository.findByVilleIgnoreCase(ville);
        } else {
            liste = offreRepository.findAll();
        }

        return liste.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // ----------------------------------------------------------------
    // 2) Récupérer une offre par ID
    // ----------------------------------------------------------------
    @Operation(summary = "Récupérer une offre par son ID", parameters = {
            @Parameter(name = "id", description = "Identifiant de l’offre", required = true, in = ParameterIn.PATH, schema = @Schema(type = "integer", format = "int64"))
    }, responses = {
            @ApiResponse(responseCode = "200", description = "Offre trouvée", content = @Content(mediaType = "application/json", schema = @Schema(implementation = OffreDto.class))),
            @ApiResponse(responseCode = "404", description = "Aucune offre trouvée avec cet ID")
    })
    @GetMapping("/{id}")
    public ResponseEntity<OffreDto> getOffreParId(@PathVariable Long id) {
        return offreRepository.findById(id)
                .map(o -> toDto(o))
                .map(dto -> ResponseEntity.ok(dto))
                .orElse(ResponseEntity.notFound().build());
    }

    // ----------------------------------------------------------------
    // 3) Créer une nouvelle offre
    // ----------------------------------------------------------------
    @Operation(summary = "Créer une nouvelle offre", description = "Enregistre une offre et retourne le DTO créé", requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Représentation JSON d’une offre à créer", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = OffreDto.class))), responses = {
            @ApiResponse(responseCode = "201", description = "Offre créée", content = @Content(mediaType = "application/json", schema = @Schema(implementation = OffreDto.class))),
            @ApiResponse(responseCode = "400", description = "Recruteur introuvable ou payload invalide")
    })
    @PostMapping
    public ResponseEntity<OffreDto> creerOffre(@RequestBody OffreDto dto) {
        // On vérifie que le recruteur existe
        Long recId = dto.getRecruteurId();
        Recruteur rec = recruteurRepository.findById(recId)
                .orElse(null);

        if (rec == null) {
            // Si on ne trouve pas le recruteur, on renvoie Bad Request
            return ResponseEntity.badRequest().build();
        }

        Offre o = new Offre();
        o.setTitre(dto.getTitre());
        o.setVille(dto.getVille());
        o.setDescription(dto.getDescription());
        o.setRecruteur(rec);

        Offre saved = offreRepository.save(o);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDto(saved));
    }

    // ----------------------------------------------------------------
    // 4) Mettre à jour une offre existante
    // ----------------------------------------------------------------
    @Operation(summary = "Mettre à jour une offre existante", parameters = {
            @Parameter(name = "id", description = "Identifiant de l’offre à mettre à jour", required = true, in = ParameterIn.PATH, schema = @Schema(type = "integer", format = "int64"))
    }, requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Données JSON pour la mise à jour", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = OffreDto.class))), responses = {
            @ApiResponse(responseCode = "200", description = "Offre mise à jour", content = @Content(mediaType = "application/json", schema = @Schema(implementation = OffreDto.class))),
            @ApiResponse(responseCode = "404", description = "Aucune offre trouvée avec cet ID")
    })
    @PutMapping("/{id}")
    public ResponseEntity<OffreDto> mettreAJourOffre(
            @PathVariable Long id,
            @RequestBody OffreDto dto) {

        return offreRepository.findById(id)
                .map(existing -> {
                    existing.setTitre(dto.getTitre());
                    existing.setVille(dto.getVille());
                    existing.setDescription(dto.getDescription());
                    // On ne change pas de recruteur ici, mais cela pourrait se faire si nécessaire
                    Offre updated = offreRepository.save(existing);
                    return ResponseEntity.ok(toDto(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ----------------------------------------------------------------
    // 5) Supprimer une offre
    // ----------------------------------------------------------------
    @Operation(summary = "Supprimer une offre", parameters = {
            @Parameter(name = "id", description = "Identifiant de l’offre à supprimer", required = true, in = ParameterIn.PATH, schema = @Schema(type = "integer", format = "int64"))
    }, responses = {
            @ApiResponse(responseCode = "204", description = "Offre supprimée avec succès"),
            @ApiResponse(responseCode = "404", description = "Aucune offre trouvée avec cet ID")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerOffre(@PathVariable Long id) {
        return offreRepository.findById(id)
                .map(existing -> {
                    offreRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ----------------------------------------------------------------
    // Méthode privée de conversion Offre → OffreDto
    // ----------------------------------------------------------------
    private OffreDto toDto(Offre o) {
        OffreDto dto = new OffreDto();
        dto.setId(o.getId());
        dto.setTitre(o.getTitre());
        dto.setVille(o.getVille());
        dto.setDescription(o.getDescription());
        dto.setRecruteurId(o.getRecruteur().getId());
        return dto;
    }
}
