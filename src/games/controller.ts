import { JsonController, Get, Put, 
  Body, Param, NotFoundError, Post, 
  HttpCode, BadRequestError } from 'routing-controllers'
import Game, { colorChecker, /*moves*/ } from './entity';

@JsonController()
export default class GameController {

  @Get('/games')
  async allGames() {
   const games =  await Game.find()
   return { games }
 }

 @Post('/games')
 @HttpCode(201)
 async createGame(
 @Body() data: Partial <Game>
 ) {
   const {name} = data
   if(!name) throw new BadRequestError('dont forget a name for the game next time')
   if(!data.color) data.color=colorChecker(data.color)
   const entity = Game.create(data)
   const game = await entity.save()
   return {game}
 }

 @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial <Game>
  ){
    if (update.id) throw new BadRequestError('cant change ID')
    const game = await Game.findOne(id)
    if(!game) {throw new NotFoundError('page not found')}
    if(update.color) {
      update.color= colorChecker(update.color)
    }
    // if(update.board){ 
    //   const newBoard = (update.board)
    //   const oldBoard = (game.board)
    //   if(moves(newBoard,oldBoard)>1) throw new BadRequestError('Invalid move')
    // }
    return Game.merge(game,update).save()
  }
}

