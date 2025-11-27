package com.hometutorfinder.backend.repository;

import com.hometutorfinder.backend.model.TutorProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutorProfileRepository extends JpaRepository<TutorProfile, Long> {
    List<TutorProfile> findBySubjectContainingIgnoreCase(String subject);
    List<TutorProfile> findByLocationContainingIgnoreCase(String location);
}
