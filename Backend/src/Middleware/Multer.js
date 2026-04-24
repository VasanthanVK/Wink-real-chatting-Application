import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
     cb(null,"./src/Upload/");
  },

  filename:(req,file,cb)=>{
     const uniqueName =
        Date.now() + path.extname(file.originalname);

     cb(null, uniqueName);
  }
});
const fileFilter = (req,file,cb)=>{

  const allowedTypes = /jpeg|jpg|png/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if(extname && mimetype){
    cb(null,true);
  }else{
    cb(new Error("Only JPEG and PNG images allowed"));
  }
};
export const upload = multer({
  storage,
  fileFilter,
  limits:{
    fileSize: 5 * 1024 * 1024 
  }
});