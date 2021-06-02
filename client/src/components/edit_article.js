import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from 'axios';
import "../App.css";
import { useParams } from 'react-router-dom';
import { saveArticle } from "../services/articleService";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function EditArticle() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [_id, setId] = useState("");

    const { id } = useParams();

    //Passed empty array [] so that it doesnt update after every change
    useEffect(() => {
        axios
        .get(`/api/articles/${id}`)
        .then(res => {
            setTitle(res.data.title);
            setBody(res.data.body);
            setAuthor(res.data.author);
            setId(res.data._id);
        })
        .catch((error) => {
            console.log(error);
        });
    },[id])
    
    const history = useHistory();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const article = { _id, title, body, author };
        try {
          await saveArticle(article);
        }catch (error){
          console.log(error);
        }
        history.replace(`/show/${_id}`);
    };

    return (
        <Form onSubmit={handleUpdate}>
        <FormGroup className="mb-1">
            <Label>Title</Label>
                <Input type="text" name="title" onChange={e => setTitle(e.target.value)} value={title}/>
        </FormGroup>
        <FormGroup className="mb-1">
            <Label>Body</Label>
                <Input type="textarea" name="body" onChange={e => setBody(e.target.value)} value={body} style={{height: "50vh"}}/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>  
    );
}
export default EditArticle;