import { v4 as uuidv4 } from 'uuid';

const Mutation = {
    createUser(_, args, { db }){
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    updateUser(_, args, { db }){
        const user = db.users.find(user => user.id === args.id)

        user.email = args.data.email
        user.name = args.data.name
        user.age = args.data.age

        return user
    },
    deleteUser(_, args, { db }){
        const userIndex = db.users.find(user => user.id === args.id)

        const deletedUser = db.users.splice(userIndex, 1)

        db.posts = db.posts.filter(post => post.author === args.id)
        db.posts = db.comments.filter(comment => comment.author === args.id)

        return deletedUser
    },
    createPost(_, args, { db }){
        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        return post
    },
    updatePost(_, args, { db }){
        const post = db.posts.find(post => post.id === args.id)

        post.title = args.data.title
        post.body = args.data.body
        post.published = args.data.published

        return post
    },
    deletePost(_, args, { db }){
        const postIndex = db.posts.find(post => post.id === args.id)

        const deletedPost = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter(comment => comment.post !== args.id)

        return deletedPost
    },
    createComment(_, args, { db }){
        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)

        return comment
    },
    updateComment(_, args, { db }){
        const comment = db.comments.find(comment => comment.id === args.id)

        comment.text = args.text

        return comment
    },
    deleteComment(_, args, { db }){
        const userIndex = db.users.find(user => user.id === args.id)

        const deletedUser = users.splice(userIndex, 1)

        db.posts = db.posts.filter(post => post.author === args.id)
        db.posts = db.comments.filter(comment => comment.author === args.id)

        return deletedUser
    },
  }

  export default Mutation