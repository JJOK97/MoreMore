import React, { useState, useEffect } from 'react';
import './CreateGroup.css';
import usePageName from '../../store/usePageName';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

const CreateGroup = () => {
	const [step, setStep] = useState(1);
	const [groupName, setGroupName] = useState('');
	const [profileImage, setProfileImage] = useState(null);
	const [imagePreview, setImagePreview] = useState('');
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [fee, setFee] = useState('');
	const [dueDate, setDueDate] = useState('');
	const { setPageName } = usePageName();

	useEffect(() => {
		setPageName('모임 만들기');
	}, [setPageName]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfileImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		if (e) e.preventDefault();
		console.log('Group Name:', groupName);
		console.log('Profile Image:', profileImage);
		console.log('Fee:', fee);
		console.log('Due Date:', dueDate);
		setStep(6);
	};

	const handleNextStep = () => {
		if (step === 5) {
			handleSubmit();
		} else {
			setStep((prev) => prev + 1);
		}
	};

	const handlePrevStep = () => {
		setStep((prev) => prev - 1);
	};

	const renderStepContent = () => {
		switch (step) {
			case 1:
				return <Step1 handleNextStep={handleNextStep} />;
			case 2:
				return (
					<Step2
						handlePrevStep={handlePrevStep}
						handleNextStep={handleNextStep}
						termsAccepted={termsAccepted}
						setTermsAccepted={setTermsAccepted}
					/>
				);
			case 3:
				return (
					<Step3
						handlePrevStep={handlePrevStep}
						handleNextStep={handleNextStep}
						password={password}
						setPassword={setPassword}
					/>
				);
			case 4:
				return (
					<Step4
						handlePrevStep={handlePrevStep}
						handleNextStep={handleNextStep}
						password={password}
						confirmPassword={confirmPassword}
						setConfirmPassword={setConfirmPassword}
					/>
				);
			case 5:
				return (
					<Step5
						handlePrevStep={handlePrevStep}
						handleNextStep={handleNextStep}
						groupName={groupName}
						setGroupName={setGroupName}
						imagePreview={imagePreview}
						handleImageChange={handleImageChange}
						fee={fee}
						setFee={setFee}
						dueDate={dueDate}
						setDueDate={setDueDate}
					/>
				);
			case 6:
				return <Step6 groupName={groupName} />;
			default:
				return null;
		}
	};

	return <div className="create-group">{renderStepContent()}</div>;
};

export default CreateGroup;
