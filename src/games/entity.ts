import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

const defaultBoard = [['o', 'o', 'o'],['o', 'o', 'o'],['o', 'o', 'o']]

type Colors = string[]

const colors: Colors =  ['red','blue','green','yellow','magenta']

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column('text', {nullable: false})
  name: string

  @IsString()
  @Column('text',)
  color?: string

  @Column('json', {default: defaultBoard})
  board: JSON
}

export const colorChecker = (color : string | undefined) => {
  if(!color || !colors.includes(color) ) return colors[Math.round(Math.random() * 4)]
  else return color
}

export const moves = (board1: string[][], board2: string[][]) => {
  return board1
    .map((row, y) => row.filter((cell , x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length
}