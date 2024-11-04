import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    length: 50,
  })
  name: string;
  
  @Column({
    length: 100,
  })
  desc: string;

  @CreateDateColumn()
  createTime: Date;

  @CreateDateColumn()
  updateTime: Date;
}
