const Query = {
    users(_, args, { db }) {
        return db.users
    },
    posts(_, args, { db }) {
        if(args.query){
            return db.posts.filter((post) => post.title.includes(args.query) || post.body.includes(args.query))
        }

        return db.posts
        
    },
    comments(_, args, { db }) {
        return db.comments
    }
  }

export default Query  