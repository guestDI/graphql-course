const User = {
    posts(parent, _, { db }) {
        return db.posts.filter(post => post.author === parent.id)
    },
    comments(parent, _, { db }) {
        return db.comments.filter(comment => comment.author === parent.id)
    }
  }  

export default User