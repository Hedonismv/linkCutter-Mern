import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import {AuthContext} from "../context/AuthContext";
import LinksList from "../components/LinksList";

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try{
            const res = await request(`http://localhost:4000/api/link`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(res)
        }catch (e) {

        }
    },[token, request])

    useEffect(() => {
        fetchLinks()
    },[fetchLinks])

    if(loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
};

export default LinksPage;