package com.toy.howaboutit.test;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {
    List<TestEntity> getSeqAll();
}
