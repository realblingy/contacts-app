import React, { useEffect, useState } from 'react';
// Styling
import styled from 'styled-components';
// Components
import { CircularProgress } from '@material-ui/core';
import Contact from '../components/Home/Contact';

// Main container of the page
const HomeContainer = styled.div`
    height: 100%;
    padding-top: 4rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`
// Displays the main heading 'Contacts'
const Heading = styled.h1`
    font-size: 3.5em;
`
// Container for the list of contacts
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
// Progress circle when loading
const LoadingCircle = styled(CircularProgress)`
    && {
        color: white;
    } 
`
// Users enter input to search for a contact
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
/**
 * Home page found at route '/'
 */
function Home() {
    // List of contacts shown
    const [contacts, setContacts] = useState(null);
    // List of contacts initially retrieved
    const [contactsDefault, setContactsDefault] = useState(null);
    // Input from the search field
    const [searchInput, setSearchInput] = useState('');
    // Current contact selected
    const [currContact, setCurrContact] = useState(null);
    // Checks if contacts have been loaded
    const [contactsLoaded, setContactsLoaded] = useState(false);

    // Function called on page load
    useEffect(() => {
        // Sets the title of the app to Contacts 
        document.title = 'Contacts';
        // Retrieves contacts info
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => { setContacts(data); setContactsDefault(data); });
    }, [])

    // Updates the searchInput state
    const updateSearchInput = async (e) => {
        if (!contactsLoaded) {
            setContactsLoaded(true);
        }

        const input = e.target.value;
        // Filtered contacts based on input
        const filtered = contactsDefault.filter(contact => {
            const name = contact.name.toLowerCase();
            const email = contact.email.toLowerCase();
            const phone = contact.phone;
            const inputLower = input.toLowerCase();
            // Checks if input matches a contact's name, email or phone
            return (name.includes(inputLower) || email.includes(inputLower) || phone.includes(inputLower));
        });
        setSearchInput(input);
        setContacts(filtered);
    }

    // Called when a contact is clicked and sets the currContact to their index
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
            <SearchField
                value={searchInput}
                onChange={updateSearchInput}
                placeholder="Search for a contact.."
            />
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
