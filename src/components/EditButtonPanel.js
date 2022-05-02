import React, { useRef } from 'react';


function EditButtonPanel({parent, display, functions}) {


    const self = useRef(null);

    const displayStyle = {
        display: display ? "flex" : "none"
    }


    return (
        <div ref={self} style={displayStyle} className='Edit-Button-Panel Button-Panel'>
            <button onMouseDown={functions.hideSelf}>Delete</button>
            <button onMouseDown={functions.startTranslate}>Move</button>
            <button onMouseDown={functions.startChangeWidth}>Width</button>
            <button onMouseDown={functions.cancelSelection}>Done</button>
        </div>
    );
}

export default EditButtonPanel;