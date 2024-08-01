export class UserModel {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age;
    this.gender = data.gender;
    this.phone = data.phone;
    this.address = {
      city: data.address.city,
      address: data.address.address,
    };
    this.height = data.height;
    this.weight = data.weight;
    this.email = data.email;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get fullAddress() {
    return `${this.address.city}, ${this.address.address}`;
  }
}
