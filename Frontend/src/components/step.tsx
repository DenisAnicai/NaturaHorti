import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface StepsProps {
    step: number;
}

const StepContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    background-color: #f8f9fa;
    border-radius: 15px;
    margin-left: -15px;
    margin-right: -15px;
`;

const Step = styled.div<{ completed?: boolean, current?: boolean, clickable?: boolean }>`
    flex: 1 1 auto;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    margin: 0 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: ${props => props.clickable ? 'pointer' : 'default'};
    box-shadow: ${props => props.current ? '0px 4px 15px rgba(0, 0, 0, 0.1)' : 'none'};
    background-color: ${props => props.current ? '#fff' : 'transparent'};

    ${props => props.completed && css`
        color: #007BFF;
    `}

    &:hover {
        box-shadow: ${props => props.clickable ? '0px 4px 15px rgba(0, 0, 0, 0.1)' : 'none'};
        transform: ${props => props.clickable && !props.current ? 'scale(1.05)' : 'none'};
    }

    i {
        display: block;
        margin-bottom: 5px;
    }
`;

const CompletedIcon = styled.div`
    display: inline-block;
    color: green;
    margin-left: 5px;
`;

export const Steps: React.FC<StepsProps> = ({ step }) => {
    const navigate = useNavigate();

    const navigateToStep = (stepToNavigate: number) => {
        if (stepToNavigate < 1 || stepToNavigate >= 5 || stepToNavigate > step) {
            return;
        }

        const paths = ['shipping', 'personalDetails', 'payment', 'placeOrder'];
        navigate(`/cart/${paths[stepToNavigate - 1]}`);
    };

    return (
        <StepContainer>
            <Step clickable={step >= 1} completed={step >= 1} current={step === 1} onClick={() => navigateToStep(1)}>
                <i className="fa-solid fa-box"></i>1. Detalii livrare
                {step > 1 && <CompletedIcon><i className="fa-solid fa-check"></i></CompletedIcon>}
            </Step>
            <Step clickable={step >= 2} completed={step >= 2} current={step === 2} onClick={() => navigateToStep(2)}>
                <i className="fa-solid fa-user"></i>2. Detalii persoana
                {step > 2 && <CompletedIcon><i className="fa-solid fa-check"></i></CompletedIcon>}
            </Step>
            <Step clickable={step >= 3} completed={step >= 3} current={step === 3} onClick={() => navigateToStep(3)}>
                <i className="fa-solid fa-credit-card"></i>3. Plata
                {step > 3 && <CompletedIcon><i className="fa-solid fa-check"></i></CompletedIcon>}
            </Step>
            <Step clickable={step >= 4} completed={step >= 4} current={step === 4} onClick={() => navigateToStep(4)}>
                <i className="fa-solid fa-file-alt"></i>4. Plasare comanda
                {step > 4 && <CompletedIcon><i className="fa-solid fa-check"></i></CompletedIcon>}
            </Step>
        </StepContainer>
    );
};
