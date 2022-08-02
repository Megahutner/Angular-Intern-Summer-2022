export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  code: number;
  data: {
    staff:{
      username: string;
      fullName: string;
      mobile_number:string;
      user_token: string;
      mqtt_client_id: string;
      mqtt_password: string;
    }
  }
}
// export const users = [
//     {
//       id: 2,
//       username: 'test123a',
//       password: 'abcdef',
//       firstName: 'Array',
//       lastName: 'Stack',
//     },
//     {
//       id: 3,
//       username: 'test123b',
//       password: 'abcdef',
//       firstName: 'Array',
//       lastName: 'Stack',
//     },
//     {
//       id: 4,
//       username: 'test123c',
//       password: 'abcdef',
//       firstName: 'Array',
//       lastName: 'Stack',
//     },
//   ];
//   export class User2 {
//     Username: string;
//     Password: string;
//     user_token: string;
    
//     }
    