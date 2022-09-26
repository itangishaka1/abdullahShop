import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: "admin@abdullahShop.com",
        password: bcrypt.hashSync('123', 10),
        isAdmin: true
    },
    {
        name: "User One",
        email: "userOne@gmail.com",
        password:bcrypt.hashSync('123', 10),
        
    },
    {
        name: "User Two",
        email: "userTwo@gmail.com",
        password: bcrypt.hashSync('123', 10),
        
    },
]

export default users