import http from "./http";

const apiUrl = "/api/articles";

function articleUrl(id) {
  return `${apiUrl}/${id}`;
}

export function getArticles() {
  return http.get(apiUrl);
}

export function getArticle(id) {
  return http.get(articleUrl(id));
}

export function saveArticle(article) {
  if (article._id) {
    const body = { ...article };
    delete body._id;
    return http.put(articleUrl(article._id), body);
  }
  return http.post(apiUrl, article);
}

export function deleteArticle(article) {
  return http.delete(articleUrl(article._id),{ data:article });
}