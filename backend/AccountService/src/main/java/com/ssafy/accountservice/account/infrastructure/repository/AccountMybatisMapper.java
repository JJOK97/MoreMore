package com.ssafy.accountservice.account.infrastructure.repository;

import com.ssafy.accountservice.account.controller.dto.request.VerificationSaveRequest;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.DateEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.VerifyEntity;
import com.ssafy.accountservice.account.service.domain.AccountHistoryAll;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@Mapper
public interface AccountMybatisMapper {
    void insertAccount(AccountEntity accountEntity);
    Map<String, String> selectAccountNumAndManagerKey(String clubCode);
    String selectAccountNum(String clubCode);
    void insertAccountHistory(AccountHistoryAll accountHistoryAll);
    String selectAccountNumByPg(String cardNum);
    String selectAccountNumByClubCode(String clubCode);
    List<AccountHistoryEntity> selectAccountHistoryByAccountNum(String accountNum);
    AccountHistoryEntity selectAccountHistoryOnly(String tagName);
    void insertByTransactionNum(VerificationSaveRequest verificationSaveRequest);
    VerifyEntity selectByTransactionNum(String tagName);
    void updateByTransactionNum(VerificationSaveRequest verificationSaveRequest);
    void deleteByTransactionNum(String tagName);
    String selectUserKeyByClubCode(String clubCode);
    List<AccountHistoryEntity> selectAccountHistoryByAccountNumByDate(String accountNum, String date);
    List<String> selectTagName(String accountNum);
    List<String> dateCompareByAccountNum(DateEntity dateEntity);
    void verificationInSave(String tagName);
    void memoVerification(String tagName, String accountHistoryMemo);
    void imageVerification(String tagName, String accountHistoryImage);
}
