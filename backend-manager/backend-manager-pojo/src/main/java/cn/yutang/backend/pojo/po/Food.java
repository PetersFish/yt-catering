package cn.yutang.backend.pojo.po;

import java.io.Serializable;

public class Food implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_id
     *
     * @mbg.generated
     */
    private Integer fdId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_name
     *
     * @mbg.generated
     */
    private String fdName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.ft_id
     *
     * @mbg.generated
     */
    private Integer ftId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_price
     *
     * @mbg.generated
     */
    private Double fdPrice;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_mprice
     *
     * @mbg.generated
     */
    private Double fdMprice;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_stock
     *
     * @mbg.generated
     */
    private Integer fdStock;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_status
     *
     * @mbg.generated
     */
    private Integer fdStatus;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_unit
     *
     * @mbg.generated
     */
    private String fdUnit;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_remark
     *
     * @mbg.generated
     */
    private String fdRemark;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_img
     *
     * @mbg.generated
     */
    private String fdImg;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.shop_id
     *
     * @mbg.generated
     */
    private String shopId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Food.fd_recommend
     *
     * @mbg.generated
     */
    private Integer fdRecommend;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Food
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_id
     *
     * @return the value of Food.fd_id
     *
     * @mbg.generated
     */
    public Integer getFdId() {
        return fdId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_id
     *
     * @param fdId the value for Food.fd_id
     *
     * @mbg.generated
     */
    public void setFdId(Integer fdId) {
        this.fdId = fdId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_name
     *
     * @return the value of Food.fd_name
     *
     * @mbg.generated
     */
    public String getFdName() {
        return fdName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_name
     *
     * @param fdName the value for Food.fd_name
     *
     * @mbg.generated
     */
    public void setFdName(String fdName) {
        this.fdName = fdName == null ? null : fdName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.ft_id
     *
     * @return the value of Food.ft_id
     *
     * @mbg.generated
     */
    public Integer getFtId() {
        return ftId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.ft_id
     *
     * @param ftId the value for Food.ft_id
     *
     * @mbg.generated
     */
    public void setFtId(Integer ftId) {
        this.ftId = ftId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_price
     *
     * @return the value of Food.fd_price
     *
     * @mbg.generated
     */
    public Double getFdPrice() {
        return fdPrice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_price
     *
     * @param fdPrice the value for Food.fd_price
     *
     * @mbg.generated
     */
    public void setFdPrice(Double fdPrice) {
        this.fdPrice = fdPrice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_mprice
     *
     * @return the value of Food.fd_mprice
     *
     * @mbg.generated
     */
    public Double getFdMprice() {
        return fdMprice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_mprice
     *
     * @param fdMprice the value for Food.fd_mprice
     *
     * @mbg.generated
     */
    public void setFdMprice(Double fdMprice) {
        this.fdMprice = fdMprice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_stock
     *
     * @return the value of Food.fd_stock
     *
     * @mbg.generated
     */
    public Integer getFdStock() {
        return fdStock;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_stock
     *
     * @param fdStock the value for Food.fd_stock
     *
     * @mbg.generated
     */
    public void setFdStock(Integer fdStock) {
        this.fdStock = fdStock;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_status
     *
     * @return the value of Food.fd_status
     *
     * @mbg.generated
     */
    public Integer getFdStatus() {
        return fdStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_status
     *
     * @param fdStatus the value for Food.fd_status
     *
     * @mbg.generated
     */
    public void setFdStatus(Integer fdStatus) {
        this.fdStatus = fdStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_unit
     *
     * @return the value of Food.fd_unit
     *
     * @mbg.generated
     */
    public String getFdUnit() {
        return fdUnit;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_unit
     *
     * @param fdUnit the value for Food.fd_unit
     *
     * @mbg.generated
     */
    public void setFdUnit(String fdUnit) {
        this.fdUnit = fdUnit == null ? null : fdUnit.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_remark
     *
     * @return the value of Food.fd_remark
     *
     * @mbg.generated
     */
    public String getFdRemark() {
        return fdRemark;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_remark
     *
     * @param fdRemark the value for Food.fd_remark
     *
     * @mbg.generated
     */
    public void setFdRemark(String fdRemark) {
        this.fdRemark = fdRemark == null ? null : fdRemark.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_img
     *
     * @return the value of Food.fd_img
     *
     * @mbg.generated
     */
    public String getFdImg() {
        return fdImg;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_img
     *
     * @param fdImg the value for Food.fd_img
     *
     * @mbg.generated
     */
    public void setFdImg(String fdImg) {
        this.fdImg = fdImg == null ? null : fdImg.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.shop_id
     *
     * @return the value of Food.shop_id
     *
     * @mbg.generated
     */
    public String getShopId() {
        return shopId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.shop_id
     *
     * @param shopId the value for Food.shop_id
     *
     * @mbg.generated
     */
    public void setShopId(String shopId) {
        this.shopId = shopId == null ? null : shopId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Food.fd_recommend
     *
     * @return the value of Food.fd_recommend
     *
     * @mbg.generated
     */
    public Integer getFdRecommend() {
        return fdRecommend;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Food.fd_recommend
     *
     * @param fdRecommend the value for Food.fd_recommend
     *
     * @mbg.generated
     */
    public void setFdRecommend(Integer fdRecommend) {
        this.fdRecommend = fdRecommend;
    }
}