import React from 'react';
import {Link} from "react-router-dom";

const LinksList = ({links}) => {

    if(!links.length){
        return (
            <p className={'center'}> You haven't any links. Add some at <Link to={'/create'}>Create Page</Link></p>
        )
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Old Link</th>
                <th>Shorted Link</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`/detail/${link._id}`}>Open Link</Link></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};

export default LinksList;