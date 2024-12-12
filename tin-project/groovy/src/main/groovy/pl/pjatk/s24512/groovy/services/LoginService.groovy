package pl.pjatk.s24512.groovy.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import pl.pjatk.s24512.groovy.models.Login

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.sql.Date

@Service
class LoginService {

    @Autowired
    JdbcTemplate jdbcTemplate

    Login login(String login, String pass) {
        String sql = "SELECT * FROM login WHERE login LIKE ? AND pass LIKE ?"

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    [login, pass] as Object[],
                    { rs, rowNum ->
                        new Login(
                                empId: rs.getLong("emp_id"),
                                login: rs.getString("login"),
                                pass: rs.getString("pass"),
                                session_date: rs.getDate("session_exp_date")
                        )
                    } as RowMapper<Login>
            )
        } catch (EmptyResultDataAccessException e) {
            return null
        }
    }


    void updateSession(long empId) {
        def nowPlusOneHour = LocalDateTime.now().plusHours(1)
        def formattedDate = nowPlusOneHour.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

        String sql = "UPDATE login SET session_exp_date = ? WHERE emp_id = ?"

        try {
            jdbcTemplate.update(sql, [formattedDate, empId] as Object[])
        } catch (EmptyResultDataAccessException e) {
            e.printStackTrace()
        } catch (Exception e) {
            e.printStackTrace()
        }
    }

    Date session(long empId) {
        String sql = "SELECT session_exp_date FROM login WHERE emp_id = ?"

        try {
            Date date = jdbcTemplate.queryForObject(sql, [empId] as Object[], Date.class)
            if (date != null) {
                return date
            } else {
                return null
            }
        } catch (EmptyResultDataAccessException e) {
            return null
        } catch (Exception e) {
            return null
        }
    }
}
