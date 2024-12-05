package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pl.pjatk.s24512.groovy.models.Campaign
import pl.pjatk.s24512.groovy.models.Client
import pl.pjatk.s24512.groovy.services.CampaignService
import pl.pjatk.s24512.groovy.services.ClientService

@RestController
@RequestMapping("/api")
@CrossOrigin
class ClientController {

    @Autowired
    private final ClientService clientService;
    private final CampaignService campaignService;

    ClientController (ClientService clientService, CampaignService campaignService){
        this.clientService = clientService;
        this.campaignService = campaignService
    }

    @GetMapping("/client")
    Client clientById(@RequestParam("id") long id) {
        return clientService.getClientById(id)
    }

    @GetMapping("/client_camp")
    Client clientByCampaignId(@RequestParam("id") long id) {
        Campaign campaign = campaignService.getCampaignById(id)
        return clientService.getClientById(campaign.cliId)
    }

    @GetMapping("/clients")
    List<Client> getClients() {
        return clientService.getClients()
    }
}
