import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @CreateDateColumn()
  // createdAt: Date;
  //
  // @UpdateDateColumn({ type: 'timestamp' })
  // updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    // await validateOrReject(this);
  }

  @BeforeInsert()
  private generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
