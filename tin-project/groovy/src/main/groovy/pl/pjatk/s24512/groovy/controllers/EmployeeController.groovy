package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pl.pjatk.s24512.groovy.models.Employee
import pl.pjatk.s24512.groovy.services.CampaignService
import pl.pjatk.s24512.groovy.services.EmployeeService

@RestController
@RequestMapping("/api")
@CrossOrigin
class EmployeeController {

    @Autowired
    private final EmployeeService employeeService

    EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService
    }

    @GetMapping("/employee")
    Employee getEmployeeById(@RequestParam("id") long id){
        return employeeService.getEmployeeById(id)
    }

}
