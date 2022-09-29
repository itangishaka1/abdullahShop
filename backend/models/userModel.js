import mongoose from 'mongoose'
import bcrypt  from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}

/*
We can set certain things to happen on save/find and other actions.
Before we save, we want to encrypt the password.

Before we save, we gonna run async function.
this.password : which pertains to user that we are creating, their password.
Initially, this.password is a plain text and now we are resetting it to be hashed
*/
userSchema.pre('save', async function (next) {

  /*
  We only want to do this if the password field is sent/ if it's modified.
  When we have the update profile functionality and we change for e.g the name but not the password,
  we do not want this to run because if it does, it gonna create a new hash and we are not gonna be able to log in. We do the following simple check:
  */
   if(!this.isModified('password')) {
      next()
   }

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User