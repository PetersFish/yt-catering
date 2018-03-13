package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.po.Foodorderdetail;
import cn.yutang.backend.pojo.po.FoodorderdetailExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FoodorderdetailMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    long countByExample(FoodorderdetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int deleteByExample(FoodorderdetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(String odtId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int insert(Foodorderdetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int insertSelective(Foodorderdetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    List<Foodorderdetail> selectByExample(FoodorderdetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    Foodorderdetail selectByPrimaryKey(String odtId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") Foodorderdetail record, @Param("example") FoodorderdetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") Foodorderdetail record, @Param("example") FoodorderdetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(Foodorderdetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(Foodorderdetail record);
}