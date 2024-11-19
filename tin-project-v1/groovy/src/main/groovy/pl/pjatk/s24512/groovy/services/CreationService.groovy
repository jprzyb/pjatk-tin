package pl.pjatk.s24512.groovy.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import pl.pjatk.s24512.groovy.models.Campaign
import pl.pjatk.s24512.groovy.models.Creation

@Service
class CreationService {
    @Autowired
    JdbcTemplate jdbcTemplate

    Creation getCreationById(long id) {
        String sql = "SELECT * FROM creation WHERE id = ?"

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    [id] as Object[],
                    { rs, rowNum ->
                        new Creation(
                                id: rs.getLong("id"),
                                isAnimated: rs.getBoolean("is_animated"),
                                fileName: rs.getString("filename")
                        )
                    } as org.springframework.jdbc.core.RowMapper<Creation>
            )
        } catch (EmptyResultDataAccessException e) {
            return null
        }
    }

    boolean createCreation(Creation creation) {
        if(creation.id == Long.MAX_VALUE) return false
        String sql = "INSERT INTO creation (is_animated, filename) VALUES (?, ?)"

        try {
            jdbcTemplate.update(
                    sql,
                    [creation.isAnimated, creation.fileName] as Object[]
            )
            return true
        } catch (EmptyResultDataAccessException e) {
            return false
        }
    }
}
