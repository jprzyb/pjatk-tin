package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pl.pjatk.s24512.groovy.models.Login
import pl.pjatk.s24512.groovy.services.LoginService

@RestController
@RequestMapping("/api")
@CrossOrigin
class LoginController {

    @Autowired
    private final LoginService loginService;

    LoginController(LoginService loginService){
        this.loginService = loginService;
    }

    @GetMapping("/login")
    Login login(@RequestParam("login") String login, @RequestParam("password") String password) {
        return  loginService.login(login, password)
    }

}
