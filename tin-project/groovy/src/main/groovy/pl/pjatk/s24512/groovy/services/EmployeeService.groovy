package pl.pjatk.s24512.groovy.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import pl.pjatk.s24512.groovy.models.Client
import pl.pjatk.s24512.groovy.models.Employee

@Service
class EmployeeService {

    @Autowired
    JdbcTemplate jdbcTemplate

    Employee getEmployeeById(long id) {
        String sql = "SELECT * FROM employee WHERE id = ?"

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    [id] as Object[],
                    { rs, rowNum ->
                        new Employee(
                                id: rs.getLong("id"),
                                pesel: rs.getString("pesel"),
                                name: rs.getString("name"),
                                surname: rs.getString("surname"),
                                employmentDate: rs.getDate("employment_date")
                        )
                    } as org.springframework.jdbc.core.RowMapper<Employee>
            )
        } catch (EmptyResultDataAccessException e) {
            return null
        }
    }
}
