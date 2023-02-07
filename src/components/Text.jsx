import React from 'react'
import styled from 'styled-components';

export default function Message() {
    return (
        <TextContainer>
            <TextInfo>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/800px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png' alt='logo' />

                <span>just now</span>
            </TextInfo>

            <TextContent className='messageContent'>
                <p>
                    {/* Hello */}
                    This icon set is meant to be in sync with Google's Material Icons. Therefore, we don't accept fixes, additions, or any other contributions that would make this package diverge from the source.
                </p>
                {/* <img src='https://cdn.donmai.us/sample/23/7b/__rowlet_and_decidueye_pokemon_drawn_by_tako2_eaka__sample-237b1854c64bf81f0a160373209795a1.jpg' alt='shared' /> */}
            </TextContent>
        </TextContainer>
    );
}

const TextContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    &.owner {
        flex-direction: row-reverse;

        .messageContent {
            align-items: flex-end;

            > p {
                background-color: #128C7E;
                color: #E9EDEF;
                padding: 10px 20px;
                border-radius: 10px 0 10px 10px;
            }
        }
    }
`;

const TextInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;

    > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const TextContent = styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > p {
        background-color: #202C33;
        color: #E9EDEF;
        padding: 10px 20px;
        border-radius: 0 10px 10px 10px;
        max-width: max-content;
    }

    > img {
        width: 50%;
    }
`;

