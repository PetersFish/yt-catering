package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.po.DinnerTableType;
import cn.yutang.backend.pojo.po.DinnerTableTypeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DinnerTableTypeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    long countByExample(DinnerTableTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    int deleteByExample(DinnerTableTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer ttId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    int insert(DinnerTableType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    int insertSelective(DinnerTableType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    List<DinnerTableType> selectByExample(DinnerTableTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    DinnerTableType selectByPrimaryKey(Integer ttId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") DinnerTableType record, @Param("example") DinnerTableTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") DinnerTableType record, @Param("example") DinnerTableTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(DinnerTableType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(DinnerTableType record);
}