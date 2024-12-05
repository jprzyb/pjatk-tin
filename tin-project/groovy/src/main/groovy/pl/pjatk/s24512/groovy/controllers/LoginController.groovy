package pl.pjatk.s24512.groovy.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.pjatk.s24512.groovy.logs.Logger
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
        Login data = loginService.login(login, password)
        if(data == null) {
            return null
        }
        if(data.session_date.before(new Date())){
            loginService.updateSession(data.empId)
        }
        return data
    }

    @GetMapping("/session")
    public ResponseEntity<Boolean> session(@RequestParam("empId") long empId) {
        boolean sessionValid = loginService.session(empId).before(new Date());
        if (sessionValid) {
            Logger.info("Session valid.");
        } else {
            Logger.info("Session invalid.");
        }
        return ResponseEntity.ok(sessionValid);
    }

}
