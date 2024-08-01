import { UserModel } from '../models/UserModel.js';

export class UserService {
  static async fetchUsers() {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      return data.users.map((user) => new UserModel(user));
    } catch (error) {
      console.error('Ошибка при получении пользователей: ', error);
      throw error;
    }
  }

  static async searchUsers(query) {
    try {
      const searchFields = [
        'firstName',
        'lastName',
        'age',
        'gender',
        'phone',
        'address.city',
        'address.address',
      ];

      const searchPromises = searchFields.map((field) =>
        fetch(
          `https://dummyjson.com/users/filter?key=${field}&value=${encodeURIComponent(
            query,
          )}`,
        ).then((res) => res.json()),
      );

      const results = await Promise.all(searchPromises);

      const uniqueUsers = results.reduce((acc, { users }) => {
        if (users) {
          users.forEach((user) => {
            if (!acc.some((u) => u.id === user.id)) {
              acc.push(new UserModel(user));
            }
          });
        }
        return acc;
      }, []);

      return uniqueUsers;
    } catch (error) {
      console.error('Ошибка при поиске пользователей: ', error);
      throw error;
    }
  }
}
