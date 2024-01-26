package com.toy.howaboutit.restapis;

import com.toy.howaboutit.configs.MyProperties;
import com.toy.howaboutit.entities.escape.KeyEscapeEntity;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;

@RestController
@RequestMapping("/api/escape")
@RequiredArgsConstructor
public class EscapeRestController {

    /**
     * 설정파일(properties) Bean
     * -Dspring.profiles.active=prod = 원격서버용
     * -Dspring.profiles.active 설정 X = 로컬용
     */
    final MyProperties myProperties;

    /**
     * reservateAPI 키이스케이프 이용 시간 조회 API 호출한다.
     * @param areaNum:  지점 번호
     * @param revDay:   예약 날짜
     * @param themeNum: 테마 번호
     * @return KeyEscapeEnity
     * @throws IOException
     */
    @GetMapping("/keyEscape")
    public KeyEscapeEntity keyEscape(
            @RequestParam String areaNum,
            @RequestParam String revDay,
            @RequestParam String themeNum) throws IOException {

        String url = myProperties.getDvsPath()+"key_escape?area_num="+areaNum+"&rev_days="+revDay+"&theme_num="+themeNum;

        /**
         * 원래는 RequestTemplate 라이브러리를 사용해서 API를 호출했다고 하는데
         * deprecated 되어서 WebClient 사용을 권장한다고 한다.
         * */
        WebClient client = WebClient.builder()
                .baseUrl(url)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        KeyEscapeEntity response = client.get()
                .uri(url)
                .retrieve() // 응답값을 받게 해주는 메소드
                .bodyToMono(KeyEscapeEntity.class) // 해당 타입으로 받게 해주는 메소드
                .block(); // default 비동기, block 메소드를 사용하면 동기방식으로 바꿔준다.
        
        return response;
    }
}
