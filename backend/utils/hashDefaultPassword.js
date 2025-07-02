import bcrypt from 'bcrypt';
import { DEFAULT_PASSWORD, BCRYPT_SALT_ROUNDS } from '../../constants.js';

export const getHashedDefaultPassword = async () =>{
    return await bcrypt.hash(DEFAULT_PASSWORD, BCRYPT_SALT_ROUNDS);
}