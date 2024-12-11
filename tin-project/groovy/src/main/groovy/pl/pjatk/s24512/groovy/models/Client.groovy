package pl.pjatk.s24512.groovy.models

class Client {
    Long id
    String name
    String bankAccount
    Date contractDate

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", bankAccount='" + bankAccount + '\'' +
                ", contractDate=" + contractDate +
                '}';
    }
}
