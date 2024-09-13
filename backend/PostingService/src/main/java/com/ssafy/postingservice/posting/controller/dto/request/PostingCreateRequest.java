package com.ssafy.postingservice.posting.controller.dto.request;

import lombok.Data;

@Data
public class PostingCreateRequest {
    private Long memberId;
    private String clubCode;
    private Long accountHistoryId;
    private String postContent;
}
