package pl.pjatk.s24512.groovy.models

class Campaign {
    Long id
    String name
    Long plannedRates
    Long currentRates
    Date startDate
    Date endDate
    Long empId
    Long cliId

    @Override
    public String toString() {
        return "Campaign{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", plannedRates=" + plannedRates +
                ", currentRates=" + currentRates +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", empId=" + empId +
                ", cliId=" + cliId +
                '}';
    }
}
