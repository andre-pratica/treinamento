import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tarefa, TarefaRelations} from '../models';

export class TarefaRepository extends DefaultCrudRepository<
  Tarefa,
  typeof Tarefa.prototype.id,
  TarefaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Tarefa, dataSource);
  }
}
