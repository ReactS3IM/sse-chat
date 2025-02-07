import React from 'react';
import md5 from 'blueimp-md5';

export default ({email}) => {
    if (!email) {
        return null;
    }

    const hash = md5(email.trim());

    return (
        <img src={`https://www.gravatar.com/avatar/${hash}`} />
    );
};
