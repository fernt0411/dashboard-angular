export class User {


  static fromFireBase({ uid, email, name }) {
    return new User(uid, name, email)

  }
  constructor(
    public uid: string,
    public name: string,
    public email: string
  ) {

  }

}