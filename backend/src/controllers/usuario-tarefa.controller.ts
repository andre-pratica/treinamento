import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Tarefa,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioTarefaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Tarefa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarefa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tarefa>,
  ): Promise<Tarefa[]> {
    return this.usuarioRepository.tarefas(id).find(filter);
  }

  @post('/usuarios/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarefa)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {
            title: 'NewTarefaInUsuario',
            exclude: ['id'],
            optional: ['id_usuario']
          }),
        },
      },
    }) tarefa: Omit<Tarefa, 'id'>,
  ): Promise<Tarefa> {
    return this.usuarioRepository.tarefas(id).create(tarefa);
  }

  @patch('/usuarios/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Usuario.Tarefa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {partial: true}),
        },
      },
    })
    tarefa: Partial<Tarefa>,
    @param.query.object('where', getWhereSchemaFor(Tarefa)) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.usuarioRepository.tarefas(id).patch(tarefa, where);
  }

  @del('/usuarios/{id}/tarefas', {
    responses: {
      '200': {
        description: 'Usuario.Tarefa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tarefa)) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.usuarioRepository.tarefas(id).delete(where);
  }
}
