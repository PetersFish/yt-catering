package cn.yutang.backend.pojo.po;

import java.io.Serializable;

public class Dinnertabletype implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTableType.tt_id
     *
     * @mbg.generated
     */
    private Integer ttId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTableType.tt_name
     *
     * @mbg.generated
     */
    private String ttName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTableType.tt_capacity
     *
     * @mbg.generated
     */
    private Integer ttCapacity;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTableType.shop_id
     *
     * @mbg.generated
     */
    private String shopId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTableType.tt_id
     *
     * @return the value of DinnerTableType.tt_id
     *
     * @mbg.generated
     */
    public Integer getTtId() {
        return ttId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTableType.tt_id
     *
     * @param ttId the value for DinnerTableType.tt_id
     *
     * @mbg.generated
     */
    public void setTtId(Integer ttId) {
        this.ttId = ttId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTableType.tt_name
     *
     * @return the value of DinnerTableType.tt_name
     *
     * @mbg.generated
     */
    public String getTtName() {
        return ttName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTableType.tt_name
     *
     * @param ttName the value for DinnerTableType.tt_name
     *
     * @mbg.generated
     */
    public void setTtName(String ttName) {
        this.ttName = ttName == null ? null : ttName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTableType.tt_capacity
     *
     * @return the value of DinnerTableType.tt_capacity
     *
     * @mbg.generated
     */
    public Integer getTtCapacity() {
        return ttCapacity;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTableType.tt_capacity
     *
     * @param ttCapacity the value for DinnerTableType.tt_capacity
     *
     * @mbg.generated
     */
    public void setTtCapacity(Integer ttCapacity) {
        this.ttCapacity = ttCapacity;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTableType.shop_id
     *
     * @return the value of DinnerTableType.shop_id
     *
     * @mbg.generated
     */
    public String getShopId() {
        return shopId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTableType.shop_id
     *
     * @param shopId the value for DinnerTableType.shop_id
     *
     * @mbg.generated
     */
    public void setShopId(String shopId) {
        this.shopId = shopId == null ? null : shopId.trim();
    }
}