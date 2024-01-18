package com.toy.howaboutit.test;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestMapper testMapper;

    public List<TestEntity> getSeqAll() {
        return testMapper.getSeqAll();
    }
}
