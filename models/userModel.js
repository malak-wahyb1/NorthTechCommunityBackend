import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';
const { Schema, models, model } = mongoose;
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    media: {
      type: String,
      default: 'https://i.ibb.co/zs9JYBD/media-default.png',
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  }
);

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.pre(['find', 'findOne'], function () {
  this.populate(['followers', 'following']);
});

// Check if the User model already exists
const User = models.User || model('User', userSchema);

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosePaginate);

export default User;
