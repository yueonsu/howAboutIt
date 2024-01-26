package com.toy.howaboutit.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyProperties {

    @Value("${dvs.api.path}")
    private String dvsPath;

    public String getDvsPath() {
        return this.dvsPath;
    }
}
