package pl.pjatk.s24512.groovy.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataAccessException
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import pl.pjatk.s24512.groovy.logs.Logger
import pl.pjatk.s24512.groovy.models.Campaign
import pl.pjatk.s24512.groovy.models.Creation

import java.sql.ResultSet
import java.sql.SQLException

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
                    } as RowMapper<Creation>
            )
        } catch (EmptyResultDataAccessException ignored) {
            return null
        }
    }

    Creation createCreation(Creation creation) {
        if(creation.id == Long.MAX_VALUE) return null
        String sql = "INSERT INTO creation (is_animated, filename) VALUES (?, ?)"

        try {
            jdbcTemplate.update(
                    sql,
                    [creation.isAnimated, creation.fileName] as Object[]
            )
            return lastInsert()
        } catch (EmptyResultDataAccessException ignored) {
            return null
        }
    }

    private Creation lastInsert() {
        String selectSql = "SELECT * FROM creation WHERE id = LAST_INSERT_ID();"

        try {
            return jdbcTemplate.queryForObject(selectSql, new RowMapper<Creation>() {
                @Override
                Creation mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Creation newCreation = new Creation()
                    newCreation.setId(rs.getLong("id"))
                    newCreation.setFileName(rs.getString("filename"))
                    newCreation.setIsAnimated(rs.getBoolean("is_animated"))
                    Logger.info("CreationService.lastInsert: Output: ${newCreation}")
                    return newCreation
                }
            })
        } catch (EmptyResultDataAccessException ignored) {
            return null
        }
    }
}
