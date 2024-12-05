package pl.pjatk.s24512.groovy

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration
class CorsConfig {

    @Bean
    CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration()
        config.addAllowedOrigin("http://localhost:3000")  // Dopuszczenie konkretnego pochodzenia
        config.addAllowedHeader("*")                      // Dopuszczenie wszystkich nagłówków
        config.addAllowedMethod("*")                      // Dopuszczenie wszystkich metod (GET, POST itd.)
        config.setAllowCredentials(true)                  // Obsługa ciasteczek / autoryzacji

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", config)   // Stosowanie konfiguracji dla wszystkich endpointów

        return new CorsFilter(source)
    }
}
