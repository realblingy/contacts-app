import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Contact from '../components/Home/Contact';

const HomeContainer = styled.div`
    height: 100%;
    padding-top: 4rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Heading = styled.h1`
    font-size: 3.5em;
`

const ContactsListContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
`

const LoadingCircle = styled(CircularProgress)`
    && {
        color: white;
    } 
`

const SearchField = styled.input`
    width: 250px;
    padding: 0.75rem;
    font-size: 1.1em;
    border-radius: 5px;
    border: none;

    @media (min-width: 800px) {
        width: min(60%, 400px);
        font-size: 1.2em;
        margin-bottom: 2rem;
    }
`

function Home() {

    const [contacts, setContacts] = useState(null);
    const [contactsDefault, setContactsDefault] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [currContact, setCurrContact] = useState(null);
    const [contactsLoaded, setContactsLoaded] = useState(false);

    useEffect(() => {
        
        document.title = 'Contacts';

         fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => { setContacts(data); setContactsDefault(data); });
    }, [])

    const updateSearchInput = async (e) => {
        if (!contactsLoaded) {
            setContactsLoaded(true);
        }

        const input = e.target.value;
        const filtered = contactsDefault.filter(contact => {
            const name = contact.name.toLowerCase();
            const email = contact.email.toLowerCase();
            const phone = contact.phone.toLowerCase();
            const inputLower = input.toLowerCase();


            return (name.includes(inputLower) || email.includes(inputLower) || phone.includes(inputLower));
        });
        setSearchInput(input);
        setContacts(filtered);
    }

    const handleContactClick = (idx) => {
        if (idx === currContact) {
            setCurrContact(null);
        } else {
            setCurrContact(idx);
        }
    }

    return (
        <HomeContainer>
            <Heading>Contacts</Heading>
            <SearchField value={searchInput} onChange={updateSearchInput} placeholder="Search for a contact.."/>
            {
                contacts === null
                ?
                <LoadingCircle/>
                :
                <ContactsListContainer>
                {
                    contacts.map(({ name, phone, email, company, address, id }, idx) => (
                        <Contact
                            name={name}
                            phone={phone}
                            email={email}
                            company={company.name}
                            idx={idx}
                            id={id}
                            city={address.city}
                            handleContactClick={handleContactClick}
                            revealExtraInfo={idx === currContact}
                            contactsLoaded={contactsLoaded}
                        />
                    ))
                }
                </ContactsListContainer>
            }
        </HomeContainer>
    )
}

export default Home
