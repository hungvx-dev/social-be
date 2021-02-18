import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

// import { populate } from './comment.constants'

const BlogSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    avatar: { type: String, required: true },
    cover: { type: String, default: "" },
    slug: { type: String, required: true },
    info: { type: String, default: "" },
    follow_num: { type: Number, default: 0 },
    post_num: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
        delete ret.keywords
      }
    }
  }
)

// BlogSchema.virtual('Post', {
//   ref: 'Comment',
//   localField: '_id',
//   foreignField: 'story',
//   options: {
//     sort: { updatedAt: -1 }
//   }
// })
// BlogSchema.methods.populateComment = async function () {
//   return await this.populate(populate).execPopulate()
// }

// BlogSchema.methods.populateAuthor = async function () {
//   const result = await this.populate('author').execPopulate()
//   return result
// }
BlogSchema.plugin(mongooseKeywords, { paths: ['title', 'slug'] })
const model = mongoose.model('Blog', BlogSchema)
export default model