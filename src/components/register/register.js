import React, { Component } from 'react';
import { AuthProvider } from '../../services/auth-service';
import RegisterForm from './register-form'

export const Register = () => (
    <AuthProvider>
        <RegisterForm />
    </AuthProvider>
);
