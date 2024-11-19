package pl.pjatk.s24512.groovy.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import pl.pjatk.s24512.groovy.models.CampaignCreation
import pl.pjatk.s24512.groovy.models.Creation

@Service
class CampaignCreationService {
    @Autowired
    JdbcTemplate jdbcTemplate

     List<Creation> getCampaignsCreationsByCampId(long camp_id) {
         String sql = "SELECT * FROM campaign_creation WHERE camp_id = ?"

         try {
             return jdbcTemplate.query(
                     sql,
                     [camp_id] as Object[],
                     { rs, rowNum ->
                         new CampaignCreation(
                                 campId:  rs.getLong("camp_id"),
                                 creaId: rs.getLong("crea_id")
                         )
                     } as org.springframework.jdbc.core.RowMapper<Creation>
             )
         } catch (EmptyResultDataAccessException e) {
             return null
         }
     }

    List<Creation> getCampaignsCreationsByCreaId(long crea_id) {
        String sql = "SELECT * FROM campaign_creation WHERE crea_id = ?"

        try {
            return jdbcTemplate.query(
                    sql,
                    [crea_id] as Object[],
                    { rs, rowNum ->
                        new CampaignCreation(
                                campId:  rs.getLong("camp_id"),
                                creaId: rs.getLong("crea_id")
                        )
                    } as org.springframework.jdbc.core.RowMapper<Creation>
            )
        } catch (EmptyResultDataAccessException e) {
            return null
        }
    }

    boolean createCampaignCreation(CampaignCreation campaignCreation) {
        String sql = "INSERT INTO campaign_creation (camp_id, crea_id) VALUES (?, ?)"

        try {
            jdbcTemplate.update(
                    sql,
                    [campaignCreation.campId, campaignCreation.creaId] as Object[]
            )
            return true
        } catch (EmptyResultDataAccessException e) {
            return false
        }
    }

    boolean createCampaignCreation(List<CampaignCreation> campaignsCreations) {
        for(CampaignCreation c : campaignsCreations){
            createCampaignCreation(c)
        }
        return true
    }
}
