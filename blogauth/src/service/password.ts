import bcrypt from "bcryptjs";

export class Password {
    static async toHash(password:string){
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password,salt)
    }

    static async compare(suppliedPassword:string,storedPassword: string){
        const isMatch = await bcrypt.compare(suppliedPassword,storedPassword);
        return isMatch;
    }
}