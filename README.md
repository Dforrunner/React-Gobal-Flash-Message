# React-Gobal-Flash-Message
This is a React functional component that uses Material-UI and Events to create beautiful flash/alert messages. The flash messages auto collapse and they also persist on hover.  

To use this component simply import it in your App.js like so: 

```javascript
import React, {Component} from 'react';
import FlashMessage from './file/path/FlashMessage';

export default class App extends Component{

    render() {
        return (
            <div>
                 <FlashMessage />
            </div>
        );
    }
}
```

To display a flash message use the global funtion `window.flash`. This function takes two params 'message' and 'type'.
'type': type of alert; 'success', 'info', 'error', 'warning'
'message': the message you want to disple.

Example:

```javascript
  window.flash("Your alert message", "info");
```

Dependencies:
In addition to React you'll need to install the following npm modules: 
```bash
  $ npm i events
  $ npm i @material-ui/core
  $ npm i @material-ui/lab
  $ npm i @material-ui/icons
```

