import { ADMINISTRADOR_ID, ARRENDATARIO_ID, PROPIETARIO_ID } from './roles';

export const usuarios = [
  {
    id_rol: PROPIETARIO_ID,
    correo_electronico: 'propietario@gmail.com',
  },
  {
    id_rol: ADMINISTRADOR_ID,
    correo_electronico: 'administrador@gmail.com',
  },
  {
    id_rol: ARRENDATARIO_ID,
    correo_electronico: 'arrendatario@gmail.com',
  },
];
