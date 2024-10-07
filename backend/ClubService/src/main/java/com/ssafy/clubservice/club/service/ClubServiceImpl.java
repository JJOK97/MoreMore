package com.ssafy.clubservice.club.service;

import com.ssafy.clubservice.club.infrastructure.client.ClientConnector;
import com.ssafy.clubservice.club.infrastructure.repository.ClubRepository;
import com.ssafy.clubservice.club.infrastructure.repository.ParticipantRepository;
import com.ssafy.clubservice.club.infrastructure.s3.S3Connector;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;
    private final ParticipantRepository participantRepository;
    private final S3Connector s3Connector;
    private final UUIDHolder uuidHolder;
    private final ClientConnector clientConnector;

    @Override
    @Transactional
    public Club createClub(Club club, Long creatorId, MultipartFile file){
        club = club.generateClubCode(uuidHolder);
        clientConnector.createAccount(club.getSsafyUserKey(), club.getClubCode());
        Club clubWithId = clubRepository.saveClub(club);
        clubWithId = addCreator(creatorId, clubWithId);
        clubWithId = clubWithId.changeImageName(processImage(club, file));
        return clubWithId;
    }

    private String processImage(Club club, MultipartFile file) {
        s3Connector.upload(club.getClubCode(), file);
        return s3Connector.getImageURL(club.getClubCode());
    }

    @Override
    @Transactional
    public Club updateClub(String clubCode, Club club) {
        Club findClub = clubRepository.findClubByClubCode(clubCode);
        Club updateClub = findClub.updateClub(club);
        return clubRepository.updateClub(updateClub);
    }

    @Override
    public String updateClubImage(String clubCode, MultipartFile file) {
        s3Connector.upload(clubCode, file);
        return s3Connector.getImageURL(clubCode);
    }

    @Override
    public Club findClub(String clubCode) {
        Club club = clubRepository.findClubByClubCode(clubCode);
        club.changeImageName(s3Connector.getImageURL(clubCode));
        club.changeParticipant(participantRepository.findParticipants(clubCode));
        return club;
    }

    @Override
    public List<Club> findClubs(String memberId) {
        return clubRepository.findClubByMemberId(memberId);
    }

    private Club addCreator(Long creatorId, Club club) {
        Club clubWithCreator = club.makeCreator(creatorId);
        List<Participant> creatorWithId = participantRepository.addMember(clubWithCreator.getClubCode(), clubWithCreator.getParticipants());
        return clubWithCreator.changeParticipant(creatorWithId);
    }

    @Override
    public List<Participant> addParticipant(String clubCode, List<Participant> participants) {
        return participantRepository.addMember(clubCode, makeParticipantList(clubCode, participants));
    }

    private static List<Participant> makeParticipantList(String clubCode, List<Participant> participants) {
        return participants
                .stream()
                .map(participant -> Participant.createClubParticipant(clubCode, participant.getUserId()))
                .toList();
    }

    @Override
    public List<Participant> findParticipants(String clubCode) {
        return participantRepository.findParticipants(clubCode);
    }

}
