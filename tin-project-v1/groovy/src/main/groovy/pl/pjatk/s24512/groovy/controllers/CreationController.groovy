package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pl.pjatk.s24512.groovy.models.Creation
import pl.pjatk.s24512.groovy.services.CreationService

@RestController
class CreationController {

    @Autowired
    private final CreationService creationService

    CreationController(CreationService creationService){
        this.creationService = creationService
    }

    @GetMapping("/creation")
    Creation getCreationByid(@RequestParam("id") long id){
        return creationService.getCreationById(id)
    }

    @PostMapping("/create_creation")
    boolean createCreation(@RequestBody Creation creation){
        return creationService.createCreation(creation)
    }
}
