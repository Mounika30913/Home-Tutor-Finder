package com.hometutorfinder.backend.controller;

import com.hometutorfinder.backend.model.TutorProfile;
import com.hometutorfinder.backend.repository.TutorProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutors")
public class TutorController {

    private final TutorProfileRepository repo;

    public TutorController(TutorProfileRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<TutorProfile> list(
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String location
    ) {
        if (subject != null && !subject.isBlank()) {
            return repo.findBySubjectContainingIgnoreCase(subject);
        }
        if (location != null && !location.isBlank()) {
            return repo.findByLocationContainingIgnoreCase(location);
        }
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public TutorProfile get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public TutorProfile create(@RequestBody TutorProfile t) {
        return repo.save(t);
    }

    @PutMapping("/{id}")
    public TutorProfile update(@PathVariable Long id, @RequestBody TutorProfile t) {
        TutorProfile existing = repo.findById(id).orElseThrow();
        existing.setName(t.getName());
        existing.setSubject(t.getSubject());
        existing.setLocation(t.getLocation());
        existing.setAvailability(t.getAvailability());
        existing.setFee(t.getFee());
        existing.setBio(t.getBio());
        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
