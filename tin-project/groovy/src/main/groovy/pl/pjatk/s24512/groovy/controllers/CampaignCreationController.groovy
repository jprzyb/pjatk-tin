package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pl.pjatk.s24512.groovy.models.CampaignCreation
import pl.pjatk.s24512.groovy.services.CampaignCreationService

@RestController
@RequestMapping("/api")
@CrossOrigin
class CampaignCreationController {

    @Autowired
    private final CampaignCreationService campaignCreationService;

    CampaignCreationController(CampaignCreationService campaignCreationService){
        this.campaignCreationService = campaignCreationService
    }

    @PostMapping("/create_campaigns_creations")
    boolean createCampaignCreation(@RequestBody List<CampaignCreation> campaignCreations) {
        return  campaignCreationService.createCampaignCreation(campaignCreations)
    }

    @GetMapping("/campaign_creations_by_camp")
    List<CampaignCreation> getCampaignsCreationsByCamp(@RequestParam("id") long id){
        return campaignCreationService.getCampaignsCreationsByCampId(id)
    }

    @GetMapping("/campaign_creations_by_crea")
    List<CampaignCreation> getCampaignsCreationsByCrea(@RequestParam("id") long id){
        return campaignCreationService.getCampaignsCreationsByCreaId(id)
    }
}
