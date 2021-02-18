import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './src/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.filename}-${file.originalname}`)
})

const typeFileAccept = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg']

const fileFilter = (req, file, cb) => {
  const type = file.mimeType

  return typeFileAccept.includes(type) ? cb(null, true) : cb(null, false)
}

const limits = { fileSize: 5 * 1024 * 1024 }


export const upload = multer({ storage, fileFilter, limits })