package pl.pjatk.s24512.groovy.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import pl.pjatk.s24512.groovy.models.Campaign

import java.sql.ResultSet
import java.sql.SQLException

@Service
class CampaignService {
    @Autowired
    JdbcTemplate jdbcTemplate

    Campaign getCampaignById(long id) {
        String sql = "SELECT * FROM campaign WHERE id = ?"

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    [id] as Object[],
                    { rs, rowNum ->
                        new Campaign(
                                id: rs.getLong("id"),
                                empId: rs.getLong("emp_id"),
                                cliId: rs.getLong("client_id"),
                                plannedRates: rs.getLong("planned_rates"),
                                currentRates: rs.getLong("current_rates"),
                                name: rs.getString("name"),
                                startDate: rs.getDate("start_date"),
                                endDate: rs.getDate("end_date"),
                        )
                    } as RowMapper<Campaign>
            )
        } catch (EmptyResultDataAccessException ignored) {
            return null
        }
    }

     List<Campaign> getCampaignsById(long emp_id) {
         String sql = "SELECT * FROM campaign WHERE emp_id = ?"

         try {
             return jdbcTemplate.query(
                     sql,
                     [emp_id] as Object[],
                     { rs, rowNum ->
                         new Campaign(
                                 id: rs.getLong("id"),
                                 empId: rs.getLong("emp_id"),
                                 cliId: rs.getLong("client_id"),
                                 plannedRates: rs.getLong("planned_rates"),
                                 currentRates: rs.getLong("current_rates"),
                                 name: rs.getString("name"),
                                 startDate: rs.getDate("start_date"),
                                 endDate: rs.getDate("end_date"),
                         )
                     } as RowMapper<Campaign>
             )
         } catch (EmptyResultDataAccessException ignored) {
             return null
         }
     }

    Campaign createCampaign(Campaign campaign) {
        String sql = "INSERT INTO campaign (name, planned_rates, current_rates, start_date, end_date, emp_id, client_id) VALUES (?, ?, ?, ?, ?, ?, ?)"

        try {
            jdbcTemplate.update(
                    sql,
                    [campaign.name, campaign.plannedRates, campaign.currentRates, campaign.startDate, campaign.endDate, campaign.empId, campaign.cliId] as Object[]
            )
            return lastInsert()
        } catch (EmptyResultDataAccessException ignored) {
            return null
        }
    }

    private Campaign lastInsert() {
        String selectSql = "SELECT * FROM campaign WHERE id = LAST_INSERT_ID()"

        try {
            return jdbcTemplate.queryForObject(selectSql, new RowMapper<Campaign>() {
                @Override
                Campaign mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Campaign newCampaign = new Campaign()
                    newCampaign.setId(rs.getLong("id"))
                    newCampaign.setName(rs.getString("name"))
                    newCampaign.setPlannedRates(rs.getLong("planned_rates"))
                    newCampaign.setCurrentRates(rs.getLong("current_rates"))
                    newCampaign.setStartDate(rs.getDate("start_date"))
                    newCampaign.setEndDate(rs.getDate("end_date"))
                    newCampaign.setEmpId(rs.getLong("emp_id"))
                    newCampaign.setCliId(rs.getLong("client_id"))
                    return newCampaign
                }
            })
        } catch (EmptyResultDataAccessException ignored) {
            return null
        }
    }
}
