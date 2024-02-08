export class Videoflixuser {
  username: string;
  email: string;
  password?: string;

  constructor(username: string, email: string, password: string | undefined) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

}
