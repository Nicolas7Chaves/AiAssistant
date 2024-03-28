import { useState } from 'react';
import './styles.scss'
import axios from 'axios';

function AssistantAI() {
    const [userInput, setUserInput] = useState('');
    
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/create-message",{content: userInput});
            console.log(response.data)
        } catch (error) {
            console.error("Failed to send:", error)
        }
    }

    return (
        <>
            <h1 className='form__title'>
                MovieRecs
            </h1>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    className='form__input' type='text' placeholder='How can I help you?'
                    value={userInput}
                    onChange={handleInputChange}
                />
                <button type='submit' className='form__btn'>
                    Send
                </button>
            </form>
        </>
    );
}

export default AssistantAI;

