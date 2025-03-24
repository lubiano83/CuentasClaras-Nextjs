"use client";
import React from 'react';
import { useAuth } from '../../hooks/useAuth'; 
import LoginForm from '../login/LoginForm';

const Welcome = () => {

    const { user } = useAuth();

    return (
      <div className='w-full flex justify-center items-center'>
        <h3 className='w-1/2 text-center'>
          CuentasClaras es una aplicación diseñada para que las pymes gestionen su contabilidad de forma fácil y óptima. Permite registrar ingresos y gastos, automatizar procesos contables y obtener análisis claros y útiles para tomar mejores decisiones financieras.
        </h3>
      </div>
    )
}

export default Welcome;