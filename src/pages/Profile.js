import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import styled, { keyframes } from 'styled-components';
import AvatarImage from '../images/icon.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

const ProfileContainer = styled.div`
    height: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`
const ProfilePage = styled.div`
    height: 100%;
    width: min(100%, 800px);
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const LoadingCircle = styled(CircularProgress)`
    && {
        color: white;
    } 
`
const animation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const MoveUpAnimation = keyframes`
    from {
        bottom: -100px;
        opacity: 0;
    }
    to {
        bottom: 0;
        opacity: 1;
    }
`

const Avatar = styled.img`
    height: 100px;
    width: 100px;

    opacity: 0;
    
    animation: 0.2s ease 0s normal forwards 1 ${animation};
    transition: transform .3s ease;
`
const Name = styled.h1`
    opacity: 0;
    animation: 0.4s ease 0s normal forwards 1 ${animation};
    animation-delay: 0.2s;
    transition: transform .3s ease;
`

const InformationContainer = styled.div`
    background-color: white;
    color: black;
    box-shadow: 0 8px 6px -6px black;
    width: min(80%, 600px);
    opacity: 0;
    animation: 0.4s ease 0s normal forwards 1 ${MoveUpAnimation};
    animation-delay: 0.6s;
    position: relative;
    text-align: left;
    padding: 1rem;
    padding-top: 0rem;
`
const CompanySlogan = styled.span`
    font-size: 0.8em;
    font-style: italic;
`

const ProfileHeading = styled.h3`
    margin-bottom: 0rem;
`

const BackButton = styled(IconButton)`
    positon: absolute;
    top: 5%;
    left: -40%;
    color: white;
`


function Profile() {

    const { id } = useParams();
    const history = useHistory();
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {

        document.title = 'Profile';

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.json())
        .then(json => setProfile(json))
        .then(() => setProfileLoaded(true));
    }, [id]);

    return (
        <ProfileContainer>
            <ProfilePage>
            <BackButton onClick={() => history.push('/')} size="medium">
                <ArrowBackIcon style={{ color: 'white' }} fontSize="large"/>
            </BackButton>
            {
                !profileLoaded ?
                <LoadingCircle/>
                :
                <>
                    <Avatar src={AvatarImage} />
                    {
                        profile &&
                        <>
                            <Name>{profile.name}</Name>
                            <InformationContainer>
                                <ProfileHeading>Company</ProfileHeading>
                                <p>
                                    {profile.company.name}
                                    <br/>
                                    <CompanySlogan>
                                        {profile.company.catchPhrase}
                                    </CompanySlogan>
                                </p>
                                <ProfileHeading>Address</ProfileHeading>
                                <p>
                                    {profile.address.suite} {profile.address.street}, 
                                    <br/>
                                    {profile.address.city} {profile.address.zipcode}
                                    <br/>
                                </p>
                                <ProfileHeading>Contact</ProfileHeading>
                                <p>
                                    Ph: {profile.phone}
                                    <br/>
                                    Email: {profile.email}
                                </p>
                                <ProfileHeading>Website</ProfileHeading>
                                <p>
                                    {profile.website}
                                </p>
                            </InformationContainer>
                        </>
                    }
                </>
            }
            </ProfilePage>
        </ProfileContainer>
    )
}

export default Profile
