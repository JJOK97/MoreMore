package com.ssafy.accountservice.account.mapper;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateRequest;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountEntity;
import com.ssafy.accountservice.account.service.domain.Account;
import org.mapstruct.Mapper;

import java.util.ArrayList;

@Mapper(componentModel = "spring")
public interface AccountObjectMapper {

    Account fromCreateRequestToDomain(AccountCreateRequest accountCreateRequest);

    default AccountEntity fromDomainToEntity(ArrayList<String> arrayList) {
        if (arrayList == null || arrayList.size() < 4) {
            throw new IllegalArgumentException("ArrayList에 충분한 element의 수가 존재하지 않습니다.");
        }

        return AccountEntity.builder()
                .ssafyAccountNumber(arrayList.get(0))
                .clubCode(arrayList.get(1))
                .clubPassword(arrayList.get(2))
                .ssafyUserKey(arrayList.get(3))
                .build();
    }
}
