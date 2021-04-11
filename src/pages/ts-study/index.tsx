import React from 'react';
import { Alert } from 'zent';
import { UserModel } from './types'

type JUserModel1 = Partial<UserModel>
type JUserModel2 = Required<UserModel>
type JUserModel3 = Readonly<UserModel>


export const TS: React.FC<any> = () => {
const user: JUserModel1 = {age:1}
  return (
    <>
    <Alert title="typeScript" description="练习"></Alert>
    {user.age}
    </>
  );
};

export default TS;
