import React from "react";

const RenderCatTag = (props) => {
    let tagClass = 'tag_' + props.catTag.toLowerCase().replace(' ','_');
    let actualIndex = props.index + 1;

    return (
        <li key={actualIndex} className={tagClass}>
            {props.catTag}
        </li>
    )
};

export default RenderCatTag;