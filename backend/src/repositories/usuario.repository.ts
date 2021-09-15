import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Tarefa, Perfil} from '../models';
import {TarefaRepository} from './tarefa.repository';
import {PerfilRepository} from './perfil.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly tarefas: HasManyRepositoryFactory<Tarefa, typeof Usuario.prototype.id>;

  public readonly perfil: BelongsToAccessor<Perfil, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TarefaRepository') protected tarefaRepositoryGetter: Getter<TarefaRepository>, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Usuario, dataSource);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
    this.tarefas = this.createHasManyRepositoryFactoryFor('tarefas', tarefaRepositoryGetter,);
    this.registerInclusionResolver('tarefas', this.tarefas.inclusionResolver);
  }
}
