package com.toy.howaboutit.entities.escape;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
/**
 * 키이스케이프 API 호출용 데이터 클래스
 */
public class KeyEscapeEntity {

    private String themeName;
    private List<Map<String, String>> times;
}
