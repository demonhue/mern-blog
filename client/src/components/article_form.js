import React, { useState } from "react";
import { useHistory } from "react-router";
import "../App.css";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { saveArticle } from "../services/articleService";


function ArticleForm({author}) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    
    const history = useHistory();
    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     onAdd({ title, body });
    //     history.push('/');
    // }

    const addArticle = async (e) => {
        e.preventDefault();

        const article = { title, body, author };

        try {
            //console.log(this.state);
            await saveArticle(article);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                console.log(ex.response.data.msg);
            }
        }

        history.push('/');
    };

    return (
        <Form onSubmit={addArticle}>
        <FormGroup className="mb-1">
            <Label>Title</Label>
            <Input type="text" name="title" onChange={e => setTitle(e.target.value)}/>
        </FormGroup>
        <FormGroup className="mb-1">
            <Label>Body</Label>
            <Input type="textarea" name="body" onChange={e => setBody(e.target.value)} style={{height: "50vh"}}/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>  
    );
}
export default ArticleForm;