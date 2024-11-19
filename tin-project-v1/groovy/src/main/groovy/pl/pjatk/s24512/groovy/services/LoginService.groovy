package pl.pjatk.s24512.groovy.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import pl.pjatk.s24512.groovy.models.Login

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
                                pass: rs.getString("pass")
                        )
                    } as org.springframework.jdbc.core.RowMapper<Login>
            )
        } catch (EmptyResultDataAccessException e) {
            return null
        }
    }


}
