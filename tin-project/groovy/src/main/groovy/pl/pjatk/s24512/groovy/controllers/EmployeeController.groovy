package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pl.pjatk.s24512.groovy.models.Employee
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
