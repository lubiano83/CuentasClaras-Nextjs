"use client";
import React from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { useCapitalize } from "@/app/hooks/useCapitalize";
import moment from 'moment';

const ProfileList = () => {

    const { user, logged } = useAuth();
    const { capitalize, capitalizeEachWord } = useCapitalize();

    return (
      <>
        { logged ?
          <div className='flex justify-evenly items-center text-white gap-4 bg-gray-700 absolute top-14 w-full left-0 pl-44 p-1'>
              <h3>Id: {user?.payload.id}</h3>
              <h3>Nombre: {user && capitalizeEachWord(user?.payload.nombre)}</h3>
              <h3>Email: {user?.payload.email}</h3>
              <h3>Creación: {moment(user?.payload.fecha_creacion).format("DD/MM/YYYY")}</h3>
              <h3>Role: {user && capitalize(user?.payload.role)}</h3>
          </div>
        : "" }
      </>
    )
};

export default ProfileList;