'use server';
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function loginAction(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }
       const isPasswordValid = await bcrypt.compare(password, user.password);

         if (!isPasswordValid) {
      return { success: false, error: 'Invalid password' };
    }
    // Your authentication logic here
    // const user = await authenticate(email, password);
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
}