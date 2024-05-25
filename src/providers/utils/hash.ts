import * as bcrypt from 'bcrypt';

const SALT = 12;

const generateHash = async (text: string) => await bcrypt.hash(text, SALT);

const compareHashes = async (password: string, hash: string) => await bcrypt.compare(password, hash);

const generateRandomString = (length: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export {
    generateHash,
    compareHashes,
    generateRandomString
}
