const posts = [
    {
        id: '1',
        title: 'Title1',
        body: 'test@test.com',
        published: false,
        author: '1'
    },
    {
        id: '2',
        title: 'Title2',
        body: 'test@test.com',
        published: false,
        author: '2'
    }
]

const users = [
    {
        id: '1',
        name: 'Dima',
        email: 'test@test.com',
        age: 34
    },
    {
        id: '2',
        name: 'Roma',
        email: 'test@test.com',
        age: 33
    }
]

const comments = [
    {
        id: '1',
        text: '31',
        author: '1',
        post: '1'
    },
    {
        id: '2',
        text: '32',
        author: '2',
        post: '1'
    },
    {
        id: '3',
        text: '33',
        author: '1',
        post: '2'
    },
    {
        id: '4',
        text: '34',
        author: '2',
        post: '1'
    },
]

const db = {
    posts,
    users,
    comments
}

export default db