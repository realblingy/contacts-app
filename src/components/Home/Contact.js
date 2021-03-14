import React from 'react'
import styled, { keyframes } from 'styled-components';
import image from '../../images/icon.png'

const animation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ContactContainer = styled.div`
    width: 300px;
    background-color: white;
    color: black;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    padding-left: 1rem;
    padding-top: 1rem;
    margin-left: 1rem;
    box-shadow: 0 8px 6px -6px black;
    cursor: pointer;
    position: relative;
    opacity: 0;
    
    animation: 0.3s ease 0s normal forwards 1 ${animation};
    animation-delay: ${props => props.delay + 's' || 0};
    transition: transform .3s ease;

    &:hover {
        transform: scale(1.15);
    }


    @media (min-width: 800px) {
        width: min(60%, 700px);
        font-size: 1.2em;
        margin-bottom: 2rem;
    }

    ${({ contactsLoaded }) => contactsLoaded &&
    `
        animation: none;
        animation-delay: none;
        opacity: 1;
    `
    }
`

const InformationContainer = styled.div`
    width: 85%;
    padding-bottom: 0.4rem;
`

const Icon = styled.img`
    height: 30px;
    width: 30px;

    @media (min-width: 800px) {
        height: 50px;
        width: 50px;
    }
`

const ProfileLink = styled.a`
    color: #fe3c72;
    margin-top: 1rem;
    font-size: 0.8em;
    display: inline-block;

    &:hover {
        color: red;
    }
`

function Contact({ name, phone, email, company, idx, id, city, handleContactClick, revealExtraInfo, contactsLoaded }) {
    return (
        <ContactContainer
            key={email + name}
            delay={parseInt(idx)/4}
            onClick={() => handleContactClick(idx)}
            contactsLoaded={contactsLoaded}
        >
            <InformationContainer>
                <span><b>{ name }</b></span>
                <br/>
                <span style={{ fontSize: '0.8em' }}>Ph: { phone }</span>
                <br/>
                <span style={{ fontSize: '0.8em' }}>Email: { email }</span>
                {
                    revealExtraInfo &&
                    <>
                        <p
                            style={{ marginBottom: 0}}
                        >
                            <span style={{ fontSize: '0.8em' }}><b>Company</b></span>
                            <br/>
                            <span style={{ fontSize: '0.8em' }}>{ company }</span>
                            <br/>
                            <span style={{ fontSize: '0.8em' }}><b>City</b></span>
                            <br/>
                            <span style={{ fontSize: '0.8em' }}>{ city }</span>
                        </p>
                        <ProfileLink
                            href={`/profile/${id}`}
                        >
                            Click here for { name }'s profile
                        </ProfileLink>
                    </>
                }
            </InformationContainer>
            <Icon src={image}/>
        </ContactContainer>
    )
}

export default Contact
