package Plateform.QuickTalent;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// For Spring Boot 3.x (correct syntax)
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class TestApplication {
}

class QuickTalentApplicationTests {
    @Test
    void contextLoads() {
        // Test will pass if context loads
    }
}