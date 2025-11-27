package com.hometutorfinder.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String subject;
    private String location;
    private String availability;
    private Double fee;

    @Column(length = 1000)
    private String bio;

    @OneToOne
    private com.hometutorfinder.backend.model.User user;
}
