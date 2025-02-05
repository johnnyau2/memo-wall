
import formidable from 'formidable'
import fs from "fs"

let counter = 0;

export const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 * 1024, // the default limit is 200KB
  filter: part => part.mimetype?.startsWith('image/') || false,
  filename: (originalName, originalExt, part, form) => {
    let fieldName = part.name
    let timestamp = Date.now()
    let ext = part.mimetype?.split('/').pop()
    counter++
    return `${fieldName}-${timestamp}-${counter}.${ext}`
  },
})

export async function uploadfile (req: any): Promise<any>{
        return new Promise((resolve, reject)=>{
          form.parse(req, (err, fields, files) => {
            if (err){
              reject(err)
              return
            } 
            resolve({fields,files})
            return 
          })
        })

        
      
}
  