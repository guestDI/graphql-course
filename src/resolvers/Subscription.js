const Subscription = {
    comment: {
        subscribe(_, args, { db, pubsub }) {
            const post = db.posts.find((post) => post.id === args.postId && post.published)

            if(!post){
                throw new Error('Post not found')
            }

            return pubsub.subscribe(`comment ${args.postId}`)
        }
    },
    post: {
        subscribe(_, args, { pubsub }) {
            return pubsub.subscribe('post')
        }
    }
}

export default Subscription