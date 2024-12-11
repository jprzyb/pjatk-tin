package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pl.pjatk.s24512.groovy.logs.Logger
import pl.pjatk.s24512.groovy.models.CampaignCreation
import pl.pjatk.s24512.groovy.models.Creation
import pl.pjatk.s24512.groovy.models.CreationWithCampaignId
import pl.pjatk.s24512.groovy.services.CampaignCreationService
import pl.pjatk.s24512.groovy.services.CreationService

@RestController
@RequestMapping("/api")
@CrossOrigin
class CreationController {

    @Autowired
    private final CreationService creationService
    private final CampaignCreationService campaignCreationService

    CreationController(CreationService creationService, CampaignCreationService campaignCreationService){
        this.creationService = creationService
        this.campaignCreationService  = campaignCreationService
    }

    @GetMapping("/creation")
    Creation getCreationByid(@RequestParam("id") long id){
        return creationService.getCreationById(id)
    }

    @PostMapping("/create_creation")
    Creation createCreationWithCampaignId(@RequestBody CreationWithCampaignId creationWithCampaignId){
        Logger.info("CreationController.createCreationWithCampaignId: input: " + creationWithCampaignId.toString())
        Creation creation = new Creation()
        creation.setId(creationWithCampaignId.id)
        creation.setFileName(creationWithCampaignId.fileName)
        creation.setIsAnimated(creationWithCampaignId.isAnimated)

        creation = creationService.createCreation(creation);

        Long campaignId = creationWithCampaignId.campaignId

        CampaignCreation campaignCreation = new CampaignCreation()
        campaignCreation.setCreaId(creation.id)
        campaignCreation.setCampId(campaignId)

        campaignCreationService.createCampaignCreation(campaignCreation)

        Logger.info("CreationController.createCreationWithCampaignId: output: " + creation.toString())
        return creation
    }
}
