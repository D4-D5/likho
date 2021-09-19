import React, { useEffect, useState } from 'react';
import { Send } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, IconButton, InputAdornment, OutlinedInput, Toolbar } from '@material-ui/core';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatBg from './assests/images/chat_bg.svg';

const useStyles = makeStyles({
    outterDiv: {
        width: '100%',
        minWidth:'300px',
        maxWidth:'400px',
        height: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `url(${ChatBg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        marginTop:'50px'
    },
    inputTextField: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '64px',
        height:'40px'
    },
    inputContainer: {
        padding:'8px',
        backgroundColor:'#f0f0f0'
    },
    toolBar: {
        color: 'white',
        backgroundColor: '#00bfa5',
    },
    messageBox: {
        marginRight: '16px',
        marginLeft: '16px',
        height: '470px',
    }
});

function ChatBox({ socket, userName, room }) {

    const classes = useStyles();
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    useEffect(() => {
        socket.on("recieve_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        });

        socket.on("new_user", (data) => {
            console.log("new_user",data);
            const message = {
                room: data.room,
                message: `${data.userName} joined the room`,
                type: 'notify'
            }
            setMessageList((list) => [...list, message]);
        });
    }, [socket]);

    const sendMessage = async () => {
        if (currentMessage === "") return;
        const date = new Date(Date.now());
        const message = {
            room: room,
            message: currentMessage,
            author: userName,
            time: date.getHours() + ":" + date.getMinutes(),
            type: 'text'
        }
        setMessageList((list) => [...list, message]);
        await socket.emit("send_message", message);
        setCurrentMessage("");
    }

    return (
        <div className={classes.outterDiv}>
            <Toolbar className={classes.toolBar}>
                <h3>Group Chat : {room}</h3>
            </Toolbar>
            <ScrollToBottom>
                <div className={classes.messageBox}>
                    {messageList.map((data, i) => {
                        return <Message key={i} currentMessage={data} userName={userName} />
                    })}
                </div>
            </ScrollToBottom>
            <FormControl variant="outlined" className={classes.inputContainer}>
                <OutlinedInput
                    className={classes.inputTextField}
                    id="outlined-adornment-weight"
                    value={currentMessage}
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    placeholder="Type a message"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={sendMessage} edge="end">
                                {currentMessage.length > 0 ? <Send /> : null}
                            </IconButton>
                        </InputAdornment>
                    }
                    onKeyPress={(event) => { event.key === "Enter" && sendMessage() }}
                />
            </FormControl>
        </div>
    )
}

export default ChatBox
