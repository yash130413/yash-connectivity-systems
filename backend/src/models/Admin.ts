export interface Admin {
  email: string;
  passwordHash: string;
  role: 'admin' | 'superadmin';
  createdAt: Date;
}

export interface AdminPayload {
  email: string;
  role: string;
}
