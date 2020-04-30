import React, {useState, useEffect} from 'react'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import EventEmitter from 'events';

/**
 * This is a Flash message component that can me used globally after it has been imported.
 * It exposes a global function called window.flash and takes 2 parameters 'message' and 'type:
 *
 * message: The alert message you'd like to diplay
 * type: type of alert message. Options are ["success", "warning", "info", "error"]
 *
 * Note: Alerts are created using material-ui alert library for more styling options visit:
 * https://material-ui.com/components/alert/#alert
 */

// Creating new EventEmitter
const eventEmitter = new EventEmitter();

// Setting a globally accessible function
window.flash = (message, type="info") => eventEmitter.emit('flash', ({message, type}));

export default function FlashMessage() {

    // States
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info');

    // Initializing
    let timer;
    let timeOut = 5000;

    const clearTimer = () => {
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
    };

    const collapse = () => {
        console.log('Flash message collapse.');
        setOpen(false);
        clearTimer();
    };

    const startTimer = () => {
        if(open){
            console.log('Flash message start auto collapse.');
            clearTimer();
            timer = setTimeout(collapse, timeOut);
        }
    };

    const stopTimer = () => {
        console.log('Flash message stop auto collapse.');
        clearTimer();
        setOpen(true);
    };

    useEffect(() => {
        // Listening for emitted events
        eventEmitter.on('flash', ({message, type}) => {
            setOpen(true);
            setMessage(message);
            setType(type);
        });

        if(open) startTimer();
    }, [open]);

    return  (
        <div
            style={{
                width: '100%',
                position: "fixed",
                top: 0,
                zIndex: 9999,
                border: 'none',
                margin: '0',
                padding: '0'
            }}
            onMouseEnter={stopTimer}
            onMouseLeave={startTimer}
            onClick={collapse}
        >
            <Collapse in={open}>
                <Alert
                    severity={type}
                    action={
                        <CloseIcon fontSize="inherit"/>
                    }
                >
                    {message}
                </Alert>
            </Collapse>
        </div>
    )
}
