package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pl.pjatk.s24512.groovy.models.Campaign
import pl.pjatk.s24512.groovy.services.CampaignService

@RestController
@RequestMapping("/api")
@CrossOrigin
class CampaignController {

    @Autowired
    private final CampaignService campaignService

    CampaignController(CampaignService campaignService){
        this.campaignService = campaignService
    }

    @GetMapping("/campaign")
    Campaign getCampaignById(@RequestParam("id") long id) {
        return  campaignService.getCampaignById(id)
    }

    @GetMapping("/campaigns")
    List<Campaign> getCampaignByEmployeeId(@RequestParam("id") long id) {
        return  campaignService.getCampaignsById(id)
    }

    @PostMapping("/campaign")
    Campaign createCampaign(@RequestBody Campaign campaign) {
        return campaignService.createCampaign(campaign)
    }
}
