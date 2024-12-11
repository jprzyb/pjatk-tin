package pl.pjatk.s24512.groovy.models

class Employee {
    Long id
    String name
    String pesel
    String surname
    Date employmentDate

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pesel='" + pesel + '\'' +
                ", surname='" + surname + '\'' +
                ", employmentDate=" + employmentDate +
                '}';
    }
}
