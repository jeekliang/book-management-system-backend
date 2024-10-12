import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty({ message: 'id is required' })
  id: number;

  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'author is required' })
  author: string;

  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @IsNotEmpty({ message: 'cover is required' })
  cover: string;
}
