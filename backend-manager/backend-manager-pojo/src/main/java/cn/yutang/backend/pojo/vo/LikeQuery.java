package cn.yutang.backend.pojo.vo;

public class LikeQuery {
    private String keyWord;
    private String status;
    private long  tbId;
    private Integer shopId;

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getTbId() {
        return tbId;
    }

    public void setTbId(long tbId) {
        this.tbId = tbId;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }
}
