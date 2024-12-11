package pl.pjatk.s24512.groovy.models

class Login {
    Long empId
    String login
    String pass
    Date session_date

    @Override
    public String toString() {
        return "Login{" +
                "empId=" + empId +
                ", login='" + login + '\'' +
                ", pass='" + pass + '\'' +
                ", session_date=" + session_date +
                '}';
    }
}
