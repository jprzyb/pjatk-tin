package pl.pjatk.s24512.groovy.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import pl.pjatk.s24512.groovy.models.Campaign
import pl.pjatk.s24512.groovy.models.Client
import pl.pjatk.s24512.groovy.models.Login

@Service
class ClientService {

    @Autowired
    JdbcTemplate jdbcTemplate

    Client getClientById(long id) {
        String sql = "SELECT * FROM client WHERE id = ?"

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    [id] as Object[],
                    { rs, rowNum ->
                        new Client(
                                id: rs.getLong("id"),
                                name: rs.getString("name"),
                                bankAccount: rs.getString("bank_account"),
                                contractDate: rs.getDate("contract_date")
                        )
                    } as org.springframework.jdbc.core.RowMapper<Client>
            )
        } catch (EmptyResultDataAccessException e) {
            return null
        }
    }

    Client getClientByCampaignId(long id) {

        String sql = "SELECT * FROM client WHERE id = ?"

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    [campaign.cliId] as Object[],
                    { rs, rowNum ->
                        new Client(
                                id: rs.getLong("id"),
                                name: rs.getString("name"),
                                bankAccount: rs.getLong("bank_account"),
                                contractDate: rs.getDate("contract_date")
                        )
                    } as org.springframework.jdbc.core.RowMapper<Client>
            )
        } catch (EmptyResultDataAccessException e) {
            return null
        }
    }

    List<Client> getClients() {
        String sql = "SELECT * FROM client"

        try {
            return jdbcTemplate.query(
                    sql,
                    { rs, rowNum ->
                        new Client(
                                id: rs.getLong("id"),
                                name: rs.getString("name"),
                                bankAccount: rs.getString("bank_account"),
                                contractDate: rs.getDate("contract_date")
                        )
                    } as RowMapper<Client>
            )
        } catch (EmptyResultDataAccessException e) {
            return []
        }
    }


}
