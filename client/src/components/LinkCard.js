import React from 'react';

const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link Name</h2>
            <p>Your Link: <a href={link.to} target={'_blank'} rel={'noopener noreferrer'}>{link.to}</a></p>
            <p>From: <a href={link.from} target={'_blank'} rel={'noopener noreferrer'}>{link.from}</a></p>
            <p>Link clicks: <strong>{link.clicks}</strong></p>
            <p>Created at: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    );
};

export default LinkCard;