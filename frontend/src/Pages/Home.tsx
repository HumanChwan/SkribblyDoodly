import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rainbowify from '../Components/Rainbowify';
import { useUser } from '../Contexts/UserContext';

const Home = () => {
    const [usernameInput, setUsernameInput] = useState<string>('');
    const navigate = useNavigate();
    const { setUsername, joinGlobalRoom } = useUser()!;

    const joinRandom = () => {
        setUsername(usernameInput);
        joinGlobalRoom();
        navigate('/game');
    };

    return (
        <main className='home'>
            <header className='home__header'>
                <Rainbowify>Skribbly Doodly</Rainbowify>
            </header>
            <section className='home__section'>
                <div className='home__section__user-details'>
                    <div className='home__section__user-details__username'>
                        <label
                            htmlFor='username'
                            className='home__section__user-details__username__label'
                        >
                            Username:
                        </label>
                        <input
                            type='text'
                            id='username'
                            className='home__section__user-details__username__input'
                            onChange={(e) => {
                                setUsernameInput(e.target.value);
                            }}
                            value={usernameInput}
                        />
                    </div>
                    <div className='home__section__user-details__avatar'></div>
                </div>
                <div className='home__section__buttons'>
                    <div className='home__section__buttons__random'>
                        <button className='btn-primary' onClick={joinRandom}>
                            Join Random Room
                        </button>
                    </div>
                    <div className='home__section__buttons__private'>
                        <button className='btn-primary'>Join Room</button>
                        <button className='btn-primary'>Create Private Room</button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
