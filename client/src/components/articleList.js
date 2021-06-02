import React, { Component } from 'react';
import Article from './article'
import { getArticles } from "../services/articleService";

class ArticleList extends Component {
    state = {
        articles: []
    }

    async componentDidMount() {
        //console.log("test", props);
        const { data } = await getArticles();
        try {
            this.setState({ articles: Object.values(data) })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { articles } = this.state;
        return (
            <div className="list">
                {
                    articles.map(article => (
                        <Article key={article._id} article={article} {...this.props} />
                        //passed {...this.props} so that we can use this.props.history.push() in Article component class too
                        //as history is in the props of articleList due to presence of Router in articleList's parent
                        //if you'd used functional component as Article then you could have used useHistory hook instead of passing this.props(probably)
                    ))
                }
            </div>
        );
    }
}
 
export default ArticleList;