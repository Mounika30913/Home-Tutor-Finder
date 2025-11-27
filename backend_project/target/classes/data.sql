INSERT INTO users (id, email, password, role)
VALUES (
    1,
    'tutor1@example.com',
    '$2a$10$D3YAE06Qbpmw5BldbbUJbO6c4nzxuGzC7RD5.D3wGn1t7yIpf3WgC',
    'TUTOR'
)
ON DUPLICATE KEY UPDATE email = email;

INSERT INTO tutor_profile (id, name, subject, location, availability, fee, bio, user_id)
VALUES (
    1,
    'Ravi Kumar',
    'Mathematics',
    'Hyderabad',
    'Weekdays 6pm-9pm',
    300.0,
    'Experienced tutor for class 9-12',
    1
)
ON DUPLICATE KEY UPDATE name = name;
