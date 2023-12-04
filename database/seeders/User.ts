import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        username: 'user11',
        password: 'password1',
      },
      {
        username: 'user22',
        password: 'password2',
      },
    ]);
  }
}
