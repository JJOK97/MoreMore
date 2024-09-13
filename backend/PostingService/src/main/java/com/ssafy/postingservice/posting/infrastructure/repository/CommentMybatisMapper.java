package com.ssafy.postingservice.posting.infrastructure.repository;

import com.ssafy.postingservice.posting.infrastructure.repository.entity.CommentEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMybatisMapper {

    void saveComment(CommentEntity entity);

    List<CommentEntity> getCommentByPostId(Long postingId);
}
