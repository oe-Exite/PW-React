import React, { Component } from "react";
import { AuthProvider } from '../../services/auth-service';
import LoginForm from './login-form'

export const Login = () => (
    <AuthProvider>
        <LoginForm />
    </AuthProvider>
);
