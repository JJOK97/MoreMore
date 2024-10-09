import React, { useState } from 'react';

const createGroupAPI = async (groupName, profileImage, fee, intro, creatorId, ssafyUserKey, password) => {
	// clubCreateRequest 객체 생성
	const clubCreateRequest = {
		dues: Number(fee), // 회비를 숫자로 변환
		creatorId: Number(creatorId), // creatorId를 숫자로 변환
		clubName: groupName,
		clubIntro: intro, // 모임 소개
		ssafyUserKey: ssafyUserKey,
		accountPwd: password,
	};

	// 요청 본문에 포함될 FormData 객체 생성
	const formData = new FormData();
	formData.append('file', profileImage); // 프로필 이미지 파일 추가
	formData.append(
		'clubCreateRequest',
		new Blob([JSON.stringify(clubCreateRequest)], {
			type: 'application/json', // clubCreateRequest를 JSON 형식으로 추가
		}),
	);

	console.log(clubCreateRequest);

	// Fetch API 호출
	const response = await fetch('https://j11a605.p.ssafy.io/api/club', {
		method: 'POST',
		body: formData, // FormData를 요청 본문으로 설정
	});

	return response.json();
};

const Step5 = ({
	handlePrevStep,
	handleNextStep,
	groupName,
	setGroupName,
	imagePreview,
	profileImage,
	handleImageChange,
	fee,
	setFee,
	intro,
	setIntro,
	password,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleComplete = async () => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const creatorId = localStorage.getItem('memberId'); // localStorage에서 memberId 가져오기
			const ssafyUserKey = localStorage.getItem('userKey');

			// 모임 생성 API 호출
			const groupResponse = await createGroupAPI(
				groupName,
				profileImage,
				fee,
				intro,
				creatorId,
				ssafyUserKey,
				password,
			);
			if (groupResponse.success) {
				setSuccess(true);
				handleNextStep(); // 성공 시 다음 단계로 이동
			} else {
				throw new Error(groupResponse.message);
			}
		} catch (err) {
			setError(err.message); // 오류 메시지 설정
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="create-group-step">
			<h2 className="create-group-title">모임 설정</h2>
			<input
				type="text"
				placeholder="모임 이름"
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
				className="create-group-input"
			/>
			<div className="create-group-image-upload">
				<label
					htmlFor="imageUpload"
					className="create-group-image-label"
				>
					{imagePreview ? (
						<img
							src={imagePreview}
							alt="Preview"
							className="create-group-image-preview"
						/>
					) : (
						'프로필 이미지 업로드'
					)}
				</label>
				<input
					id="imageUpload"
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="create-group-image-input"
					style={{ display: 'none' }}
				/>
			</div>
			<input
				type="text"
				placeholder="회비 (예: 10000)"
				value={fee}
				onChange={(e) => setFee(e.target.value)}
				className="create-group-input"
			/>
			<input
				type="text"
				placeholder="모임 소개"
				value={intro}
				onChange={(e) => setIntro(e.target.value)}
				className="create-group-input"
			/>
			<div className="create-group-navigation-buttons">
				<button
					className="create-group-prev-btn"
					onClick={handlePrevStep}
				>
					이전
				</button>
				<button
					className="create-group-next-btn"
					onClick={handleComplete} // 완료 버튼 클릭 시 API 호출
					disabled={loading} // 로딩 중에는 버튼 비활성화
				>
					{loading ? '처리 중...' : '완료'}
				</button>
			</div>
			{error && <p className="create-group-error">{error}</p>}
			{success && <p className="create-group-success">모임 생성 완료!</p>}
		</div>
	);
};

export default Step5;
