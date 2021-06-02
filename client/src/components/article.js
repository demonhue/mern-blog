import React, { Component } from 'react';
import {
    Card, CardText,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class Article extends Component {
    
    doClick = (id, e) => {
        e.preventDefault();
        this.props.history.push(`/show/${id}`);
    }
    render() {
        const { article } = this.props;
        return (
            <div className="mx-2 cardclass">
            <Card body inverse style={{ backgroundColor: '#212529', borderColor: '#333', width:"18rem" }} className='my-3 p-3 rounded'>
                <CardTitle style={{height:"30px"}} tag="h5">{article.title}</CardTitle>
                    <CardSubtitle style={{ height: "30px" }} tag="h6" className="mb-2 text-muted ms-auto">
                        written by -
                        <strong>{article.author}</strong>
                    </CardSubtitle>
                    <CardText style={{ height: "250px" }} className='card-text'>{article.body.substring(0, 185)}{article.body.length > 185 && " ....."}</CardText>
                <Button onClick = {(e) => this.doClick(article._id,e) } className="position-relative">read</Button>
            </Card>
            </div>
        );
    }
}
 
export default Article;