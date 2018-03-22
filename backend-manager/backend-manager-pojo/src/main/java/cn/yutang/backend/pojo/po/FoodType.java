package cn.yutang.backend.pojo.po;

import java.io.Serializable;

public class FoodType implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodType.ft_id
     *
     * @mbg.generated
     */
    private Integer ftId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodType.ft_name
     *
     * @mbg.generated
     */
    private String ftName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodType.shop_id
     *
     * @mbg.generated
     */
    private Integer shopId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodType
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodType.ft_id
     *
     * @return the value of FoodType.ft_id
     *
     * @mbg.generated
     */
    public Integer getFtId() {
        return ftId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodType.ft_id
     *
     * @param ftId the value for FoodType.ft_id
     *
     * @mbg.generated
     */
    public void setFtId(Integer ftId) {
        this.ftId = ftId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodType.ft_name
     *
     * @return the value of FoodType.ft_name
     *
     * @mbg.generated
     */
    public String getFtName() {
        return ftName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodType.ft_name
     *
     * @param ftName the value for FoodType.ft_name
     *
     * @mbg.generated
     */
    public void setFtName(String ftName) {
        this.ftName = ftName == null ? null : ftName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodType.shop_id
     *
     * @return the value of FoodType.shop_id
     *
     * @mbg.generated
     */
    public Integer getShopId() {
        return shopId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodType.shop_id
     *
     * @param shopId the value for FoodType.shop_id
     *
     * @mbg.generated
     */
    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }
}