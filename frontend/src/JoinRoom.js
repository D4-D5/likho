import { Button, Card, makeStyles, OutlinedInput } from '@material-ui/core';
import React from 'react'
import { ReactComponent as HomeImage } from './assests/images/home_img.svg';

const useStyles = makeStyles({
    inputTextField: {
        width: '100%',
        borderRadius: '16px',
        height: '40px',
        marginTop: '8px',
        marginBottom: '8px',
        fontSize: '16px',
        backgroundColor:'#e6e6e6',
    },
    inputContainer: {
        width: '300px',
        alignSelf:'center',
        padding:'32px',
        paddingTop:'0px'
    },
})

function JoinRoom({ socket, setShowChat, setRoom, setUserName, userName, room }) {
    const classes = useStyles();

    const joinRoom = () => {
        console.log(`userName : ${userName} & room is ${room}`);
        if (userName !== "" && room !== "") {
            socket.emit("join_room", {room,userName});
            setShowChat(true);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '100px' }}>
            <Card className={classes.inputContainer}>
                    <h1 style={{fontSize: '48px', color:'#3f3d56',fontWeight:'bold' }}>Join A Room</h1>
                    <OutlinedInput
                        className={classes.inputTextField}
                        id="outlined-adornment-weight"
                        onChange={(event) => setUserName(event.target.value)}
                        placeholder="Your Name..."
                    />
                    <OutlinedInput
                        className={classes.inputTextField}
                        id="outlined-adornment-weight"
                        onChange={(event) => setRoom(event.target.value)}
                        placeholder="Room Name..."
                    />
                    <Button style={{ backgroundColor: '#00bfa5', marginTop: '32px', color: 'white', fontSize: '1.5rem',width:'100%' }} onClick={joinRoom}>Join A Room</Button>
            </Card>
            <HomeImage style={{ width: '500px', height: 'auto' }} />
        </div>
    )
}

export default JoinRoom
