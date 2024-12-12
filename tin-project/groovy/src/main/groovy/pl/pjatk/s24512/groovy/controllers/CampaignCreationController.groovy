package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pl.pjatk.s24512.groovy.models.CampaignCreation
import pl.pjatk.s24512.groovy.models.Creation
import pl.pjatk.s24512.groovy.services.CampaignCreationService
import pl.pjatk.s24512.groovy.services.CreationService

@RestController
@RequestMapping("/api")
@CrossOrigin
class CampaignCreationController {

    @Autowired
    private final CampaignCreationService campaignCreationService;
    private final CreationService creationService;

    CampaignCreationController(CampaignCreationService campaignCreationService, CreationService creationService){
        this.campaignCreationService = campaignCreationService
        this.creationService = creationService
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

    @GetMapping("/creations_by_camp_id")
    List<Creation> getCreationsByCampId(@RequestParam("id") long id){
        List<Creation> result = new ArrayList<>();

        List<CampaignCreation> idList = campaignCreationService.getCampaignsCreationsByCampId(id)

        for(Long cId : idList.creaId){
            result.add(creationService.getCreationById(cId))
        }
        return result
    }

    @PostMapping("/remove_campaign_creation")
    CampaignCreation removeCampaignCreation(@RequestBody CampaignCreation campaignCreation){
        return campaignCreationService.removeCampaignCreation(campaignCreation)
    }
}
