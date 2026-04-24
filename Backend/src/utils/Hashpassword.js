import bcrypt from "bcrypt"

const rounds =10;

export const hashPassword = async (password) => {

   if (!password) {
    throw new Error("Password missing");
  }

  const hash = await bcrypt.hash(password, rounds);

  return hash;
};

export const comparePassword=(plain,hashpassword)=>{
    const compare=bcrypt.compareSync(plain,hashpassword)
    return compare
}