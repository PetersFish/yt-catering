package cn.yutang.backend.pojo.po;

import java.io.Serializable;
import java.util.Date;

public class DinnerTable implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTable.tb_id
     *
     * @mbg.generated
     */
    private Long tbId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTable.tb_name
     *
     * @mbg.generated
     */
    private String tbName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTable.tb_status
     *
     * @mbg.generated
     */
    private Integer tbStatus;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTable.order_date
     *
     * @mbg.generated
     */
    private Date orderDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTable.tt_id
     *
     * @mbg.generated
     */
    private Integer ttId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTable.tb_qrcode
     *
     * @mbg.generated
     */
    private String tbQrcode;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column DinnerTable.shop_id
     *
     * @mbg.generated
     */
    private Integer shopId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table DinnerTable
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTable.tb_id
     *
     * @return the value of DinnerTable.tb_id
     *
     * @mbg.generated
     */
    public Long getTbId() {
        return tbId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTable.tb_id
     *
     * @param tbId the value for DinnerTable.tb_id
     *
     * @mbg.generated
     */
    public void setTbId(Long tbId) {
        this.tbId = tbId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTable.tb_name
     *
     * @return the value of DinnerTable.tb_name
     *
     * @mbg.generated
     */
    public String getTbName() {
        return tbName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTable.tb_name
     *
     * @param tbName the value for DinnerTable.tb_name
     *
     * @mbg.generated
     */
    public void setTbName(String tbName) {
        this.tbName = tbName == null ? null : tbName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTable.tb_status
     *
     * @return the value of DinnerTable.tb_status
     *
     * @mbg.generated
     */
    public Integer getTbStatus() {
        return tbStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTable.tb_status
     *
     * @param tbStatus the value for DinnerTable.tb_status
     *
     * @mbg.generated
     */
    public void setTbStatus(Integer tbStatus) {
        this.tbStatus = tbStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTable.order_date
     *
     * @return the value of DinnerTable.order_date
     *
     * @mbg.generated
     */
    public Date getOrderDate() {
        return orderDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTable.order_date
     *
     * @param orderDate the value for DinnerTable.order_date
     *
     * @mbg.generated
     */
    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTable.tt_id
     *
     * @return the value of DinnerTable.tt_id
     *
     * @mbg.generated
     */
    public Integer getTtId() {
        return ttId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTable.tt_id
     *
     * @param ttId the value for DinnerTable.tt_id
     *
     * @mbg.generated
     */
    public void setTtId(Integer ttId) {
        this.ttId = ttId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTable.tb_qrcode
     *
     * @return the value of DinnerTable.tb_qrcode
     *
     * @mbg.generated
     */
    public String getTbQrcode() {
        return tbQrcode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTable.tb_qrcode
     *
     * @param tbQrcode the value for DinnerTable.tb_qrcode
     *
     * @mbg.generated
     */
    public void setTbQrcode(String tbQrcode) {
        this.tbQrcode = tbQrcode == null ? null : tbQrcode.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column DinnerTable.shop_id
     *
     * @return the value of DinnerTable.shop_id
     *
     * @mbg.generated
     */
    public Integer getShopId() {
        return shopId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column DinnerTable.shop_id
     *
     * @param shopId the value for DinnerTable.shop_id
     *
     * @mbg.generated
     */
    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }
}