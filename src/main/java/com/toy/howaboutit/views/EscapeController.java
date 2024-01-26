package com.toy.howaboutit.views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/escape")
public class EscapeController {

    @GetMapping("/keyEscape")
    public String keyEscape() {
        return "/escape/keyEscape.html";
    }
}
