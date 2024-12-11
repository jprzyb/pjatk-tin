package pl.pjatk.s24512.groovy.models

class CreationWithCampaignId {
    Long id
    Long campaignId
    boolean isAnimated
    String fileName

    @Override
    String toString() {
        return "CreationWithCampaignId{" +
                "id=" + id +
                ", campaignId=" + campaignId +
                ", isAnimated=" + isAnimated +
                ", fileName='" + fileName + '\'' +
                '}';
    }
}
