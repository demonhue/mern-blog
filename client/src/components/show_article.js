import auth from "../services/authService";
import { deleteArticle, getArticle } from "../services/articleService";
import { useHistory } from "react-router";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Button
  } from 'reactstrap';

const ShowArticle = ({ location }) => {
    const [article, setArticle] = useState({...location.state});

    const { id } = useParams();

    useEffect(async () => {
        if (!article.title) {
            try {
                //for res.data
                const { data } = await getArticle(id);
                setArticle(data);
            } catch (err) {
                console.log(err);
            }   
        }
    },[id])

    const history = useHistory();

    const doDelete = async (id,e) => {
        e.preventDefault();
        const body = { _id: id, ...article };
        try {
            await deleteArticle(body);
        }catch (error){
            console.log(error);
        }
        history.replace('/');
    }
    
    const doUpdate = (id, e) => {
        e.preventDefault();
        history.push(`/edit/${id}`)
    }

    const user = auth.getCurrentUser();
    
    return (
        <div>
            <div className="h2">{article.title}</div>
            <div tag="h6" className="mb-2 text-muted">{article.author}</div>
            <div className="text-break">{article.body}</div>
            {user && user.name===article.author &&
                <React.Fragment>
                    <Button onClick={(e) => { doDelete(id, e) }} className="btn-danger mr-2">Delete</Button>
                    <Button onClick={(e) => { doUpdate(id, e) }}>Edit</Button>
                </React.Fragment>
            }
        </div>
    );
}
 
export default ShowArticle;