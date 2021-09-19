import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    selfChatContainer: {
        marginTop: '16px',
        marginBottom: '16px',
        marginLeft: 'auto',
        color: '#484848',
        width: 'fit-content',
        wordBreak: 'break-word',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    notifyContainer:{
        backgroundColor: '#e1f2fb',
        marginTop: '8px',
        marginBottom: '8px',
        marginRight: 'auto',
        marginLeft:'auto',
        width: 'fit-content',
        wordBreak: 'break-word',
        textAlign: 'left',
        alignItems:'center',
        borderRadius: '7.5px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingRight: '9px',
        paddingLeft: '9px',
        color: "#333638",
        fontFamily: 'Roboto, sans-serif'
    },
    chatContainer: {
        marginTop: '16px',
        marginBottom: '16px',
        marginRight: 'auto',
        width: 'fit-content',
        wordBreak: 'break-word',
        textAlign: 'left',
        display: 'flex',
        color: '#484848',
    },
    selfChatBubble: {
        backgroundColor: '#dcf8c6',
        borderRadius: '12px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingRight: '9px',
        paddingLeft: '9px',
        fontSize: '13px',
        color: "#303030",
        lineHeight:'19px',
        fontFamily: 'Roboto, sans-serif'
    },
    chatBubble: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingRight: '9px',
        paddingLeft: '9px',
        fontSize: '13px',
        color:'#303030',
        lineHeight:'19px',
        fontFamily: 'Roboto, sans-serif'
    }
});

const colorsBand = ['#b0c249','#7dd1f1','#408dee','#27ab26','#e85db0','#c149e0','#e7c950']
const authorColors = {};

const Message = (props) => {
    const classes = useStyles();
    const { currentMessage, userName } = props;
    console.log(currentMessage, userName);

    const getAuthorColor = (author) => {
        console.log(authorColors);
        if(author in authorColors){
            return authorColors[author];
        }
        authorColors[author] = colorsBand[Math.floor(Math.random() * colorsBand.length)];
        return authorColors[author];
    }


    return (
        currentMessage.type === 'notify' ? 
        <div className={classes.notifyContainer}>{currentMessage.message}</div>
        :
        currentMessage.author === userName ?
            <div className={classes.selfChatContainer}>
                <div className="mess-maxwidth">
                    <div className={classes.selfChatBubble}>
                        {currentMessage.message}
                    </div>
                </div>
                <div style={{ color: "#BF9B9B", fontSize: "10px", alignSelf: 'flex-end', margin: '8px' }}>
                    {currentMessage.time}
                </div>
            </div>
            :
            <div className={classes.chatContainer}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                    <div className={classes.chatBubble} >
                        <div style={{color:getAuthorColor(currentMessage.author)}}>
                            {currentMessage.author}
                        </div>
                        {currentMessage.message}
                    </div>

                </div>
                <div className="mess-time" style={{ color: "#BF9B9B", fontSize: "10px", alignSelf: 'flex-end', margin: '8px' }}>
                    {currentMessage.time}
                </div>
            </div>
    );
}

export default Message;