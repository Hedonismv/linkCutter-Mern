import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const navigate = useNavigate()

    const pressHandler = async (event) => {
        if (event.key === 'Enter'){
            try{
                const data = await request('http://localhost:4000/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                navigate(`/detail/${data.link._id}`)
            }catch (e) {
                
            }
        }
    }

    return (
        <div className={'row'}>
            <div className={'col s8 offset-s2'} style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Enter the Link"
                        id="link"
                        type="text"
                        className="validate"
                        onChange={(event) => setLink(event.target.value)}
                        value={link}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter the link</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;