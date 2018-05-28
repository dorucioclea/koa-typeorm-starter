import * as bcrypt from "bcryptjs";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RefreshToken } from "./RefreshToken";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid") public uuid: string;
  @Column() public username: string;
  @Column() public email: string;
  @OneToMany((type) => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
  })
  public refreshTokens: RefreshToken[];
  @Column() public password: string;
  public setPassword(pw: string) {
    this.password = pw;
  }
  public async checkPassword(plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, this.password);
  }
}