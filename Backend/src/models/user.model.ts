import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
    STUDENT = 'student',
    LIBRARIAN = 'librarian'
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.STUDENT
    }
}, { timestamps: true });


userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);