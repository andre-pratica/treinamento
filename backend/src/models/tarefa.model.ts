import {Entity, model, property} from '@loopback/repository';

@model()
export class Tarefa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'number',
    required: true,
  })
  id_usuario: number;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'date',
    required: true,
  })
  updated_at: string;


  constructor(data?: Partial<Tarefa>) {
    super(data);
  }
}

export interface TarefaRelations {
  // describe navigational properties here
}

export type TarefaWithRelations = Tarefa & TarefaRelations;
