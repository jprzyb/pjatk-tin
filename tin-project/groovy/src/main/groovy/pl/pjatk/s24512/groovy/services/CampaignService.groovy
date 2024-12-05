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

    boolean createCampaign(Campaign campaign) {
        String sql = "INSERT INTO campaign (name, planned_rates, current_rates, start_date, end_date, emp_id, client_id) VALUES (?, ?, ?, ?, ?, ?, ?)"

        try {
            jdbcTemplate.update(
                    sql,
                    [campaign.name, campaign.plannedRates, campaign.currentRates, campaign.startDate, campaign.endDate, campaign.empId, campaign.cliId] as Object[]
            )
            return true
        } catch (EmptyResultDataAccessException ignored) {
            return false
        }
    }

    Campaign latestCampaign() {
        String sql = "SELECT * FROM campaign ORDER BY id DESC LIMIT 1";

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    new RowMapper<Campaign>() {
                        @Override
                        public Campaign mapRow(ResultSet rs, int rowNum) throws SQLException {
                            return new Campaign(
                                    id: rs.getLong("id"),
                                    empId: rs.getLong("emp_id"),
                                    cliId: rs.getLong("client_id"),
                                    plannedRates:  rs.getLong("planned_rates"),
                                    currentRates:  rs.getLong("current_rates"),
                                    name: rs.getString("name"),
                                    startDate:  rs.getDate("start_date"),
                                    endDate:  rs.getDate("end_date")
                            )
                        }
                    }
            );
        } catch (EmptyResultDataAccessException ignored) {
            return null;
        }
    }

}
